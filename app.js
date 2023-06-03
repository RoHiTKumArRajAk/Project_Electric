const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Master = require("./modals/master");
const Transaction = require("./modals/transaction");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/electric");

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/FirstForm", function (req, res) {
  res.render("form1");
});
app.get("/SecondForm", function (req, res) {
  res.render("form2");
});

//post
app.post("/FirstForm", async function (req, res) {
//   console.log("we are here");
  try {
    const {
      Code,
      Name,
      Dept,
      PrevBal,
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
      PrevBal,
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
    console.log(saveMaster);
    res.render("index");
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
            console.log(saveTransaction);
            res.render('index') ;

      }catch(error){
            console.error(error.message);
      }
}) ;

app.listen(3000, function () {
  console.log("site is running properly");
});
