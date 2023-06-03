<?php
	$Code = $_POST['code'];
	$Name = $_POST['name'];
	$Department = $_POST['dept'];
	$Prev_Balance = $_POST['pbal'];
	$Location = $_POST['loc'];
	$Last_Reading = $_POST['lread'];
    $Meter_Charges = $_POST['mch'];
	$Unit_Rate = $_POST['urate'];
	$Last_Date = $_POST['ldate'];
	$Allocate = $_POST['allo'];
	$Current_Month_Payment = $_POST['cpay'];
    $Last_Payment_Date = $_POST['lpaydate'];

	// Database connection
	$conn = new mysqli('localhost','root','','Electric');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into MasterTable(Code,Name,Department,Prev_Balance,Location,Last_Reading,Meter_Charges,Unit_Rate,Last_Date,Allocate,Current_Month_Payment,Last_Payment_Date) values(?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssdsdddssds", $Code , $Name ,$Department,$Prev_Balance,$Location,$Last_Reading,$Meter_Charges,$Unit_Rate,$Last_Date,$Allocate,$Current_Month_Payment,$Last_Payment_Date);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>