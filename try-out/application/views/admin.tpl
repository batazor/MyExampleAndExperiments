<!DOCTYPE html>

<html lang="ru">

<head>
	<meta charset="utf-8">
    <title>{% block title %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <link rel="stylesheet" href="/css/normalize.css">
	<link rel="stylesheet/less" href="/css/admin.less">
	<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
	<link rel="stylesheet" href="/css/jquery.mCustomScrollbar.css"/>
	<script src="/js/prefixfree.min.js"></script>
	<script src="/js/less.min.js"></script>
	<script src="//code.jquery.com/jquery.min.js"></script>
	<script src="/js/modernizr.custom.js"></script>
	<script src="/js/ckeditor/ckeditor.js"></script>
</head>

<body>

	<div id="box">
		<div id="content">
	    	{% block content %}
	    	{% endblock %}
		</div>
		<aside>
			{% if info.status > 1 %}
				<h1><a href="/admin">try-out.tk</a></h1>
				<nav>
					<ul>
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-home"></i></div><a href="/admin"><span>Главная</span></a></div></li>
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-sign-in"></i></div><a href="/main"><span>На сайт</span></a></div></li>
						{% if info.status > 2 %}
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-cogs"></i></div><a href="/admin"><span>Настройки</span></a></div></li>
						{% endif %}
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-question-circle"></i></div><a href="/admin/content"><span>Вопросы</span></a></div></li>
						{% if info.status > 2 %}
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-tags"></i></div><a href="/admin/tag"><span>Теги</span></a></div></li>
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-group"></i></div><a href="/admin/users"><span>Юзеры</span></a></div></li>
						<li><div class="link_bg"></div><div class="link_title"><div class="icon"><i class="fa fa-envelope"></i></div><a href="/admin/messages"><span>Сообщения</span></a></div></li>
						{% endif %}
					</ul>
				</nav>
			{% endif %}
		</aside>
	</div>

<script src="/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script>
	(function($){
		$(window).load(function(){
			$("body").mCustomScrollbar({
				scrollButtons:{
					enable:true
				},
				advanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true,autoScrollOnFocus:false}
			});
			/*demo fn*/
			$("#add").click(function(e){
				e.preventDefault();
				$("body").mCustomScrollbar("update");
			});
		});
	})(jQuery);
	if($("textarea").length) {CKEDITOR.replace('question');}
</script>
</body>
</html>