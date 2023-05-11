const express=require('express');
const router=express.Router();
const controllerVaccinationCustomer=require('../controler/vaccinationsCustomer');

//read all
router.get("/",controllerVaccinationCustomer.GetAllVaccinationsCustomer);
//read one by id
router.get("/:id",controllerVaccinationCustomer.GetVaccinationCustomerById);
//add
router.post("/",controllerVaccinationCustomer.PostVaccinationsCustomer);

module.exports=router;