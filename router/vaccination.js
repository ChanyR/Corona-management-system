const express=require('express');
const router=express.Router();
const controllerVaccination=require('../controler/vaccination');

//read all
router.get("/",controllerVaccination.GetAllVaccinations);
//read one by code
router.get("/:code",controllerVaccination.GetVaccinationByCode);
//add
router.post("/",controllerVaccination.PostVaccinations);

module.exports=router;