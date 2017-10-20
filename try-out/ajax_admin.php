<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

	require_once('application/lib/MysqliDb.php');
	$db = new MysqliDB;

	if ($_REQUEST['action'] == "paginator_question") {
		$page1 = $_POST['page'] * $_POST['count'];
		$count = $_POST['count'];
		$question = $db->query("SELECT id,question FROM question ORDER BY date DESC LIMIT $page1,$count",3);
		for ($i=0; $i < count($question); $i++) {
			$str = explode('<div',$question[$i]['question']);
			$str = explode('&nbsp;',$str[0]);
			$str[0] = strip_tags($str[0]);
			printf ("<li>%s <a href='/admin/content/del/%s'><i class='fa fa-power-off'></i></a><a href='/admin/content/upd/%s'><i class='fa fa-pencil'></i></a></li>",$str[0],$question[$i]['id'],$question[$i]['id']);
		}
	} elseif ($_REQUEST['action'] == "paginator_tag") {
		$page1 = $_POST['page'] * $_POST['count'];
		$count = $_POST['count'];
		$tag = $db->query("SELECT id,tag FROM tag ORDER BY id DESC LIMIT $page1,$count",3);
		for ($i=0; $i < count($tag); $i++) {
			$str = explode('<div',$tag[$i]['tag']);
			$str = explode('&nbsp;',$str[0]);
			$str[0] = strip_tags($str[0]);
			printf ("<li>%s <a href='/admin/tag/del/%s'><i class='fa fa-power-off'></i></a><a href='/admin/tag/upd/%s'><i class='fa fa-pencil'></i></a></li>",$str[0],$tag[$i]['id'],$tag[$i]['id']);
		}
	} elseif ($_REQUEST['action'] == "paginator_users") {
		$page1 = $_POST['page'] * $_POST['count'];
		$count = $_POST['count'];
		$users = $db->query("SELECT id,login,status FROM users ORDER BY id DESC LIMIT $page1,$count",3);
		for ($i=0; $i < count($users); $i++) {
			$str = explode('<div',$users[$i]['login']);
			$str = explode('&nbsp;',$str[0]);
			$str[0] = strip_tags($str[0]);
			if ($users[$i]['status'] > 2) {
				printf ("<li>%s<span><a href='/admin/users/del/%s'><i class='fa fa-power-off'></i></a><a href='/admin/users/upd/%s''><i class='fa fa-pencil'></i></a><p style='background: #A74982;'>статус: %s</p></span></li>",$str[0],$users[$i]['id'],$users[$i]['id'],$users[$i]['status']);
			} else {
				printf ("<li>%s<span><a href='/admin/users/del/%s'><i class='fa fa-power-off'></i></a><a href='/admin/users/upd/%s''><i class='fa fa-pencil'></i></a><p>статус: %s</p></span></li>",$users[$i]['login'],$users[$i]['id'],$users[$i]['id'],$users[$i]['status']);
			}
		}
	}

}