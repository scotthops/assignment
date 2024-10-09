const express = require('express');
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

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
