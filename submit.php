<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: #f4f4f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #464058;

        }
        div{
            
            align-items: center;

            background-color: #fff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            text-align: center;
            font-size: 18px;

           
        }



    </style>
</head>
<body>
    <div>
    <?php

//database connection
$serverfname = "localhost";
$userfname = "root";
$password = "rootdb";
$dbfname = "resumeDB";

//Create Connection
$conn = new mysqli($serverfname,$userfname,$password,$dbfname);

//Check Connection
if($conn -> connect_error){
    die("Connection failded: ".$conn->connect_error);
}

//Get form data
$fname = $_POST['fname'];
$lname = $_POST['mail'];
$email = $_POST['email'];
$msg = $_POST['msg'];

// echo "<h3> $fname <br> $lname <br> $email <br> $msg";

#prepare and bind
$stmt = $conn->prepare("INSERT INTO resumeMsgs (fname,lname,email,msg) VALUES (?,?,?,?)");
$stmt->bind_param("ssss",$fname,$lname,$email,$msg);

if($stmt->execute()){
    echo "Thank you ".$fname." for your Feedback. Have a nice day!";
}
else{
    echo "Error: ".$stmt->error;
}

//CLOSE CONNECTION
$stmt->close();
$conn->close();

?>
    </div>


</body>
</html>