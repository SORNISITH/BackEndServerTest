const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
morgan.token("bobo", (res) => JSON.stringify(res.body));
app.use(morgan(":url :method :bobo"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
function logger(request, response, next) {
  console.log("SUCESSFULL");
  next();
}
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((items) => items.id !== id);

  response.status(204).end();
});
app.get("/api/info", (request, response) => {
  console.log("getinfo");
  const day = new Date();
  const countNote = persons.length;
  const htmlTag = `<p>Phone book has for ${countNote} people </p><p>${day}</p>`;
  response.send(htmlTag);

  response.status(200);
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
  response.status(200);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app?.post("/api/persons", (request, response) => {
  const note = request?.body;
  const randomNumber = () => Math.floor(Math.random() * 20 + 4);
  const error = {
    id: "Error ID duplicated",
    name: "Error Name duplicated",
    nameMiss: "Error MISSING name",
  };
  const checkName = "name" in note;

  if (!checkName) return response.json(error.nameMiss);
  for (let i = 0; i > persons.length; i++) {
    if (note.id == item.id) return response.json(error.id);
    if (note.name == item.name) return response.json(error.name);
  }

  const obj = {
    id: !note?.id ? randomNumber() : note?.id,
    name: note?.name,
    number: note?.number,
  };
  persons = persons.concat(obj);
  response.json(obj);
});

const PORT = process.env.PORT || 3009;
app?.listen(PORT, () => {
  console.log(`Server  running on port ${PORT}`);
});
