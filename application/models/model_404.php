<?php

class Model_404 extends Model
{
	
	public function get_data()
	{
		$data = array();

		if (empty($_SESSION['login']) or empty($_SESSION['id'])) {$data['user']['reg'] = '0';}
		else {
			$data['user']['reg'] = '1';
			$data['user']['login'] = $_SESSION['login'];
		}

		return $data;
	}

}