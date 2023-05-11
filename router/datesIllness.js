const express=require('express');
const router=express.Router();
const controllerDateIllness=require('../controler/datesIllness');

//read all
router.get("/",controllerDateIllness.GetAllDatesIllness);
//read one by id
router.get("/:id",controllerDateIllness.GetDateIllessById);
//add
router.post("/",controllerDateIllness.PostDatesIllness);

module.exports=router;