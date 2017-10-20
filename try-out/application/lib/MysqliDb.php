<?php
	
class MysqliDB {

	// Основные параметры необходимые для соединения с базой данных. Переменные: хост, имя пользователя, пароль, имя папки в бд
	private $host = "mysql.hostinger.ru";
	private $username = "u117267970_try";
	private $password = "Ab1234Ec";
	private $db = "u117267970_try";

	public $mysqlidb;

	public function __construct()
    {
        $this->mysqlidb = new mysqli($this->host, $this->username, $this->password, $this->db)
            or die('Возникла проблема подключения к базе данных');
        $this->mysqlidb->set_charset('utf8');
    }

	// любой запрос
	public function query($query,$option = null) {
		$query = $this->mysqlidb->query($query);
		if ( $option == 1 ) { // выводим результирующую строку как массив
			$query = $query->fetch_assoc();
			return $query;
		} elseif ( $option == 2 ) { // требует библиотеку которой нет на хостинге
			$query = $query->fetch_all();
			return $query;
		} elseif ( $option == 3 ) {
			$arr = array();
			while ($row = $query->fetch_assoc()) { // альтернатива второму методу
				$arr[] = $row;
			}
			return $arr;
		} elseif( $option == "id" ) {
			return $this->mysqlidb->insert_id;
		} else { return 1; }
	}

	public function __destruct()
    {
    }
}

?>