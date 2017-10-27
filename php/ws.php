<?php

include("query.php");

header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");

if(!isset($_POST['method']) || $_POST['method'] == "")
	echo "Error: parameter missing";

return call_user_func($_POST['method'], $_POST['param']);

/*******************************************************************
 * NEWS
 *******************************************************************/

function GetListNews($param) {
	$paramArray = explode("&", $param);
	
	$query = new Query();
	echo $query->GetListNews();
}

?>