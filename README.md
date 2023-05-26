#Scanning Warehouse

Scanning Warehouse is a web application that allows you to have supervision in your warehouse. Also distibutes the packages to the drivers and you have the ability to know in real time who driver is ready to deliver the packages and which packages haven't scanned.

## Technologies Used

- **Front-end:** React.js, Javascript, CSS
- **Back-end:** Node.js, Express.js

## Running

- **1st step:**  clone repository
- **2nd step:** run npm install in Backend and Frontend folders to install the required packages
- **3d step:** create in postgres warehouse database
- **4th step:**  create util-helpers folder and there create the file db.js and write this:

```javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_db', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres', 
});

module.exports = sequelize;
```

## Testing

For testing first of all you must press reset button to fill the database with data.
We can scan packages with the voucher code in the scan field.
Every time we press the 'Pending or All' button we change the Array and we have all the packages or only the pending itmes. Any time we have the ability to checked the scanned packages. When we have scanned all the pending packages for a driver, the driver immediately is appear in ready drivers Array. In the end any time we can reset all the data with reset button.