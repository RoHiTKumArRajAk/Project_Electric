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
  console.log(masterdocs);
  console.log(transactiondocs);
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
      // const findCode = await Master.find({}) ;
      const updatedVals = [] ;
      
      for(let i=0;i<masterdocs.length;++i)
      {
            let el = masterdocs[i] ;
            const code = el.Code;
            // console.log(code);
            const transactioncode = await Transaction.find({Code:code}) ;
            const updatedVal = {} ;
            updatedVal.Code = code ;
            updatedVal.date = transactioncode[0].ToDate;
            updatedVal.PrevBalance = el.PrevBalance ;
            updatedVal.CurrentCharges = (transactioncode[0].CurrentReading - el.LastReading) * el.UnitRate + el.MeterCharge ;
            updatedVal.TotalDue = updatedVal.PrevBalance+updatedVal.CurrentCharges ;
            console.log(transactioncode);
            console.log(transactioncode[0].Code);
            console.log(el.LastReading);
            console.log(el.UnitRate);
            console.log(el.MeterCharge);

            updatedVals.push(updatedVal) ;
      }
      // console.log('funck');
      console.log(updatedVals);
      res.render('showpage', {values:updatedVals}) ;
}) ;

//post
app.post("/FirstForm", async function (req, res) {
//   console.log("we are here");
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
      CurrentPayment,
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
      CurrentPayment,
      LastPaymentDate,
    });
    const saveMaster = await newFile.save();
//     console.log(saveMaster);
    res.redirect("/");
  } catch (error) {
      console.error(error.message);
  }
});

app.post('/SecondForm', async function(req, res){
      try{
            const {Code, ToDate, CurrentReading} = req.body ;
            const NewTransaction = new Transaction({
                  Code,
                  ToDate,
                  CurrentReading,
            }) ;
            const saveTransaction = await NewTransaction.save() ;
            // console.log(saveTransaction);
            res.redirect('/') ;
            

      }catch(error){
            console.error(error.message);
      }
}) ;

app.listen(3000, function () {
  console.log("site is running properly");
});
