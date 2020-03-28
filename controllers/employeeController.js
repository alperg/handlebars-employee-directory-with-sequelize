const moment = require("moment");
const express = require("express");
const router = express.Router();
const db = require("../models");

db.Employee.sync();

const parseData = (data) => {
  return data.map(emp => {
    const empStartDate = moment(emp.startDate, 'M/D/YYYY');
    emp.daysWorked = moment().diff(empStartDate, 'days');
    return emp;
  });
}

router.get("/", (req, res) => {
  db.Employee.findAll({ raw: true }).then(data => {
    res.render("index", { employees: parseData(data) });
  });
});

router.get("/api/employees/:id?", (req, res) => {
  if(req.params.id) {
    db.Employee.findOne({
      where: { id: req.params.id },
      raw: true
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      status(500).end();
    });
  } else {
    db.Employee.findAll({ raw: true }).then(data => {
      res.json(parseData(data));
    });
  }
});

router.post("/api/employees", (req, res) => {
  const newEmp = {
    avatar: req.body.avatar,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    department: req.body.department,
    startDate: req.body.startDate
  };

  db.Employee.create(newEmp).then(data => {
    res.status(200).end();
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
  });
});

router.put("/api/employees/:id", (req, res) => {
  const updEmp = {
    avatar: req.body.avatar,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    department: req.body.department,
    startDate: req.body.startDate
  };

  db.Employee.update(updEmp, {
    where: { id: req.params.id }
  })
  .then(function(data) {
    res.status(200).end();
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
  });
});

router.delete("/api/employees/:id", (req, res) => {
  db.Employee.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(data) {
    res.status(200).end();
  })
  .catch(err => {
    console.log(err);
    res.status(500).end();
  });
});

module.exports = router;
