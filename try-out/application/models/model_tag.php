<?php

class Model_tag extends Model
{
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
		
		if (!empty($routes['2']) && isset($routes['2'])) {
			$db = new MysqliDB;
			$page = 5;    // Записей на страницу
			$tag_id = $db->query("SELECT id FROM tag WHERE link='".$routes['2']."'",1);
			$question_id = $db->query("SELECT question_id FROM tag_id WHERE tag_id='".$tag_id['id']."' ORDER BY question_id DESC LIMIT 0,$page",3);
			$count = $db->query("SELECT COUNT(*) as question_id FROM tag_id WHERE tag_id='".$tag_id['id']."'",1);
			$data['tag_id'] = $tag_id['id'];
			$data['count'] = $page;
			$data['page_count'] = ceil($count['question_id']/$page);
			for ($i=0; $i<count($question_id); $i++) {
				$string = $db->query("SELECT id,question FROM question WHERE id='".$question_id[$i]['question_id']."'",1);
				$str = explode('<div',$string['question']);
				$str = explode('&nbsp;',$str[0]);
				$string['question'] = strip_tags($str[0]);
				$data['question'][$i] = $string;
			}
			$data['otvet'] = "gut";
		} else {header("Refresh: 1; URL=/main");}

		return $data;
	}
}