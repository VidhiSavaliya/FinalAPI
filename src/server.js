const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filePath = './data/cars.json';

app.use(bodyParser.json());

const readData = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


//Create 
app.post('/cars', (req, res) => {
    const cars = readData();
    
    const newCar = {
        id: Date.now(), // Unique ID based on timestamp
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
    };

    cars.push(newCar);
    writeData(cars);

    res.status(201).json(newCar);
});

//Get all cars
app.get('/cars', (req, res) => {
    const cars = readData();
    res.json(cars);
});

//Get a car by ID 
app.get('/cars/:id', (req, res) => {
    const cars = readData();
    const car = cars.find(c => c.id === parseInt(req.params.id));

    if (!car) {
        return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car);
});


//Update a car by ID 
app.put('/cars/:id', (req, res) => {
    const cars = readData();
    const index = cars.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }

    cars[index] = { ...cars[index], ...req.body };
    writeData(cars);

    res.json(cars[index]);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
