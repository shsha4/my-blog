const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const router = require('./route');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);



app.listen(PORT, () => {
    console.log(`Server On : localhost:${PORT}`);
});

