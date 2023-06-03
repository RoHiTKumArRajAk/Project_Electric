app.get('/', function(req, res){
      res.render('index') ;
}) ;
app.get('/FirstForm', function(req, res)
{
      res.render('form1') ;
}) ;
app.post('/', function(req, res){
      console.log('we are here');
      const {code, Name, Dept, PrevBal, Location, LastReading, MeterCharge, UnitRate, LastDate, Allocation, CurrentPayment, LastPaymentDate} = req.body ;
      console.log(code);
      res.render('index') ;
}) ;