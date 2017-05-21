
<?php

//zachary


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
   
    $sql="SHOW TABLES";

   $result = mysqli_query($mysqli,$sql);

   while ($row=mysqli_fetch_array($result)) {

      $out = array_values($row);
      echo("<option value=\"");
      print($out[0]);

      echo("\">");
      print($out[0]);
      echo("</option>");
      echo("\n");
   }

   $result->close();
  $mysqli->close();

?>

