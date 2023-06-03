const mongoose = require('mongoose') ;
const {Schema} = mongoose ;

const PrintSchema = new Schema({
      code:{
            type:String
      },
      DateGen:{
            type: Date,
      },
      previousBalance:{
            type: String,
      },
      currentCharges:{
            type:String
      },
      totalDue:{
            type:String
      },
}) ;

module.exports = mongoose.model('printdb', PrintSchema)