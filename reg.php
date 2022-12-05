<?php
	//conexion con la base de datos y el servidor
	$mysqli =  new mysqli('localhost', 'root', '', 'data'); 
	$mysqli->set_charset("utf8");
	//obtenemos los valores del formulario
	$primernom = $_POST['primernom'];
    $segundonom = $_POST['segundonom'];
	$primerape = $_POST['primerape'];
	$segundoape = $_POST['segundoape'];
	$edad = $_POST['edad'];
	$ciudd = $_POST['ciudd'];

	//Obtiene la longitus de un string
	$req = (strlen($primernom)*strlen($segundonom)*strlen($primerape)*strlen($segundoape)*strlen($edad)*strlen($ciudd)) or die("No se han llenado todos los campos");


	//ingresamos la informacion a la base de datos
	$mysqli->query("INSERT INTO usuarios (`primernom`, `segundonom`, `primerape`, `segundoape`, `edad`, `ciudd`) VALUES('$primernom','$segundonom ','$segundoape','$edad'','$ciudd')");

	echo'
		<script>
			alert("Registro Exitoso");
			location.href="index.html";
		</script>
	'


?>