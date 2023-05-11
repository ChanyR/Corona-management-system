const mongoose = require('mongoose');
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;

// create HMOcustomer schema & model
const HMOcustomerSchema=new Schema({
    customerId:{
        type:String,
        unique:true,
        require:true,
    },
    name:{
        firstName:{ type:String ,require:true},
        lastName:{ type:String ,require:true},
    },
    address:{
        city:{ type:String },
        street:{ type:String },
        homeNumber:{ type: Number },
    },
    dateOfBirth:{
        type:Date
    },
    phone:{
        phone:{type:String,  length:9},
        mobilePhone:{type:String, length:10}
    },
});


HMOcustomerSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
//create object 
const HMOcustomers= mongoose.model('HMOcustomers',HMOcustomerSchema);
//create colection 
HMOcustomers.createCollection().then(function (collection) {
    console.log('Collection is created!');
});
HMOcustomers.createIndexes();
 
module.exports  = HMOcustomers;