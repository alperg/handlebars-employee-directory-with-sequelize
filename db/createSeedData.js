const axios = require("axios");
const fs = require("fs");
const logo = require("asciiart-logo");

const logoText = logo({ name: "Create Seed" }).render();
console.log(logoText);

axios.get('https://alper.dev/employees')
  .then(result => {
    // console.log(result);
    let sql = "";
    result.data.forEach(row => {
      sql += `insert into Employees (avatar, firstName, lastName, email, gender, department, startDate) values ("${row.avatar}", "${row.firstName}",  "${row.lastName}", "${row.email}", "${row.gender}", "${row.department}", "${row.date}");\n\n`;
    });

    fs.writeFile("seeds.sql", sql, (err) => {
      if(err) console.log(err);
      console.log("Seeds file created.");
    });

  }).catch(err => {
    console.log(err);
  });