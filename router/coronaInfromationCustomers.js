const express=require('express');
const router=express.Router();
const controllerCoronaInfromationCustomers=require('../controler/coronaInfromationCustomers');

//read all
router.get("/",controllerCoronaInfromationCustomers.GetAllCoronaInfromationCustomers);
//read one by id
router.get("/:id",controllerCoronaInfromationCustomers.GetCoronaInfromationCustomersById);

module.exports=router;