const express = require('express');
const app = express();

app.get('/isAlive', (req, res) => {
    res.send('true');
});

app.listen(30010, () => {
    console.log('Probe service running on port 30010');
});
