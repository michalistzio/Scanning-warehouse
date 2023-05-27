# Scanning Warehouse

Scanning Warehouse is a web application that allows you to supervise your warehouse. It also distributes packages to drivers, and you have the ability to know in real-time which driver is ready to deliver the packages and which packages haven't been scanned.

## Technologies Used

- **Front-end:** React.js, JavaScript, CSS
- **Back-end:** Node.js, Express.js

## Installation steps

1. Clone the repository.
2. Run `npm install` in the Backend and Frontend folders to install the required packages.
3. Create a warehouse database in PostgreSQL.
4. Create a `util-helpers` folder and inside it create a file named `db.js`. Add the following code to the file:

```javascript
const Sequelize = require('sequelize');

const sequelize = new Sequelize('warehouse', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres', 
});

module.exports = sequelize;

```
## Execution steps

1. Run ```npm start``` command in terminal to `./Backend` to up the server.
2. Run ```npm run dev``` command in terminal to `./Frontend` to up the client.


## Testing
To test the application, follow these steps:

1. Start by pressing the reset button to fill the database with data.
2. Scan packages using the voucher code in the scan field.
3. Whenever you check the 'Pending' checkbox, the array will update to show only the pending items. When it is unchecked, all the items will be displayed.
4. You can check the scanned packages at any time.
5. Once you have scanned all the pending packages for a driver, the driver will immediately appear in the ready drivers array.
6. To reset all the data, use the reset button.