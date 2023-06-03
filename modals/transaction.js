const mongoose = require('mongoose') ;
const {Schema} = mongoose ;

const TransactionSchema = new Schema({
      Code:{
            type:String
      },
      ToDate:{
            type: Date,
      },
      CurrentReading:{
            type: Number,
      },
}) ;

module.exports = mongoose.model('transaction', TransactionSchema)