import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "/api/persons/";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (noteObject) => {
  const request = axios.post(baseUrl, noteObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}${id}`);
  return request.then((response) => response.data);
};

const update = (id, noteObject) => {
  const request = axios.put(`${baseUrl}${id}`, noteObject);
  return request.then((response) => response.data);
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [toggle, setToggle] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationName, setNotificationName] = useState();
  const [notificationStyle, setNotificationStyle] = useState("notification");

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleRemove = (id, name) => {
    window.confirm(`Delete ${name}?`) &&
      phonebookService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter((item) => item.id !== id);
          setPersons(newPersons);
          setNotificationStyle("notification");
          setNotificationText("Succesfully deleted ");
          setNotificationName(name);
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 5000);
        })
        .catch(() => {
          setNotificationStyle("warning");
          setNotificationText("Number is already deleted from the phonebook: ");
          setNotificationName(name);
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 5000);
        });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName,
      phone: phone,
    };

    const personToChange = persons.some((p) => p.name === newName);
    const oldPerson = persons.find((p) => p.name === newName);
    const newPerson = { ...oldPerson, phone: phone };

    if (personToChange) {
      window.confirm(
        `${newName} ia already added to phonebook, replace the old number with a new one?`
      ) &&
        phonebookService
          .update(oldPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            );
            setNotificationStyle("notification");
            setNotificationText("Updated ");
            setNotificationName(oldPerson.name);
            setToggle(!toggle);
            setTimeout(() => {
              setToggle(false);
            }, 5000);
          })
          .catch((error) => {
            if (error.response.status === 406) {
              setNotificationStyle("warning");
              setNotificationText(`${error.response.data.error}`);
              setNotificationName(" ");
              setToggle(!toggle);
              setTimeout(() => {
                setToggle(false);
              }, 5000);
            } else {
              setNotificationStyle("warning");
              setNotificationText(
                "This number was already deleted from the phonebook: "
              );
              setNotificationName(oldPerson.name);
              setToggle(!toggle);
              setTimeout(() => {
                setToggle(false);
              }, 5000);
            }
          });
    } else {
      phonebookService
        .create(noteObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationStyle("notification");
          setNotificationText("Added ");
          setNotificationName(returnedPerson.name);
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 5000);
        })
        .catch((error) => {
          setNotificationStyle("warning");
          setNotificationText(`${error.response.data.error}`);
          setNotificationName(" ");
          setToggle(!toggle);
          setTimeout(() => {
            setToggle(false);
          }, 5000);
        });
    }

    setNewName("");
    setPhone("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {toggle && (
        <Notification
          text={notificationText}
          name={notificationName}
          style={notificationStyle}
        />
      )}
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>Add a new number</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        phone={phone}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deletePerson={handleRemove} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter: <input onChange={props.handleFilter} value={props.filter} />
    </div>
  );
};

const Notification = (props) => {
  return (
    <div className={props.style}>
      {props.text} {props.name}
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input onChange={props.handleNameChange} value={props.newName} />
      </div>
      <div>
        number: <input onChange={props.handlePhoneChange} value={props.phone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.filter
        ? props.persons
            .filter((person) => person.name.includes(props.filter))
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.phone}
              </p>
            ))
        : props.persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.phone}{" "}
              <button
                onClick={() => props.deletePerson(person.id, person.name)}
              >
                Delete
              </button>
            </p>
          ))}
    </div>
  );
};

export default { App, Persons, PersonForm, Filter, Notification, getAll, create, remove, update };