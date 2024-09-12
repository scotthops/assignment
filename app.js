const express = require('express');
const app = express();
app.use(express.json());

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

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
