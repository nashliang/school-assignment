<?php

$query = "SELECT * FROM `hw5`";

if ( !( $database = mysql_connect( "localhost", "hw5", "hw5" )  ) )
    die( "Could not connect to database </body></html>" );
if ( !mysql_select_db( "hw5", $database ) )
    die( "Could not open products database </body></html>" );
if ( !( $result = mysql_query( $query, $database ) ) )
{
    print( "<p>Could not execute query!</p>" );
    die( mysql_error() . "</body></html>" );
}
mysql_close( $database );

while ($obj = mysql_fetch_object($result)) {
	$arr[] = $obj;
}
echo json_encode($arr);
//給getjson吃
?>