<?php

class Model_Admin extends Model
{
	public function verification($p) {
		$p = stripslashes($p);
		$p = htmlspecialchars($p);
		$p = trim($p);
		return $p;
	}

	public function rus2translit($text) {
	    // Русский алфавит
	    $rus_alphabet = array(
	        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
	        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
	        'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
	        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
	        'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
	        'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
	    );
	    
	    // Английская транслитерация
	    $rus_alphabet_translit = array(
	        'A', 'B', 'V', 'G', 'D', 'E', 'IO', 'ZH', 'Z', 'I', 'I',
	        'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F',
	        'H', 'C', 'CH', 'SH', 'SH', '`', 'Y', '`', 'E', 'IU', 'IA',
	        'a', 'b', 'v', 'g', 'd', 'e', 'io', 'zh', 'z', 'i', 'i',
	        'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f',
	        'h', 'c', 'ch', 'sh', 'sh', 'b', 'y', 'b', 'e', 'iu', 'ia'
	    );
	    
	    return str_replace($rus_alphabet, $rus_alphabet_translit, $text);
	}
	
	public function get_data()
	{
		$data = array();
		$err  = array();
		$routes = explode('/', $_SERVER['REQUEST_URI']);

		if (isset($_SESSION['login']) && $_SESSION['status'] > 1) {
			$data['otvet'] = "main";
			$data['status'] = $_SESSION['status'];
		} else {$data['otvet'] = "verification";}

		if (isset($routes[2]) && $routes[2] == "content" && isset($_SESSION['login']) && $_SESSION['status'] > 1) {
			$data['otvet']  = "content";
			if (isset($routes[3])) {
				if ($routes[3] == "add") {$data['action'] = "content_add";}
				elseif ($routes[3] == "upd") {
					if (isset($routes[4]) && is_numeric($routes[4])) {
						$data['action'] = "content_upd";
						$db = new MysqliDB;
						$data['content_list'] = $db->query("SELECT * FROM question WHERE id='".$routes[4]."'",1);
						$tag = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$routes[4]."'",3);
						for ($i=0; $i<count($tag); $i++) {$tag[$i] = $db->query("SELECT tag FROM tag WHERE id='".$tag[$i]['tag_id']."'",1);}
						for ($i=0; $i<count($tag); $i++) {$tag[$i] = $tag[$i]['tag'];}
						$data['tag'] = implode(",", $tag);
						$data['content_list']['answer'] = unserialize($data['content_list']['answer']);
						$data['content_list']['cout'] = count($data['content_list']['answer']['answer'])-1;
					}
				}
				elseif ($routes[3] == "del" && is_numeric($routes[4]) && $_SESSION['status'] > 2) {
					$db = new MysqliDB;
					// Это для тегов
					$tag = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$routes['4']."'",3);
					for ($i=0; $i<count($tag); $i++) {
						$db->query("UPDATE tag SET count=count-1 WHERE id = '".$tag[$i]['tag_id']."'");
						$count = $db->query("SELECT count FROM tag WHERE id='".$tag[$i]['tag_id']."'",1);
						if ($count['count'] < 1) { $db->query("DELETE FROM tag WHERE id='".$tag[$i]['tag_id']."'"); }
					}
					$db->query("DELETE FROM tag_id WHERE question_id='".$routes['4']."'");
					$result = $db->query("DELETE FROM question WHERE id='".$routes['4']."'");
					$data['otvet'] = "gut";
				} else {header( 'Location: /admin/content', true, 303 );}
			} else {
				$data['action'] = "content_list";
				$db = new MysqliDB;
				$page = 8;
				$count = $db->query("SELECT COUNT(*) as id FROM question",1);
				$data['count'] = $page;
				$data['page_count'] = ceil($count['id']/$page);
				$data['content_list'] = $db->query("SELECT id,question FROM question ORDER BY date DESC LIMIT 0,$page",3);
				for ($i=0; $i<count($data['content_list']); $i++) {
					$str = explode('<div',$data['content_list'][$i]['question']);
					$str = explode('&nbsp;',$str[0]);
					$data['content_list'][$i]['question'] = strip_tags($str[0]);
				}
			}
		} elseif (isset($routes[2]) && $routes[2] == "users" && isset($_SESSION['login']) && $_SESSION['status'] > 2) {
			$data['otvet']  = "users";
			if (isset($routes[3])) {
				if ($routes[3] == "add") {$data['action'] = "users_add";}
				elseif ($routes[3] == "upd") {
					if (isset($routes[4]) && is_numeric($routes[4])) {
						$data['action'] = "users_upd";
						$db = new MysqliDB;
						$data['users_list'] = $db->query("SELECT * FROM users WHERE id='".$routes[4]."'",1);
					}
				}
				elseif ($routes[3] == "del" && is_numeric($routes[4])) {
					$db = new MysqliDB;
					$db->query("DELETE FROM users WHERE id='".$routes['4']."'");
					$data['otvet'] = "gut";
				}
			} else {
				$data['action'] = "users_list";
				$db = new MysqliDB;
				$page = 8;
				$count = $db->query("SELECT COUNT(*) as id FROM users",1);
				$data['count'] = $page;
				$data['page_count'] = ceil($count['id']/$page);
				$data['users_list'] = $db->query("SELECT id,login,status FROM users ORDER BY id DESC LIMIT 0,$page",3);
			}
		} elseif (isset($routes[2]) && $routes[2] == "tag" && isset($_SESSION['login']) && $_SESSION['status'] > 1) {
			$data['otvet']  = "tag";
			if (isset($routes[3])) {
				if ($routes[3] == "add") {$data['action'] = "tag_add";}
				elseif ($routes[3] == "upd") {
					if (isset($routes[4]) && is_numeric($routes[4])) {
						$data['action'] = "tag_upd";
						$db = new MysqliDB;
						$data['tag'] = $db->query("SELECT * FROM tag WHERE id='".$routes[4]."'",1);
					} else {header( 'Location: /admin/tag', true, 303 );}
				}
				elseif ($routes[3] == "del" && is_numeric($routes[4])) {
					$db = new MysqliDB;
					$result = $db->query("DELETE FROM tag WHERE id='".$routes['4']."'");
					$result = $db->query("DELETE FROM tag_id WHERE tag_id='".$routes['4']."'");
					$data['otvet'] = "gut";
				} else {header( 'Location: /admin/tag', true, 303 );}
			} else {
				$data['action'] = "tag_list";
				$db = new MysqliDB;
				$page = 8;
				$count = $db->query("SELECT COUNT(*) as id FROM tag",1);
				$data['count'] = $page;
				$data['page_count'] = ceil($count['id']/$page);
				$data['tag_list'] = $db->query("SELECT id,tag FROM tag ORDER BY id DESC LIMIT 0,$page",3);
			}
		} elseif (isset($routes[2]) && $routes[2] == "messages" && isset($_SESSION['login']) && $_SESSION['status'] > 1) {
			$data['otvet']  = "messages";
		}

		if (isset($_POST['verification'])) {
			if (isset($_POST['login']))    { $login    = $_POST['login'];    if ($login    == '') { unset($login);} }
			if (isset($_POST['password'])) { $password = $_POST['password']; if ($password == '') { unset($password);} }

			if (empty($login) or empty($password)) {
				header( 'Location: /admin', true, 303 );
			} else {
				$db = new MysqliDB;
				$password = md5(md5($password));
				$verification = $db->query("SELECT * FROM users WHERE login='$login'",1);
				if ($verification['password'] == $password && $verification['status'] >= 2) {
					$_SESSION['id']     = $verification['id'];
					$_SESSION['login']  = $verification['login'];
					$_SESSION['status'] = $verification['status'];
					$data['status'] = $_SESSION['status'];
					header( 'Location: /admin', true, 303 );
				} else {header( 'Location: /admin', true, 303 );}
			}
		} elseif (isset($_POST['go'])) { // добавление вопроса

			if (isset($_POST['question'])) { $question = $_POST['question']; if ($question == '') { unset($question);} }
			if (isset($_POST['answer']))   { $answer   = $_POST['answer'];   if ($answer   == '') { unset($answer);} }
			if (isset($_POST['vibor']))    { $vibor    = $_POST['vibor'];    if ($vibor    == '') { unset($vibors);} }
			if (isset($_POST['tag']))      { $tag      = $_POST['tag'];      if ($tag      == '') { $tag = "no tag";} }
			

			if (empty($question) or empty($answer)) {
				$err[] = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
				$data['otvet'] = "err";
			} else {
				$db = new MysqliDB;
				// Это для чекбоксов
				$cout = count($_POST['answer']);
				$new_answer = array_values($answer);
				$key = array();
				$result = array();
				$key['answer'] = array_keys($answer);
				if (isset($vibor)) {
					$key['vibor'] = array_keys($vibor);
					$y=0;
					for($i=0;$i<$cout;$i++) {
						$result['answer'][] = $new_answer["$i"];
						if ($key['answer']["$i"] == $key['vibor']["$y"]) {
							$y++;
							$result['vibor'][] = "on";
						} else {
							$result['vibor'][] = "off";
						}
					}
				} else {
					for($i=0;$i<$cout;$i++) {
						$result['answer'][] = $new_answer["$i"];
						$result['vibor'][] = "off";
					}
				}
				$answer = serialize($result);
				$answer = addcslashes($answer,"\\");
				$query1 = $db->query("INSERT INTO question (question,answer,author,date) VALUES('$question','$answer','".$_SESSION['login']."',NOW())","id");
				// Это для тегов
				$tag = explode(",", $tag);
				$array_tag = array();
				for ($i=0; $i<count($tag); $i++) {
					$demo = $db->query("SELECT id FROM tag WHERE tag='".$tag[$i]."'",1);
					if (count($demo) == 0) {
						$link = $this->rus2translit($tag[$i]);
						$query = $db->query("INSERT INTO tag (tag,link,count) VALUES('".$tag[$i]."','$link','1')");
					} else {
						$db->query("UPDATE tag SET count=count+1 WHERE tag = '".$tag[$i]."'");
					}
					$array_tag[] = $db->query("SELECT id FROM tag WHERE tag='".$tag[$i]."'",1);
					$query = $db->query("INSERT INTO tag_id (tag_id,question_id) VALUES('".$array_tag[$i]['id']."','$query1')");
				}
				$data['otvet'] = "gut";
			}
		} elseif (isset($_POST['upd'])) { // обновление вопроса
			if (isset($_POST['question'])) { $question = $_POST['question']; if ($question == '') { unset($question);} }
			if (isset($_POST['answer']))   { $answer   = $_POST['answer'];   if ($answer   == '') { unset($answer);} }
			if (isset($_POST['vibor'])  or isset($_POST['id']))    { $vibor    = $_POST['vibor'];    if ($vibor    == '') { unset($vibors);} }
			if (isset($_POST['tag']))     { $tag     = $_POST['tag'];     if ($tag     == '') { unset($tag);} }

			if (empty($question) or empty($answer) or empty($_POST['v_id'])) {
				$err[] = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
				$data['otvet'] = "err";
			} else {
				$db = new MysqliDB;
				$cout = count($_POST['answer']);
				$new_answer = array_values($answer);
				$key = array();
				$result = array();
				$key['answer'] = array_keys($answer);
				if (isset($vibor)) {
					$key['vibor'] = array_keys($vibor);
					$y=0;
					for($i=0;$i<$cout;$i++) {
						$result['answer'][] = $new_answer["$i"];
						if ($key['answer']["$i"] == $key['vibor']["$y"]) {
							$y++;
							$result['vibor'][] = "on";
						} else {$result['vibor'][] = "off";}
					}
				} else {
					for($i=0;$i<$cout;$i++) {
						$result['answer'][] = $new_answer["$i"];
						$result['vibor'][] = "off";
					}
				}
				$result = serialize($result);
				$result = addcslashes($result,"\\");
				$db->query("UPDATE question SET question='$question', answer='$result', date=NOW() WHERE id = '".$_POST['v_id']."'");
				// Это для тегов
				$tag = explode(",", $tag);
				$tag_old = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$_POST['v_id']."'",3);
				for ($i=0; $i<count($tag_old); $i++) {
					$tag_old[$i] = $db->query("SELECT tag FROM tag WHERE id='".$tag_old[$i]['tag_id']."'",1);;
					$tag_old[$i] = $tag_old[$i]['tag'];
				}
				$tag_new = array_values(array_diff($tag,$tag_old));
				$tag_del = array_values(array_diff($tag_old,$tag));
				for ($i=0; $i<count($tag_new); $i++) {
					$tag_id = $db->query("SELECT id FROM tag WHERE tag='".$tag_new[$i]."'",1);
					if (count($tag_id)>0) {
						$db->query("UPDATE tag SET count=count+1 WHERE tag = '".$tag_new[$i]."'");
						$tag_id = $tag_id['id'];
					} else {
						$link = $this->rus2translit($tag_new[$i]);
						$tag_id = $db->query("INSERT INTO tag (tag,link,count) VALUES('".$tag_new[$i]."','$link','1')","id");
					}
					$db->query("INSERT INTO tag_id (tag_id,question_id) VALUES('".$tag_id."','".$_POST['v_id']."')");
				}
				for ($i=0; $i<count($tag_del); $i++) {
					$db->query("UPDATE tag SET count=count-1 WHERE tag = '".$tag_del[$i]."'");
					$tag = $db->query("SELECT id,count FROM tag WHERE tag='".$tag_del[$i]."'",1);
					if ($tag['count'] < 1) {
						$db->query("DELETE FROM tag WHERE id='".$tag['id']."'");
					}
					$db->query("DELETE FROM tag_id WHERE tag_id='".$tag['id']."' AND question_id='".$_POST['v_id']."'");
				}
				$data['otvet'] = "gut";
			}
		} elseif (isset($_POST['users_add'])) { // добавление юзера
			
			if (isset($_POST['login']))    { $login    = $_POST['login'];    if ($login    == '') { unset($login);} }
			if (isset($_POST['password'])) { $password = $_POST['password']; if ($password == '') { unset($password);} }
			if (isset($_POST['email']))    { $email    = $_POST['email'];    if ($email    == '') { unset($email);} }
			if (isset($_POST['status']))   { $status   = $_POST['status'];   if ($status   == '') { unset($status);} }

			if (empty($login) or empty($password) or empty($email) or empty($status)) {
				$err[] = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
				$data['otvet'] = "err";
			} else {
				$login    = $this->verification($login);
				$password = $this->verification($password);
				$email    = $this->verification($email);
				$status   = $this->verification($status);
				$password = md5(md5($password));
				$db = new MysqliDB;
				$query = $db->query("INSERT INTO users (login,password,email,a_date,b_date,ip,status) VALUES('$login','$password','$email',NOW(),NOW(),'".$_SERVER['REMOTE_ADDR']."','$status')");
				$data['otvet'] = "gut";
			}
		} elseif (isset($_POST['users_upd'])) { // обновление юзера
			if (isset($_POST['login']))    { $login    = $_POST['login'];    if ($login    == '') { unset($login);} }
			if (isset($_POST['password'])) { $password = $_POST['password']; if ($password == '') { unset($password);} }
			if (isset($_POST['email']))    { $email    = $_POST['email'];    if ($email    == '') { unset($email);} }
			if (isset($_POST['status']))   { $status   = $_POST['status'];   if ($status   == '') { unset($status);} }

			if (empty($login) or empty($password) or empty($email) or empty($status)) {
				header( 'Location: /admin/users', true, 303 );
			} else {
				$login    = $this->verification($login);
				$password = $this->verification($password);
				$email    = $this->verification($email);
				$status   = $this->verification($status);
				$password = md5(md5($password));
				$db = new MysqliDB;
				$db->query("UPDATE users SET login='$login', password='$password', email='$email', status='$status' WHERE id = '".$_POST['u_id']."'");
				$data['otvet'] = "gut";
			}
		} elseif (isset($_POST['tag_add'])) { // добавление тега
			if (isset($_POST['tag']))  { $tag  = $_POST['tag'];  if ($tag  == '') {unset($tag);}}
			if (isset($_POST['link'])) { $link = $_POST['link']; if ($link == '') {unset($link);}}
			$db = new MysqliDB;
			if (empty($tag) or empty($link)) {
				$err[] = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
				$data['otvet'] = "err";
			} else {
				$demo = $db->query("SELECT id FROM tag WHERE tag='$tag'",1);
				if (count($demo)>0) {$err[] = "Извените, такой тег уже есть.";}
				$link = $this->rus2translit($link);
				$demo = $db->query("SELECT id FROM tag WHERE link='$link'",1);
				if (count($demo)>0) {$err[] = "Извените, такой link уже есть.";}
				if (count($err)==0) {
					$tag    = $this->verification($tag);
					$link = $this->verification($link);
					$query = $db->query("INSERT INTO tag (tag,link) VALUES('$tag','$link')");
					$data['otvet'] = "gut";
				} else { $data['otvet'] = "err"; }
			}
		} elseif (isset($_POST['tag_upd'])) { // обновление тега
			if (isset($_POST['tag']))  { $tag  = $_POST['tag'];  if ($tag  == '') {unset($tag);}}
			if (isset($_POST['link'])) { $link = $_POST['link']; if ($link == '') {unset($link);}}
			if (isset($_POST['id']))   { $id   = $_POST['id'];   if ($id   == '') {unset($id);}}
			$db = new MysqliDB;
			if (empty($tag) or empty($link) or empty($id)) {
				$err[] = "Вы ввели не всю информацию, вернитесь назад и заполните все поля!";
				$data['otvet'] = "err";
			} else {
				$demo = $db->query("SELECT tag,link FROM tag WHERE id='$id'",1);
				if ($demo['tag'] !== $tag) {
					$demo1 = $db->query("SELECT id FROM tag WHERE tag='$tag'",1);
					if (count($demo1)>0) {$err[] = "Извените, такой тег уже есть.";}
				}
				$link = $this->rus2translit($link);
				if ($demo['link'] !== $link) {
					$demo1 = $db->query("SELECT id FROM tag WHERE link='$link'",1);
					if (count($demo1)>0) {$err[] = "Извените, такой link уже есть.";}
				}
				if (count($err)==0) {
					$demo = $db->query("SELECT id FROM tag WHERE tag='$tag'",3);
					$db->query("UPDATE tag SET tag='$tag', link='$link' WHERE id = '".$_POST['id']."'");
					$data['otvet'] = "gut";
				} else { $data['otvet'] = "err"; }
			}
		}

		if ($data['otvet'] == "gut") {header("Refresh: 10; URL=/admin");}

		$data['status'] = $_SESSION['status'];
		$data['err'] = $err;
		return $data;
	}
}