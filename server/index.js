const express = require('express');
const app = express();

// health Api
app.get('/', (req, res) => {
    res.json({ 
        message: 'Api is Healthy',
        status: 200
    });
});

//server on port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
