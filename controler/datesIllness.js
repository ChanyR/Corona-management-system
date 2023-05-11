const dataBase=require("../module/index");
const dbDatesIllness=dataBase.datesIllness;
const dbHMOcustomer=dataBase.HMOcustomers;


//get all dates about customers's Illness
async function  GetAllDatesIllness(req,res){
    console.log("get all date illness");
    let allData=await dbDatesIllness.find({});
    res.send(allData);
}



//add date of customers's Illness
async function PostDatesIllness(req,res){
    console.log("add dates illness");
    let newRow=req.body;
    //check if the customer is exist in the HMOcustomer table
    let customer=await dbHMOcustomer.find({ "customerId": newRow.customerId })
    if (customer.length!=0) {
            newRow.customerCode=customer[0]._id;
            const newCoronaIllnessToAdd={"customerCode":newRow.customerCode,"customerId":newRow.customerId,"positiveCoronaDate":newRow.positiveCoronaDate,"negativeCoronaDate":newRow.negativeCoronaDate};
            //check if the customer was sicked in datesIllness table
            let isSicked=dbDatesIllness.findOne({"customerId":newRow.customerId}).exec()
            .then((x)=>{
                if(x){
                    res.status(400).send("this customer is was sicked");
                }else{
                    let cust=dbDatesIllness.create(newCoronaIllnessToAdd)
                    .then((newRow) => { res.status(200).send("this customer is exist and secssed to add dataIllness") })
                    .catch((err) => { res.status(500).send(err) })
                }
            })            
        }
        else {
            res.status(400).send("this customer is not exist in HMO");
        }
    }


    
//get infromation about one customers's date Illness
async function  GetDateIllessById(req,res){
    console.log("get one date illness");
    let id=req.params.id || req.query.id;
    try{
       let data=await dbDatesIllness.find({"customerId":id});
       if(data.length!=0){
           res.send(data);
       }
       else{
           res.send("the customer was not sicked").status(400);
       }
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports={
    GetAllDatesIllness,PostDatesIllness,GetDateIllessById
}