const express = require('express');

const errorController = require('./controllers/404');

const dataIntsRoutes = require('./routes/data_init');
const sequelize = require('./util-helpers/db');

// const Cluster = require('./models/cluster');
// const Driver = require('./models/driver');
// const Package = require('./models/package');


const app = express();

// Use the routes
// app.use('/', routes);
app.use(dataIntsRoutes)
app.use(errorController.get404); 

//error middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});


// Driver.belongsTo(Cluster, {
//     foreignKey: 'clusterId',
//     constraint: true,
//     onDelete: 'CASCADE'
// });
// Cluster.hasMany(Driver);

sequelize
// .sync({force: true}) // to overwrite the table 
    .sync()
    .then(() => {
    console.log('Database synchronized');
    app.listen(8080);
    })
    .catch((err) => {
    console.log(err);
    });