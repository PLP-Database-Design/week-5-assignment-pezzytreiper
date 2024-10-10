// Initialise dependencies

const express = require('express');
const app = express();
const mysql = require ('mysql2');
const dotenv =require ('dotenv');
const cors = require('cors');
app.use(express.json());
app.use(cors());
dotenv.config();

//connect to the database

const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

// check if db connection works
db.connect((err)=>{
    //no  connection
    if(err) return console.log("Error connecting to the mysql db");

    // Yes connected
console.log("connected to mysql successfully as id:",db.threadId)

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on port ${process.env.PORT}`);
 
    //send a message to the browser
    console.log('sendingmessage to browser...');
    app.get('/', (req,res) => {
        res.send('server started succesfully! connection can go on ')
    })

// Question 1 goes here

const express = require('express');
const app = express();

// Simulated database
const patients = [
    { patient_id: 1, first_name: 'John', last_name: 'Doe', date_of_birth: '1980-01-01' },
    { patient_id: 2, first_name: 'Jane', last_name: 'Smith', date_of_birth: '1990-02-02' },
    // Add more patients as needed
];

// GET endpoint to retrieve all patients
app.get('/patients', (req, res) => {
    res.json(patients);
});


// Question 2 goes here

async function getProviders() {
    try {
        const response = await fetch('/providers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const providers = await response.json();
        return providers;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Example usage
getProviders().then(providers => console.log(providers));

// Question 3 goes here

async function getPatientsByName(first_name) {
    try {
        const response = await fetch(`/patients/by_name/${first_name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const patients = await response.json();
        return patients;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Example usage
getPatientsByName('John').then(patients => console.log(patients));

// Question 4 goes here

async function getProvidersBySpecialty(specialty) {
    try {
        const response = await fetch(`/providers/by_specialty/${specialty}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const providers = await response.json();
        return providers;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Example usage
getProvidersBySpecialty('Cardiology').then(providers => console.log(providers));


// listen to the server
const PORT = 3306
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
});
});