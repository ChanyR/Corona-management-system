const dataBase=require("../module/index");
const dbHMOcustomer=dataBase.HMOcustomers;
const functionCoronaInfromationCustomers =require("../function/coronaInfromationCustomers");


//get all corona infromation about all the customers
async function  GetAllCoronaInfromationCustomers(req,res){
    console.log("get all corona infromation customers");
    try{
        let allData=await dbHMOcustomer.find({});
        let arrHMOcustomers=[];
        for(let i=0;i<allData.length;i++){
            let h=await functionCoronaInfromationCustomers.GetAllDataCustomer(allData[i]);
            if(h.length!=0)
                arrHMOcustomers.push(h);
        }
        res.send(arrHMOcustomers).status(200);
    }
    catch(err){
        res.send(err).status(500);
    }
}

//get corona infromation about one customers y id
async function  GetCoronaInfromationCustomersById(req,res){
    console.log("get corona infromation customers by id");
    try{
        let id=req.params.id || req.query.id;
        //find the customer
        let cust=await dbHMOcustomer.find({ "customerId": id });
        if(cust.length==0){
            res.send("the HMOcustomer is not exist in HMO").status(400)
        }
        else{
            let customer=cust[0];
            //send to a function that retarn all the data about the HMOcustomer
            let customerToShow=await functionCoronaInfromationCustomers.GetAllDataCustomer(customer);
            res.status(200).send(customerToShow);
            }  
    }
    catch(err){
        res.status(500).send(err)
    }
}

module.exports={
    GetAllCoronaInfromationCustomers,GetCoronaInfromationCustomersById
}