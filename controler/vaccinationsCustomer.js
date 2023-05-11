const dataBase=require("../module/index");
const dbVaccinationCustomer=dataBase.vaccinationsCustomers;
const dbHMOcustomer=dataBase.HMOcustomers;
const dbVaccinations=dataBase.vaccinations;


//get all Vaccinations of Customer
async function  GetAllVaccinationsCustomer(req,res){
    console.log("get all vaccinations customer");
    let allData=await dbVaccinationCustomer.find({});
    res.send(allData);
}

//add new Vaccinations Customer
async function PostVaccinationsCustomer(req,res){
    console.log("add vaccinations customer");
    let newVaccinationCustomer=req.body;
    
    try{
        //check if the customer exist in HMOcustomer table
        let check=await  dbHMOcustomer.find({ "customerId": newVaccinationCustomer.customerId })
            if (check.length!=0) {
                if(newVaccinationCustomer.FirstVaccination!=undefined){
                    //check if the first vaccination is valid
                    dbVaccinations.findOne({"code":newVaccinationCustomer.FirstVaccination.vaccinationsCode}).exec()
                    .then((y)=>{
                        if(y){
                            if(newVaccinationCustomer.secondVaccination!=undefined){
                                //check if the second vaccination is valid
                                dbVaccinations.findOne({"code":newVaccinationCustomer.secondVaccination.vaccinationsCode}).exec()
                                .then((c)=>{
                                    if(c){
                                        if(newVaccinationCustomer.thirdVaccination!=undefined){
                                            //check if the third vaccination is valid
                                            dbVaccinations.findOne({"code":newVaccinationCustomer.thirdVaccination.vaccinationsCode}).exec()
                                            .then((k)=>{
                                                if(k){
                                                    if(newVaccinationCustomer.fourthVaccination!=undefined){
                                                        //check if the fourth vaccination is valid
                                                        dbVaccinations.findOne({"code":newVaccinationCustomer.fourthVaccination.vaccinationsCode}).exec()
                                                        .then((l)=>{
                                                            if(l){
                                                                //add alll
                                                                const newToAdd={"customerCode":check[0]._id,"customerId":newVaccinationCustomer.customerId,"FirstVaccination":newVaccinationCustomer.FirstVaccination,"secondVaccination":newVaccinationCustomer.secondVaccination,"thirdVaccination":newVaccinationCustomer.thirdVaccination,"fourthVaccination":newVaccinationCustomer.fourthVaccination};
                                                                let vaccinationsCust=dbVaccinationCustomer.create(newToAdd)
                                                                .then((newVaccinationCustomer) => { res.status(200).send("secssed to add vaccinations") })
                                                                .catch((err) => { res.status(500).send(err) })
                                                            }
                                                            else{
                                                                res.status(400).send("the fourthVaccination code Invalid");
                                                            }
                                                        })
                                                        }
                                                        else{
                                                            //add without four
                                                            const newToAdd={"customerCode":check[0]._id,"customerId":newVaccinationCustomer.customerId,"FirstVaccination":newVaccinationCustomer.FirstVaccination,"secondVaccination":newVaccinationCustomer.secondVaccination,"thirdVaccination":newVaccinationCustomer.thirdVaccination};
                                                            newToAdd.fourthVaccination=undefined;
                                                            let vaccinationsCust=dbVaccinationCustomer.create(newToAdd)
                                                                .then((newVaccinationCustomer) => { res.status(200).send("secssed to add vaccinations") })
                                                                .catch((err) => { res.status(500).send(err) })
                                                        }
                                                }
                                                else{
                                                    res.status(400).send("the thirdVaccination code Invalid");
                                                }

                                            })
                                        }
                                        else{
                                            //add without third
                                            newToAdd.thirdVaccination=undefined;
                                            newToAdd.fourthVaccination=undefined;
                                            const newToAdd={"customerCode":check[0]._id,"customerId":newVaccinationCustomer.customerId,"FirstVaccination":newVaccinationCustomer.FirstVaccination,"secondVaccination":newVaccinationCustomer.secondVaccination};
                                            let vaccinationsCust=dbVaccinationCustomer.create(newToAdd)
                                                .then((newVaccinationCustomer) => { res.status(200).send("secssed to add vaccinations") })
                                                .catch((err) => { res.status(500).send(err) })
                                        }
                                    }
                                    else{
                                        res.status(400).send("the secondVaccination code Invalid");
                                    }
                                })
                            }
                            else{
                                //add without second
                                newToAdd.secondVaccination=undefined;
                                newToAdd.thirdVaccination=undefined;
                                newToAdd.fourthVaccination=undefined;
                                const newToAdd={"customerCode":check[0]._id,"customerId":newVaccinationCustomer.customerId,"FirstVaccination":newVaccinationCustomer.FirstVaccination};
                                let vaccinationsCust=dbVaccinationCustomer.create(newToAdd)
                                .then((newVaccinationCustomer) => { res.status(200).send("secssed to add vaccinations") })
                                .catch((err) => { res.status(500).send(err) })
                            }
                            
                        }
                        else{
                            res.status(400).send("the FirstVaccination code Invalid")
                        }
                    })
                }
            }
            else {
                res.status(400).send("this customer is not exist in HMO")
            }
        }catch(ex){
            res.status(500).send(ex);    
        }
    }



//get infromation about one client's vaccinations
async function  GetVaccinationCustomerById(req,res){
    console.log("get vaccination customer by Id");
    let id=req.params.id || req.query.id;
    try{
        let data=await dbVaccinationCustomer.find({"customerId":id})
        if(data.length!=0){
            res.send(data).status(200);
        }
        else{
            res.send("the customer is not resilient").status(400);
        }
    }
    catch(err){
        res.status(500).send("err");
    }
}

module.exports={
    GetAllVaccinationsCustomer,PostVaccinationsCustomer,GetVaccinationCustomerById
}