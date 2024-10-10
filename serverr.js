const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, results) => {
        if (err) {
            return res.status(5000).send(err);
        }
        res.json(results);
    });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, results) => {
        if (err) {
            return res.status(5000).send(err);
        }
        res.json(results);
    });
});

// Question 3: Filter patients by First Name
app.get('/patients/by_name/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [firstName], (err, results) => {
        if (err) {
            return res.status(5000).send(err);
        }
        res.json(results);
    });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/by_specialty/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    db.query('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Listen to the server
const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
