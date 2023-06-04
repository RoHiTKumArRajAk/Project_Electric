const mongoose = require('mongoose') ;
const {Schema} = mongoose ;

const TransactionSchema = new Schema({
      Code:{
            type:String
      },
      ToDate:{
            type: String,
      },
      CurrentReading:{
            type: Number,
      },
      CurrentPayment:{
            type: Number,
      },
      CurrentPaymentDate:{
            type: String,
      },
      CurrentCharges:{
            type: Number,
      },
      TotalDues:{
            type: Number,
      }
}) ;

module.exports = mongoose.model('transaction', TransactionSchema)