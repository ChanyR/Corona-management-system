const dataBase=require("../module/index");
const dbVaccinationCustomer=dataBase.vaccinationsCustomers;
const dbDatesIllness=dataBase.datesIllness;
const dbVaccinations=dataBase.vaccinations;


//a function that retarn all the data about HMOcustomer
async function GetAllDataCustomer(customer){
            let custId=customer._id;
            //find the date illness of the customer
            let customerToShow1=await dbDatesIllness.findOne({"customerCode":custId}).populate('customerCode');
            //find the vacvation of the castomer
            let customerToShow2=await dbVaccinationCustomer.findOne({"customerCode":custId});
            let customerToShow={};
            let vaction=[];
            if(customerToShow2!=null){
                if(customerToShow2.fourthVaccination.vaccinationsCode!=undefined){
                    vaction=[customerToShow2.FirstVaccination,customerToShow2.secondVaccination,customerToShow2.thirdVaccination,customerToShow2.fourthVaccination];
                }
                else if(customerToShow2.thirdVaccination.vaccinationsCode!=undefined){
                    vaction=[customerToShow2.FirstVaccination,customerToShow2.secondVaccination,customerToShow2.thirdVaccination];
                }
                else if(customerToShow2.secondVaccination.vaccinationsCode!=undefined){
                    vaction=[customerToShow2.FirstVaccination,customerToShow2.secondVaccination];
                }
                else if(customerToShow2.FirstVaccination.vaccinationsCode!=undefined){
                    vaction=[customerToShow2.FirstVaccination];
                }
            }
            //find the deatil of the vactions
            for(let i=0;i<vaction.length;i++){
                let v=vaction[i];
                let data=await dbVaccinations.find({"code":v.vaccinationsCode});
                vaction[i]={"code":v.vaccinationsCode,"name":data[0].vaccinationsName,"manufacturer":data[0].manufacturer,"date":v.vaccinationDate}
            }

            if(customerToShow1!=null){
                // customerToShow={
                //     ...customerToShow1.customerCode._doc,"positiveCoronaDate":customerToShow1.positiveCoronaDate,"negativeCoronaDate":customerToShow1.negativeCoronaDate,"vactions":vaction
                // }
                customerToShow={
                    "customerId":customer.customerId,"name":customer.name,"address":customer.address,"phone":customer.phone,"positiveCoronaDate":customerToShow1.positiveCoronaDate,"negativeCoronaDate":customerToShow1.negativeCoronaDate,"vactions":vaction
                }
            }
            else{
                customerToShow={
                    "customerId":customer.customerId,"name":customer.name,"address":customer.address,"phone":customer.phone,"vactions":vaction
                }
            }
            return customerToShow;
}

module.exports={
    GetAllDataCustomer,
}