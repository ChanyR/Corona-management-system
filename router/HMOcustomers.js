const express=require('express');
const router=express.Router();
const controllerHMOcustomers=require('../controler/HMOcustomer');

//read all
router.get("/",controllerHMOcustomers.GetAllHMOcustomers);
//read one by id
router.get("/:id",controllerHMOcustomers.GetHMOcustomerById);
//add
router.post("/",controllerHMOcustomers.PostHMOcustomer);

module.exports=router;