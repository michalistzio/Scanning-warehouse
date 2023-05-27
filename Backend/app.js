const express = require('express');

const sequelize = require('./util-helpers/db');
const errorController = require('./controllers/404');

const dataInitsRoutes = require('./routes/data_init');
const destributionRoutes = require('./routes/destribution');
const bodyParser = require('body-parser');

//models
const Cluster = require('./models/cluster');
const Driver = require('./models/driver');

const app = express();

//associations
Driver.belongsTo(Cluster, {
    foreignKey: 'clusterId',
    constraint: true,
    onDelete: 'CASCADE'
});

app.use(bodyParser.json());

//set a headers to avoid CORS Erros (Cross-Origin Resource Sharing) and  make communicate between client and server possible
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Use the routes
app.use(dataInitsRoutes)
app.use(destributionRoutes)
app.use(errorController.get404); 

//error middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

sequelize
    .sync()
    .then(() => {
    console.log('Database synchronized');
    app.listen(8080);
    })
    .catch((err) => {
    console.log(err);
    });
