# Scanning Warehouse

Scanning Warehouse is a web application that allows you to supervise your warehouse. It also distributes packages to drivers, and you have the ability to know in real-time which driver is ready to deliver the packages and which packages haven't been scanned.

## Technologies Used

- **Front-end:** React.js, JavaScript, CSS
- **Back-end:** Node.js, Express.js

## Running

1. Clone the repository.
2. Run `npm install` in the Backend and Frontend folders to install the required packages.
3. Create a warehouse database in PostgreSQL.
4. Create a `util-helpers` folder and inside it create a file named `db.js`. Add the following code to the file:

```javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_db', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres', 
});

module.exports = sequelize;

```

## Testing
To test the application, follow these steps:

1. Start by pressing the reset button to fill the database with data.
2. Scan packages using the voucher code in the scan field.
3. Every time you press the 'Pending or All' button, the array will change, displaying either all packages or only the pending items.
4. You can check the scanned packages at any time.
5. Once you have scanned all the pending packages for a driver, the driver will immediately appear in the ready drivers array.
6. To reset all the data, use the reset button.