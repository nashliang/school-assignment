
<?php

//zachary
  $target = $_POST["target"];

  header('Content-Type: text/html; charset=UTF-8');

   $servername = "140.138.6.105";
   $username = "root";
   $password = "s25873006";
   $databasename = "stock";
   $port = "3306";
   $sock = "/var/run/mysqld/mysqld.sock";

   $mysqli = new mysqli($servername, $username, $password, $databasename) ;

      if($mysqli->connect_error) 
        die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());


   mysqli_query($mysqli,'SET NAMES utf8');
   $sql="SELECT * FROM `$target`";


   $result = mysqli_query($mysqli,$sql);

   //printf("Select returned %d rows.\n", $result->num_rows);
   //echo '<br/>';
    echo("[");
    $size=mysqli_num_rows($result);
    $index=0;
   while ($row=mysqli_fetch_array($result)) {

    if($index==$size-1)
      break;
//$out = array_values($row);
       //print_r($out);

    //$row_parse = array(1, 2, 3, 4, 5);
    //$row_parse = array("產業別"=>$row["產業別"], "成交金額"=>$row["成交金額"], "比重"=>$row["比重"]);

    $row_parse = array("產業別"=>$row["產業別"], "成交金額"=> intval($row["成交金額"])/100000000 );
//print_r($row_parse);

echo json_encode($row_parse ,JSON_UNESCAPED_UNICODE);

ob_start();


    echo(",");
    $index++;
   }
   ob_end_clean();
    echo("]");

   $result->close();
  $mysqli->close();

?>

