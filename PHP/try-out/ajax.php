<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

	session_start();

	function verification($p) {
		$p = stripslashes($p);
		$p = htmlspecialchars($p);
		$p = trim($p);
		return $p;
	}

	require_once('application/lib/MysqliDb.php');
	$db = new MysqliDB;

	if($_REQUEST['action'] == "question_verify") {

		$verify = $db->query("SELECT answer FROM question WHERE id='".$_POST['id']."'",1);
		$verify['answer'] = unserialize($verify['answer']);
		$count1 = count($verify['answer']['vibor']);	
		
		$err=0;
		$arr = array();
		$count2 = count($_POST['checkbox']);
		for ($i=0;$i<$count2;$i++) {
			$arr[$_POST['checkbox'][$i]['name']] = "on";
		}
		for ($i=0;$i<$count1;$i++) {
			if (!isset($arr[$i])) {
				$arr[$i] = "off";
			}
		}
		for ($i=0;$i<$count1;$i++) {
			if ($arr[$i] !== $verify['answer']['vibor'][$i]) {$err++;}
		}

		if ($err==0) {
			echo "<p class='true'>Вы ответили верно, Поздравляю!</p>";
		} else {
			echo "<p>К сожалению вы допустили ошибку.</p>";
		}
		echo "<script>windowSize();</script>";
	} elseif ($_REQUEST['action'] == "question_verify_all") {
		$try = 0;
		if ($_POST['question_verify'] !== "") {
			$question_verify_all = explode("|", $_POST['question_verify']);
			$num = count($question_verify_all);
			for ($i=0; $i<$num; $i++) {
				$array = explode(".", $question_verify_all[$i]);
				$id[] = $array[0];
				$otvet[$array[0]][$array[1]] = "on";
			}
			$id = array_unique($id);
			$verify_id = implode(",",$id);
			$verify = $db->query("SELECT id,answer FROM question WHERE id IN ($verify_id)",3);
			
			for ($i=0; $i<count($verify); $i++) {
				$verify[$i]['answer'] = unserialize($verify[$i]['answer']);
				$_id = $verify[$i]['id'];
				$_count = count($verify[$i]['answer']['vibor']);
				for ($j=0; $j<$_count; $j++) {
					if ($verify[$i]['answer']['vibor'][$j] == "on") {
						$_otvet[$_id][$j] = $verify[$i]['answer']['vibor'][$j];
					}
				}
			}

			ksort($otvet);

			$key = array_keys($otvet);
			$_key = array_keys($_otvet);

			for ($i=0; $i<count($key); $i++) {
				if ($otvet[$key[$i]] == $_otvet[$_key[$i]]) {$try++;}
			}
		}

		echo "<div id='question'>
				<article>
					<a href='".$_SERVER['HTTP_REFERER']."' class='button red rand'>Повторить</a>
					<p><span class='span'>Результаты</span></p>
					<p>Вы ответили верно на $try вопрос/а/ов из - ".(int)$_POST['num']." предложенных</p>
				</article>
			  </div>";
	} elseif ($_REQUEST['action'] == "question_update") {

		if (isset($_POST['page']) && is_numeric($_POST['page'])) {
			$arr = explode(",", $_POST['arr']);
			$question = $db->query("SELECT id,question,answer FROM question WHERE id='".$arr[$_POST['page']]."'",1);
			$question['answer'] = unserialize($question['answer']);

			$t = explode(',', $_POST['otvet']);

			printf ("
					<p><span class='span'>Вопрос</span></p>
					<div class='text'>%s</div>
					<p><span class='span'>Варианты ответа</span></p>
					<ul id='variant'>
				",$question['question']);
			$n = count($question['answer']['answer'])-1;
			for ($i=0;$i<=$n;$i++) {
				if (in_array($question['id'].".".$i,$t)) {
					printf ("<li><input id='cb%s' type='checkbox' name='%s'  data-otvet=".$question['id']." checked>
						<label for='cb%s'>%s</label><svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16\" style=\"stroke-dasharray: 126.36976623535156px, 126.36976623535156px; stroke-dashoffset: 0px; -webkit-transition: stroke-dashoffset 0.2s ease-in-out 0s; transition: stroke-dashoffset 0.2s ease-in-out 0s;\"></path></svg>
						</li>",$i,$i,$i,$question['answer']['answer']["$i"]);
				} else {
					printf ("<li><input id='cb%s' type='checkbox' name='%s'  data-otvet=".$question['id'].">
						<label for='cb%s'>%s</label>
						</li>",$i,$i,$i,$question['answer']['answer']["$i"]);
				}
			}
			echo "</ul><input type='hidden' name='id' id='id' value='".$question['id']."'><script>windowSize();ggg();$('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});$('.code').mCustomScrollbar({horizontalScroll:true});</script>";
		} else {
			$array_id = $db->query("SELECT id FROM question",3);
			$rand_id = array_rand($array_id, 1);
			$result = $db->query("SELECT * FROM question WHERE id='".$array_id[$rand_id][id]."'",1);
			$tag = $db->query("SELECT tag_id FROM tag_id WHERE question_id='".$array_id[$rand_id][id]."'",3);
			$result['answer'] = unserialize($result['answer']);
			$date = new DateTime($result['date']);

			printf ("<a class='button red ajax rand'>Проверить</a>
					<p><span class='span'>Вопрос</span></p>
					<div class='text'>%s</div>
					<p><span class='span'>Варианты ответа</span></p>
					<ul id='variant'>
				",$result['question']);
			$n = count($result['answer']['answer'])-1;
			for ($i=0;$i<=$n;$i++) {
				printf ("<li><input id='cb%s' type='checkbox' name='%s'>
					<label for='cb%s'>%s</label>
					</li>",$i,$i,$i,$result['answer']['answer']["$i"]);
			}
			printf ("</ul><div class='otvet'></div>
				<input type='hidden' name='id' id='id' value='%s'>
				<footer>
					<ul><li><p>Теги: ",$result['id']);
			$info = array();
			for ($i=0; $i<count($tag); $i++) {
				$info[] = $db->query("SELECT tag,link FROM tag WHERE id='".$tag[$i]['tag_id']."'",1);
			}
			for ($i=0;$i<=count($tag)-1;$i++) {
				printf ("<span class='span'><a href='/tag/%s'>%s</a></span>",$info[$i]['link'],$info[$i]['tag']);
			}
			printf ("</p></li><li><p>Автор: %s</p></li><li><p>Дата публикации: %s</p></li></ul>
				</footer><script>ggg();</script>
				",$result['author'],$date->format("d/m/Y"));
			echo "<script>windowSize();$('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});$('.code').mCustomScrollbar({horizontalScroll:true});</script>";
		}
	} elseif ($_REQUEST['action'] == "paginator_tag") {
		$page1 = $_POST['page'] * $_POST['count'];
		$count = $_POST['count'];
		$question_id = $db->query("SELECT question_id FROM tag_id WHERE tag_id='".$_POST['tag_id']."' ORDER BY question_id DESC LIMIT $page1,$count",3);
		for ($i=0; $i<count($question_id); $i++) {
			$question_id[$i] = $db->query("SELECT id,question FROM question WHERE id='".$question_id[$i]['question_id']."'",1);
		}
		for ($i=0; $i < count($question_id); $i++) {
			printf ("<article class='list'><p><a href='/question/%s'>%s</a></p></article>",$question_id[$i]['id'],$question_id[$i]['question']);
		}
		echo "<script>windowSize();</script>";
	} elseif ($_REQUEST['action'] == "paginator_tag_option") {
		$page1 = $_POST['page'] * $_POST['count'];
		$count = $_POST['count'];
		$tag = $db->query("SELECT tag,link FROM tag LIMIT $page1,$count",3);
		$t = explode(',', $_POST['tag']);
		for ($i=0; $i < count($tag); $i++) {
			if (in_array($tag[$i]['link'],$t)) {
				printf ("<li><input id='cb".$i."' type='checkbox' name='%s' checked><label for='cb".$i."'>%s</label><svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16\" style=\"stroke-dasharray: 126.36976623535156px, 126.36976623535156px; stroke-dashoffset: 0px; -webkit-transition: stroke-dashoffset 0.2s ease-in-out 0s; transition: stroke-dashoffset 0.2s ease-in-out 0s;\"></path></svg></li>",$tag[$i]['link'],$tag[$i]['tag']);
			} else {
				printf ("<li><input id='cb".$i."' type='checkbox' name='%s'><label for='cb".$i."'>%s</label></li>",$tag[$i]['link'],$tag[$i]['tag']);
			}
		}
		echo "<script>windowSize();ggg();</script>";
	} elseif ($_REQUEST['action'] == "user_open") {
		$ban = $db->query("DELETE FROM ban_list WHERE UNIX_TIMESTAMP() - UNIX_TIMESTAMP(date) > 900");
		$ban = $db->query("SELECT count FROM ban_list WHERE ip='".$_SERVER['REMOTE_ADDR']."'",1);
		if ($ban['count'] > 2) {
			$err[] = "Вы набрали логин или пароль неверно 3 или более раз. Подождите 15 минут до следующей попытки.";
		} else {
			if (isset($_POST['login'])) { $login = $_POST['login']; if ($login == '') { unset($login);} }
			if (isset($_POST['pass']))  { $pass  = $_POST['pass'];  if ($pass  == '') { unset($pass);} }
			$login = verification($login);
			$pass = verification($pass);
			if (empty($login) or empty($pass)) {
				$err[] = "Нам нехватает данных";
			} else {
				$pass = md5(md5($pass));
				$result = $db->query("SELECT id FROM users WHERE login='$login' AND password='$pass'",1);
				if (count($result['id']) > 0) {
					$_SESSION['id']     = $result['id'];
					$_SESSION['login']  = $login;
				} else {
					$err[] = "Такой пользователь не зарегистрирован или пароль не верен";
					$ban = $db->query("SELECT ip FROM ban_list WHERE ip='".$_SERVER['REMOTE_ADDR']."'",1);
					if (count($ban['ip']) > 0) {
						$ban = $db->query("UPDATE ban_list SET count=count+1,date=NOW() WHERE ip='".$_SERVER['REMOTE_ADDR']."'");
					} else {
						$ban = $db->query("INSERT INTO ban_list (ip,date) VALUES    ('".$_SERVER['REMOTE_ADDR']."',NOW())");
					}
				}
			}
		}
		if (count($err) > 0) {
			echo "<div class='err'><p>Возникли следующие ошибки:</p>";
			foreach ($err as $key => $value) {
				echo "<p>$value</p>";
			}
			echo "</div>";
		} else {
			echo "<script>$('#flat-form').hide('200'); $('#menu_list').append('<li><a href=\"/users/$login\"><i class=\"fa fa-user\"></i>Профиль</a></li>');</script>";
			echo "<script>$('.st-content-inner').append('<aside class=\"users\"><div class=\"container\"><div class=\"hover fa fa-user\" style=\"background-color:#387A8A;\"></div><span class=\"content\"><a href=\"/users/$login\">Мой профиль</a></span></div><div class=\"container\"><div class=\"hover fa fa-cog\" style=\"background-color:#387A8A;\"></div><span class=\"content\"><a href=\"/users/$login/settings\">Настройки</a></span></div><div class=\"container\"><div class=\"hover fa fa-comments-o\" style=\"background-color:#387A8A;\"></div><span class=\"content\"><a href=\"/users/$login/live\">Живая лента</a></span></div><div class=\"container\"><div class=\"hover fa fa-power-off\" style=\"background-color:#387A8A;\"></div><span class=\"content\"><a href=\"/users/$login/off\">Выход</a></span></div></aside>');</script>";
		}
	} elseif ($_REQUEST['action'] == "user_reg") {
		if (isset($_POST['login'])) { $login = $_POST['login']; if ($login == '') { unset($login);} }
		if (isset($_POST['pass']))  { $pass  = $_POST['pass'];  if ($pass  == '') { unset($pass);} }
		if (isset($_POST['email'])) { $email = $_POST['email']; if ($email == '') { unset($email);} }
		$login = verification($login);
		$pass  = verification($pass);
		$email = verification($email);
		if (empty($login) or empty($pass) or empty($email)) {
			$err[] = "Нам нехватает данных";
		} else {
			$result = $db->query("SELECT id FROM users WHERE login='$login'",1);
			if (count($result['id']) > 0) {$err[] = "Такой пользователь уже зарегистрирован";}
			else {
				$pass = md5(md5($pass));
				$id = $db->query("INSERT INTO users (login,password,email,a_date,ip) VALUES('$login','$pass','$email',NOW(),'".$_SERVER['REMOTE_ADDR']."')","id");
				$_SESSION['id']     = $id;
				$_SESSION['login']  = $login;
			}
		}
		if (count($err) > 0) {
			echo "<div class='err'><p>Возникли следующие ошибки:</p>";
			foreach ($err as $key => $value) {
				echo "<p>$value</p>";
			}
			echo "</div>";
		} else {
			echo "<script>$('#flat-form').hide('200'); $('#menu_list').append('<li><a href=\"/users/$login\"><i class=\"fa fa-user\"></i>Профиль</a></li>');</script>";
		}
	} elseif ($_REQUEST['action'] == "user_restore") {
		if (isset($_POST['email'])) { $email = $_POST['email']; if ($email == '') { unset($email);} }
		$email = verification($email);
		if (empty($email)) {
			$err[] = "Нам нехватает данных";
		} else {

		}
		if (count($err) > 0) {
			echo "<div class='err'><p>Возникли следующие ошибки:</p>";
			foreach ($err as $key => $value) {
				echo "<p>$value</p>";
			}
			echo "</div>";
		}
	}
} else {header( 'Location: /main', true, 303 );}