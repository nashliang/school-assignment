<?php

require_once('tcpdf/tcpdf_import.php');

/*---------------- Sent Mail Start -----------------*/
$name = $_POST['name'];
$email = $_POST['email'];
mail($email,"check",$name); 

/*---------------- Sent Mail End -------------------*/

/*---------------- Print PDF Start -----------------*/
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetFont('cid0jp','', 18); 
$pdf->AddPage();


$id_card = $_POST['id_card'];
$phone = $_POST['phone'];

$age = $_POST['age'];
$ways = $_POST['ways'];
$html = <<<EOF
<table border="1">
<tr>
	<td>姓名: </td><td>$name</td>
</tr>
<tr>
	<td>身分證字號: </td><td>$id_card</td>
</tr>
<tr>	
	<td>手機: </td><td>$phone</td>
</tr>
<tr>	
	<td>email: </td><td>$email</td>
</tr>
</table>
EOF;
/*---------------- Print PDF End -------------------*/

$pdf->writeHTML($html);
$pdf->lastPage();
$pdf->Output('order.pdf', 'I');
