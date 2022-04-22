const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("tiny"));

let data = [
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

app.get("/", (request, response) => response.send("Hello world!"));
app.get("/info", (request, response) => {
	response.send(
		` Phonebook has info for ${data.length} people, as of ${new Date()}`
	);
});
app.get("/api/persons", (request, response) => response.json(data));
app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = data.find((person) => {
		return person.id === id;
	});
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});
app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = data.find((person) => {
		return person.id === id;
	});
	if (person) {
		data.splice(data.indexOf(person), 1);
		response.json(person);
	} else {
		response.status(404).end();
	}
});
app.post("/api/persons", (request, response) => {
	const body = request.body;
	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	} else if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	} else if (data.find((person) => person.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}
	const person = {
		id: Math.round(Math.random() * 10000),
		name: body.name,
		number: body.number,
	};

	data = data.concat(person);
	response.json(person);
});
app.listen(port, () => console.log(`We're listening on port ${port}!`));
