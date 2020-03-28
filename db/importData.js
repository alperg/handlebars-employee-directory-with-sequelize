const axios = require("axios");
const ora = require('ora');
const logo = require("asciiart-logo");

const db = require("../models");
db.Employee.sync();

const spinner = ora('Importing data...');
spinner.start();

const logoText = logo({ name: "Import" }).render();
console.log(logoText);

axios.get('https://alper.dev/employees')
  .then(result => {
    const data = result.data.map(row => {
      return {
        avatar: row.avatar,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        gender: row.gender,
        department: row.department,
        startDate: row.date
      };
    });

    db.Employee.bulkCreate(data).then(() => {
      setTimeout(() => {
        spinner.stopAndPersist({
          symbol: '👍',
          text: 'All done!',
        });
        process.exit();
      }, 2000);
    });
  }).catch(err => {
    console.log(err);
  });
