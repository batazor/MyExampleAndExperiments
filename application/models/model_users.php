<?php

class Model_Users extends Model
{
	public function verification($p) {
		$p = stripslashes($p);
		$p = htmlspecialchars($p);
		$p = trim($p);
		return $p;
	}
	
	public function get_data()
	{
		$data = array();
		$db = new MysqliDB;

		if (empty($_SESSION['login']) or empty($_SESSION['id'])) {$data['user']['reg'] = '0';}
		else {
			$data['user']['reg'] = '1';
			$data['user']['login'] = $_SESSION['login'];
		}

		$routes = explode('/', $_SERVER['REQUEST_URI']);

		$user = $db->query("SELECT login FROM users WHERE id='".$_SESSION['id']."'",1);
		if ($user['login'] == $routes[2]) { // если это наша страница
			$data['page_status'] = "my";
			if (isset($routes[3]) && $routes[3] == "off") {
				$login = $_SESSION['login'];
				unset($_SESSION['login']);
				unset($_SESSION['id']);
				unset($_SESSION['status']);
				header( "Location: /users/$login", true, 303 );
			}
		} else { // если это чужая страница
			$data['page_status'] = "stranger";
		}

		return $data;
	}
}