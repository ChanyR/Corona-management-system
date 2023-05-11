const mongoose = require('mongoose');
const Schema=mongoose.Schema;

// create vaccinationsCustomer schema & model
const VaccinationsCustomerSchema=new Schema({
    customerCode:{ 
        type:Schema.Types.ObjectId,
        require:true, 
        ref:'HMOcustomers'
    },
    customerId:{
        type:String,
        unique:true,
        require:true,
    },
    FirstVaccination:{
        vaccinationsNum:{ type:Schema.Types.ObjectId, ref:'vaccinations'},
        vaccinationsCode:{ type:Number},
        vaccinationDate:{ type:Date},
    },
    secondVaccination:{
        vaccinationsNum:{ type:Schema.Types.ObjectId, ref:'vaccinations'},
        vaccinationsCode:{ type:Number },
        vaccinationDate:{ type:Date},
    },
    thirdVaccination:{
        vaccinationsNum:{ type:Schema.Types.ObjectId, ref:'vaccinations'},
        vaccinationsCode:{ type:Number },
        vaccinationDate:{ type:Date},
    },
    fourthVaccination:{
        vaccinationsNum:{ type:Schema.Types.ObjectId, ref:'vaccinations'},
        vaccinationsCode:{ type:Number },
        vaccinationDate:{ type:Date},
    },
});

VaccinationsCustomerSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
//create object 
const vaccinationsCustomers= mongoose.model('vaccinationsCustomers',VaccinationsCustomerSchema);
//create colection 
vaccinationsCustomers.createCollection().then(function (collection) {
    console.log('Collection is created!');
});
vaccinationsCustomers.createIndexes();

module.exports  = vaccinationsCustomers;