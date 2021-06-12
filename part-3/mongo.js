const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://fullstack:MY_PASSWORD@cluster0.ztsfy.mongodb.net/persons?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  name: String,
  id: Number,
  phone: String,
});

const generatedId = () => {
  return Math.floor(Math.random() * 1000000);
};

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook: ");
    result.forEach((person) => {
      console.log(person.name, person.phone);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    id: generatedId(),
    phone: phone,
  });

  person.save().then((result) => {
    console.log(`Added ${name} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
}
