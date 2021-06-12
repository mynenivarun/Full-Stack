require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

// MIDDLEWARES
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// MORGAN
morgan.token("content", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);

// ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(406).json({ error: error.message });
  } else if (error.name === "BadRequest") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

// GET ALL PERSONS
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// DELETE A PERSON
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// GET A SINGLE PERSON
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log("WROND ID");
      next(error);
    });
});

// POST A NEW PERSON
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    phone: body.phone,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => response.json(savedAndFormattedPerson))
    .catch((error) => next(error));
});

// UPDATE A PERSON
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    phone: body.phone,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (updatedPerson === null) {
        return response.status(404).end();
      }
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// INFO PAGE
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      "Phonebook has info for " +
        persons.length +
        " people" +
        "<br></br>" +
        new Date().toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" })
    );
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);
// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
