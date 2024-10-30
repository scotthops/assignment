const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

// ASSIGN1
// GET /foo -> "bar"
app.get('/foo', (req, res) => {
    res.send('bar');
});

// POST /hello -> "Hello {name}!"
app.post('/hello', (req, res) => {
    const name = req.body.name || 'World';
    res.send(`Hello ${name}!`);
});

// GET /kill -> Exit the process
app.get('/kill', (req, res) => {
    res.send('Shutting down...');
    process.exit();
});

//ASSIGN2
// GET /configValue -> Return 'configValue'
app.get('/configValue', (req, res) => {
    const configValue = process.env.CONFIG_VALUE || 'No Config Value Set';
    res.send(configValue);
});

// GET /secretValue -> Return the value of 'secretValue'
app.get('/secretValue', (req, res) => {
    const secretValue = process.env.SECRET_VALUE || 'No Secret Value Set';
    res.send(secretValue);
});

// GET /envValue -> Return the value of 'envValue'
app.get('/envValue', (req, res) => {
    const envValue = process.env.ENV_VALUE || 'No Env Value Set';
    res.send(envValue);
});

//Assign 3
const filePath = '/data/savedString.txt';

// POST /saveString -> Save out string to persistent volume
app.post('/saveString', (req, res) => {
    const data = req.body.data;

    if (!data) {
        return res.status(400).send('No data provided');
    }
    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, data);
    res.send('Data saved');
});

// GET /getString -> Retrieve string saved to persistent volume
app.get('/getString', (req, res) => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        res.send(data);
    } else {
        res.status(404).send('404: No data found');
    }
});

// GET /busywait -> Make CPU busy for 3 mins
app.get('/busywait', (req, res) => {
    res.send('Starting CPU intensive task');
    const end = Date.now() + 3 * 60 * 1000; // 3 minutes
    while (Date.now() < end) {
        // Random task for busy wait
        Math.sqrt(Math.random());
    }
});


// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
