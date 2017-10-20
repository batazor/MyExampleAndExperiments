<!DOCTYPE html>

<html lang="ru">

<head>
    <meta charset="utf-8"/>
    <title>{% block title %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" href="/css/normalize.css"/>
    <link rel="stylesheet/less" href="/css/flat.less" media= "screen and (min-width:1001px)"/>
    <link rel="stylesheet/less" href="/css/flat_m.less" media= "screen and (max-width: 1000px)"/>
	<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/monokai.min.css">
	<script src="//code.jquery.com/jquery.min.js"></script>
	<script src="/js/modernizr.custom.js"></script>
	<script src="/js/less.min.js"></script>
</head>

<body>

<div id="st-container">
	<div class="menu"></div>
	<div class="st-pusher">
		<div class="st-content">
			<div class="st-content-inner">
				{% include 'header.html' %}
				<div id="content">
				    {% block content %}
				    {% endblock %}
				</div>
				{% if info.user.reg == 1 %}
					<aside class="users">

						<div class="container">
							<div class="hover fa fa-user" style="background-color:#387A8A;"></div>
							<span class="content">
								<a href="/users/{{info.user.login}}">Мой профиль</a>
							</span>
						</div>

						<div class="container">
							<div class="hover fa fa-cog" style="background-color:#387A8A;"></div>
							<span class="content">
								<a href="/users/{{info.user.login}}/settings">Настройки</a>
							</span>
						</div>

						<div class="container">
							<div class="hover fa fa-comments-o" style="background-color:#387A8A;"></div>
							<span class="content">
								<a href="/users/{{info.user.login}}/live">Живая лента</a>
							</span>
						</div>

						<div class="container">
							<div class="hover fa fa-power-off" style="background-color:#387A8A;"></div>
							<span class="content">
								<a href="/users/{{info.user.login}}/off">Выход</a>
							</span>
						</div>
					</aside>
				{% endif %}
				<div id="footer"></div>
			</div>
		</div>
	</div>
	{% include 'menu.html' %}
</div>
<script src="/js/prefixfree.min.js"></script>
<script src="http://yandex.st/highlightjs/8.0/highlight.min.js"></script>
<script>
	function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    jQuery.fn.swap=function(b){b=jQuery(b)[0];var a=this[0],a2=a.cloneNode(true),b2=b.cloneNode(true),stack=this;a.parentNode.replaceChild(b2,a);b.parentNode.replaceChild(a2,b);stack[0]=a2;return this.pushStack(stack)};
	if (window.innerWidth < 1000) {
		$('.st-menu').swap('.menu');
		if($("#flat-form").length) {$('#flat-form').swap('#footer');}
		$('#flat-form form').hide();
		$(document).mouseup(function(e){var container=$("#flat-form form");if(container.has(e.target).length===0){container.hide()}});
		include("/js/mobile.js");
	} else {
		$("head").append($("<link rel='stylesheet' href='/css/jquery.mCustomScrollbar.css'/>"));
		$("head").append($("<link href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css' rel='stylesheet'/>"));
		include("/js/other.js");
		include("/js/jquery.mCustomScrollbar.concat.min.js");
		(function($){
			$(window).load(function(){
				$(".st-content").mCustomScrollbar({
					scrollButtons:{
						enable:true
					},
					advanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true,autoScrollOnFocus:false}
				});
				$(".st-menu").mCustomScrollbar({
					scrollButtons:{
						enable:true
					},
					advanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true}
				});
				/*demo fn*/
				$(".ajax").click(function(e){
					e.preventDefault();
					$("st-content").mCustomScrollbar("update");
				});
			});
		})(jQuery);
	}
	$(document).ready(function() {
		$('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});
	});
</script>
<script src="/js/basis.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47442705-1', 'try-out.tk');
  ga('send', 'pageview');

</script>
</body>
</html>