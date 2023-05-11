const mongoose = require('mongoose');
const Schema=mongoose.Schema;
ObjectId=Schema.ObjectId;


// create vaccination schema & model
const VaccinationSchema=new Schema({
    vaccinationsNum: {
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    code:{
        type:Number,
        unique:true,
        require:true,
    },
    vaccinationsName:{
        type:String ,
        require:true
    },
    manufacturer:{
        type:String ,
        require:true
    }
});

VaccinationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
//create object 
const vaccinations= mongoose.model('vaccinations',VaccinationSchema);
//create colection 
vaccinations.createCollection().then(function (collection) {
    console.log('Collection is created!');
});
vaccinations.createIndexes();

module.exports  = vaccinations;