const mongoose = require('mongoose');
const Schema=mongoose.Schema;

// create  DatesIllness schema & model
const DatesIllnessSchama=new Schema({
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
    positiveCoronaDate:{
        type:Date
    },
    negativeCoronaDate:{
        type:Date
    },
});

DatesIllnessSchama.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
//create object 
const DatesIllness= mongoose.model('DatesIllness',DatesIllnessSchama);
//create colection 
DatesIllness.createCollection().then(function (collection) {
    console.log('Collection is created!');
});
DatesIllness.createIndexes();

module.exports  = DatesIllness;