const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dataBase = {};
dataBase.mongoose = mongoose;
dataBase.url = process.env.URL;
dataBase.HMOcustomers=require("./HMOcustomer.module");
dataBase.vaccinations=require("./vaccination.module");
dataBase.vaccinationsCustomers=require("./vaccinationsCustomer.module");
dataBase.datesIllness=require("./datesIllness.module");

module.exports = dataBase;