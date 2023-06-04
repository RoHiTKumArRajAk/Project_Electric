const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Master = require("./modals/master");
const Transaction = require("./modals/transaction");
const master = require("./modals/master");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/electric");

//get requests
app.get("/", async function (req, res) {

  const masterdocs = await Master.find({}) ;
  const transactiondocs = await Transaction.find({}) ;
  console.log(masterdocs.length);
  res.render("index", {master:masterdocs, transaction:transactiondocs});
});
app.get("/FirstForm", function (req, res) {
  res.render("form1");
});
app.get("/SecondForm", function (req, res) {
  res.render("form2");
});

app.get('/ShowPage', async function(req, res){
      const masterdocs = await Master.find({}) ;
      const transactiondocs = await Transaction.find({}) ;
      const updatedVals = [] ;
      
      for(let i=0;i<masterdocs.length;++i)
      {
            let el = masterdocs[i] ;
            const code = el.Code;
            const transactioncode = await Transaction.find({Code:code}) ;
            const updatedVal = {} ;
            updatedVal.Code = code ;
            updatedVal.date = transactioncode[0].ToDate;
            updatedVal.PrevBalance = el.PrevBalance ;
            updatedVal.CurrentCharges = (transactioncode[0].CurrentReading - el.LastReading) * el.UnitRate + el.MeterCharge ;
            updatedVal.TotalDue = updatedVal.PrevBalance+updatedVal.CurrentCharges ;
            updatedVals.push(updatedVal) ;
            const updatedtransaction = {
                  CurrentCharges : updatedVal.CurrentCharges,
                  TotalDues: updatedVal.TotalDue,
            } ;
            const a = await Transaction.findOneAndUpdate({Code:transactioncode[0].Code}, updatedtransaction) ;
      }
      res.render('showpage', {values:updatedVals}) ;
}) ;

//post
app.post("/FirstForm", async function (req, res) {

  try {
    const {
      Code,
      Name,
      Dept,
      PrevBalance,
      Location,
      LastReading,
      MeterCharge,
      UnitRate,
      LastDate,
      Allocation,
      // CurrentPayment,
      LastPaymentDate,
    } = req.body;
    const newFile = new Master({
      Code,
      Name,
      Dept,
      PrevBalance,
      Location,
      LastReading,
      MeterCharge,
      UnitRate,
      LastDate,
      Allocation,
      // CurrentPayment,
      LastPaymentDate,
    });
    const saveMaster = await newFile.save();
    res.redirect("/");
  } catch (error) {
      console.error(error.message);
  }
});

app.post('/SecondForm', async function(req, res){
      try{
            const {Code, ToDate, CurrentReading,CurrentPayment ,CurrentPaymentDate} = req.body ;
            const NewTransaction = new Transaction({
                  Code,
                  ToDate,
                  CurrentReading,
                  CurrentPayment,
                  CurrentPaymentDate,
            }) ;
            const saveTransaction = await NewTransaction.save() ;
            res.redirect('/') ;
            

      }catch(error){
            console.error(error.message);
      }
}) ;
app.post('/update', async function(req, res){
      console.log('we are in update');
      const transactiondocs = await Transaction.find({}) ;
      for(let i=0;i<transactiondocs.length;++i)
      {
            let el = transactiondocs[i] ;
            const idd = el.id ;
            const newupdate = {
                  PrevBalance : el.TotalDues - el.CurrentPayment,
                  LastReading : el.CurrentReading,
                  LastDate : el.ToDate,
                  LastPaymentDate: el.CurrentPaymentDate,

            }
            // console.log(newupdate);
           const a =await Master.findOneAndUpdate({Code:el.Code}, newupdate) ;
           console.log(a);
      }
      res.redirect('/') ;
}) ;

app.listen(3000, function () {
  console.log("site is running properly");
});
