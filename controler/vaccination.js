const dataBase=require("../module/index");
const dbVaccinations=dataBase.vaccinations;

//get all vaccinations
async function  GetAllVaccinations(req,res){
    console.log("get all vaccinations");
    let allData=await dbVaccinations.find({});
    res.send(allData);
}

//add one vaccination
async function PostVaccinations(req,res){
    console.log("add vaccinations");
    let newVaccination=req.body;
    //check if the vaccination is exist in the vaccination table
    let check=  dbVaccinations.findOne({ "code": newVaccination.code }).exec()
        .then((va) => {
            if (va) {
                res.status(400).send("vaccinations already is exist")
            }
            else {
                let vaccinations=dbVaccinations.create(newVaccination)
                .then((newVaccination) => { res.status(200).send("secssed to add vaccinations") })
                .catch((err) => { res.status(500).send(err) })
            }
        })
}

//get one vaccination by vaccination's code
async function  GetVaccinationByCode(req,res){
    console.log("get one vaccination");
    let code=req.params.code || req.query.code;
    try{
        let data=await dbVaccinations.find({"code":code});
        if(data.length!=0){
            res.send(data).status(200);
        }
        else{
            res.send("invalid code").status(400);
        }
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports={
    GetAllVaccinations,PostVaccinations,GetVaccinationByCode
}