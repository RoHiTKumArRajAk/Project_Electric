const mongoose = require('mongoose') ;
const {Schema} = mongoose ;

const MasterSchema = new Schema({
      Code:{
            type: String,
      },
      Name:{
            type: String,
      },
      Dept:{
            type: String,
      },
      PrevBalance:{
            type: Number,
      },
      Location:{
            type: String,
      },
      LastReading:{
            type: Number,
      },

      MeterCharge:{
            type: Number,
      },
      UnitRate:{
            type: Number,
      },
      LastDate:{
            type: Date,
      },
      Allocation:{
            type: String,
      },
      CurrentPayment:{
            type: Number,
      },
      LastPaymentDate:{
            type: Date,
      },
}) ;

module.exports = mongoose.model('master', MasterSchema)