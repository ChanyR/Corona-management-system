const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
//טוען את env לתוך ה process
const dotenv = require('dotenv');
const app = express();

const routerDatesIlless=require('./router/datesIllness');
const routerHMOcustomers=require('./router/HMOcustomers');
const routerVaccination=require('./router/vaccination');
const routerVaccinationCustomers=require('./router/vaccinationsCustomer');
const routerCoronaInfromationCustomers=require('./router/coronaInfromationCustomers');

dotenv.config();
console.log(process.env.URL);

const database=require('./module/index');

//setting on the database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

database.mongoose.connect(process.env.URL,options)
.then(()=>{
    console.log("Connected to the database!");
})
.catch(err=>{
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT,()=>console.log("server is run "+process.env.PORT));

app.get("/",(req,res)=>{res.send("hello server")});
app.use("/datesIllness",routerDatesIlless);
app.use("/HMOcustomers",routerHMOcustomers);
app.use("/vaccinations",routerVaccination);
app.use("/vaccinationsCustomers",routerVaccinationCustomers);
app.use("/coronaInfromationCustomers",routerCoronaInfromationCustomers);