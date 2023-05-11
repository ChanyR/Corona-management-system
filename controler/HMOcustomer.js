const dataBase=require("../module/index");
const dbHMOcustomer=dataBase.HMOcustomers;


//get all HMOcustomers
async function  GetAllHMOcustomers(req,res){
    console.log("get all HMO customers");
    let allData=await dbHMOcustomer.find({});
    res.send(allData);
}

//add new HMOcustomer
async function PostHMOcustomer(req,res){
    console.log("add HMO customer");
    let newHMOcustomer=req.body;
    //check if the customer is exist in the HMOcustomer table
    let check=  dbHMOcustomer.findOne({ "customerId": newHMOcustomer.customerId }).exec()
        .then((hmoCustomer) => {
            if (hmoCustomer) {
                res.status(400).send("HMOcustomer already is exist");
            }
            else {
                let hmo=dbHMOcustomer.create(newHMOcustomer)
                .then((newHMOcustomer) => { res.status(200).send("secssed to add HMOcustomer") })
                .catch((err) => { res.status(500).send(err) })
            }
        })
}

//get one HMOcustomer
async function  GetHMOcustomerById(req,res){
    console.log("get one HMO customers");
    let id=req.params.id || req.query.id;
    try{
        let data=await dbHMOcustomer.find({"customerId":id});
        if(data.length!=0){
            res.send(data).status(200);
        }
        else{
            res.send("HMOcustomer is not exist").status(400);
        }
        
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports={
    GetAllHMOcustomers,PostHMOcustomer,GetHMOcustomerById,
}