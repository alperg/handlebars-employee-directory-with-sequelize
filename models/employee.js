'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    avatar: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    department: DataTypes.STRING,
    startDate: DataTypes.STRING
  }, {
    timestamps: false
  });
  
  return Employee;
};
