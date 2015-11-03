<?php

class Model_question extends Model
{
	public function rand_question() {
		$db = new MysqliDB;
		$result = $db->query("SELECT * FROM question ORDER BY RAND() LIMIT 0,1",1);
		$result['answer'] = unserialize($result['answer']);
		$tag = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$result[id]."'",3);
		$info = array();
		for ($i=0; $i<count($tag); $i++) {
			$info[] = $db->query("SELECT tag,link FROM tag WHERE id='".$tag[$i]['tag_id']."'",1);
		}
		$result['tag'] = $info;
		return $result;
	}

	public function get_data()
	{
		$data = array();
		$err  = array();
		$routes = explode('/', $_SERVER['REQUEST_URI']);

		if (empty($_SESSION['login']) or empty($_SESSION['id'])) {$data['user']['reg'] = '0';}
		else {
			$data['user']['reg'] = '1';
			$data['user']['login'] = $_SESSION['login'];
		}

		if (isset($routes[1]) && $routes[1] == "question") {
			if (isset($routes[2]) && $routes[2] == "rand") {
				$data['otvet']  = "rand";
				$data['question'] = $this->rand_question();
			} elseif (isset($routes[2]) && is_numeric($routes[2])) {
				$db = new MysqliDB;
				$data['question'] = $db->query("SELECT * FROM question WHERE id='".$routes[2]."'",1);
				if (count($data['question']['id']) == 1) {
					$tag = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$routes[2]."'",3);
					$info = array();
					for ($i=0; $i<count($tag); $i++) {
						$info[] = $db->query("SELECT tag,link FROM tag WHERE id='".$tag[$i]['tag_id']."'",1);
					}
					$data['question']['tag'] = $info;
					$data['question']['answer'] = unserialize($data['question']['answer']);
					$data['otvet']  = "rand";
					$data['fix']  = "link";
				} else {header( 'Location: /question/rand', true, 303 );}
			} elseif (isset($routes[2]) && $routes[2] == "option") {
				$data['otvet']  = "option";
				$db = new MysqliDB;
				$page = 5;    // Записей на страницу
				$data['tag'] = $db->query("SELECT tag,link FROM tag LIMIT 0,$page",3);
				$count = $db->query("SELECT COUNT(*) as id FROM tag",1);
				$data['count'] = $page;
				$data['page_count'] = ceil($count['id']/$page);
			} elseif (isset($routes[2]) && $routes[2] == "tag" && isset($routes[3])) {
				$data['otvet']  = "go";
				$db = new MysqliDB;
				$tag = explode('&', $routes[3]);
				$str;
				for ($i=0;$i<count($tag);$i++) {
					$tag_id = $db->query("SELECT id FROM tag WHERE link='".$tag[$i]."'",1);
					if ($i+1 !== count($tag)) $str = "'".$tag_id['id']."'".",".$str;
					else $str = $str."'".$tag_id['id']."'";
				}
				$question_id = $db->query("SELECT DISTINCT question_id FROM tag_id WHERE tag_id IN (".$str.")",3);
				for ($i=0;$i<count($question_id);$i++) {
					$question_arr[] = $question_id[$i]['question_id'];
				}
				$page = 1;    // Записей на страницу
				$data['count'] = $page;
				$data['page_count'] = ceil(count($question_arr)/$page);
				shuffle($question_arr);
				$question = $db->query("SELECT id,question,answer FROM question WHERE id='".$question_arr[0]."'",1);
				$question['answer'] = unserialize($question['answer']);
				$question_arr = implode(",", $question_arr);
				$data['question_arr'] = $question_arr;
				$data['question'] = $question;
			}
		}

		return $data;
	}

}