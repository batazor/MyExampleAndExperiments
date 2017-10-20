<?php

/* template.tpl */
class __TwigTemplate_cd3f3d63f5f63e4997659f1a7ef52474641f4b4b6c64810afff0bb22812fb94b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>

<html lang=\"ru\">

<head>
    <meta charset=\"utf-8\"/>
    <title>";
        // line 7
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\"/>
    <link rel=\"stylesheet\" href=\"/css/normalize.css\"/>
    <link rel=\"stylesheet/less\" href=\"/css/flat.less\" media= \"screen and (min-width:1001px)\"/>
    <link rel=\"stylesheet/less\" href=\"/css/flat_m.less\" media= \"screen and (max-width: 1000px)\"/>
\t<link rel=\"stylesheet\" href=\"http://yandex.st/highlightjs/8.0/styles/monokai.min.css\">
\t<script src=\"//code.jquery.com/jquery.min.js\"></script>
\t<script src=\"/js/modernizr.custom.js\"></script>
\t<script src=\"/js/less.min.js\"></script>
</head>

<body>

<div id=\"st-container\">
\t<div class=\"menu\"></div>
\t<div class=\"st-pusher\">
\t\t<div class=\"st-content\">
\t\t\t<div class=\"st-content-inner\">
\t\t\t\t";
        // line 25
        $this->env->loadTemplate("header.html")->display($context);
        // line 26
        echo "\t\t\t\t<div id=\"content\">
\t\t\t\t    ";
        // line 27
        $this->displayBlock('content', $context, $blocks);
        // line 29
        echo "\t\t\t\t</div>
\t\t\t\t";
        // line 30
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($this->getAttribute($_info_, "user"), "reg") == 1)) {
            // line 31
            echo "\t\t\t\t\t<aside class=\"users\">

\t\t\t\t\t\t<div class=\"container\">
\t\t\t\t\t\t\t<div class=\"hover fa fa-user\" style=\"background-color:#387A8A;\"></div>
\t\t\t\t\t\t\t<span class=\"content\">
\t\t\t\t\t\t\t\t<a href=\"/users/";
            // line 36
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "user"), "login"), "html", null, true);
            echo "\">Мой профиль</a>
\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"container\">
\t\t\t\t\t\t\t<div class=\"hover fa fa-cog\" style=\"background-color:#387A8A;\"></div>
\t\t\t\t\t\t\t<span class=\"content\">
\t\t\t\t\t\t\t\t<a href=\"/users/";
            // line 43
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "user"), "login"), "html", null, true);
            echo "/settings\">Настройки</a>
\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"container\">
\t\t\t\t\t\t\t<div class=\"hover fa fa-comments-o\" style=\"background-color:#387A8A;\"></div>
\t\t\t\t\t\t\t<span class=\"content\">
\t\t\t\t\t\t\t\t<a href=\"/users/";
            // line 50
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "user"), "login"), "html", null, true);
            echo "/live\">Живая лента</a>
\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"container\">
\t\t\t\t\t\t\t<div class=\"hover fa fa-power-off\" style=\"background-color:#387A8A;\"></div>
\t\t\t\t\t\t\t<span class=\"content\">
\t\t\t\t\t\t\t\t<a href=\"/users/";
            // line 57
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "user"), "login"), "html", null, true);
            echo "/off\">Выход</a>
\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t</div>
\t\t\t\t\t</aside>
\t\t\t\t";
        }
        // line 62
        echo "\t\t\t\t<div id=\"footer\"></div>
\t\t\t</div>
\t\t</div>
\t</div>
\t";
        // line 66
        $this->env->loadTemplate("menu.html")->display($context);
        // line 67
        echo "</div>
<script src=\"/js/prefixfree.min.js\"></script>
<script src=\"http://yandex.st/highlightjs/8.0/highlight.min.js\"></script>
<script>
\tfunction include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    jQuery.fn.swap=function(b){b=jQuery(b)[0];var a=this[0],a2=a.cloneNode(true),b2=b.cloneNode(true),stack=this;a.parentNode.replaceChild(b2,a);b.parentNode.replaceChild(a2,b);stack[0]=a2;return this.pushStack(stack)};
\tif (window.innerWidth < 1000) {
\t\t\$('.st-menu').swap('.menu');
\t\tif(\$(\"#flat-form\").length) {\$('#flat-form').swap('#footer');}
\t\t\$('#flat-form form').hide();
\t\t\$(document).mouseup(function(e){var container=\$(\"#flat-form form\");if(container.has(e.target).length===0){container.hide()}});
\t\tinclude(\"/js/mobile.js\");
\t} else {
\t\t\$(\"head\").append(\$(\"<link rel='stylesheet' href='/css/jquery.mCustomScrollbar.css'/>\"));
\t\t\$(\"head\").append(\$(\"<link href='//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css' rel='stylesheet'/>\"));
\t\tinclude(\"/js/other.js\");
\t\tinclude(\"/js/jquery.mCustomScrollbar.concat.min.js\");
\t\t(function(\$){
\t\t\t\$(window).load(function(){
\t\t\t\t\$(\".st-content\").mCustomScrollbar({
\t\t\t\t\tscrollButtons:{
\t\t\t\t\t\tenable:true
\t\t\t\t\t},
\t\t\t\t\tadvanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true,autoScrollOnFocus:false}
\t\t\t\t});
\t\t\t\t\$(\".st-menu\").mCustomScrollbar({
\t\t\t\t\tscrollButtons:{
\t\t\t\t\t\tenable:true
\t\t\t\t\t},
\t\t\t\t\tadvanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true}
\t\t\t\t});
\t\t\t\t/*demo fn*/
\t\t\t\t\$(\".ajax\").click(function(e){
\t\t\t\t\te.preventDefault();
\t\t\t\t\t\$(\"st-content\").mCustomScrollbar(\"update\");
\t\t\t\t});
\t\t\t});
\t\t})(jQuery);
\t}
\t\$(document).ready(function() {
\t\t\$('div.code').each(function(i, e) {hljs.highlightBlock(e, null, true)});
\t});
</script>
<script src=\"/js/basis.js\"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47442705-1', 'try-out.tk');
  ga('send', 'pageview');

</script>
</body>
</html>";
    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
    }

    // line 27
    public function block_content($context, array $blocks = array())
    {
        // line 28
        echo "\t\t\t\t    ";
    }

    public function getTemplateName()
    {
        return "template.tpl";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  191 => 28,  188 => 27,  183 => 7,  120 => 67,  118 => 66,  112 => 62,  103 => 57,  92 => 50,  81 => 43,  70 => 36,  63 => 31,  60 => 30,  57 => 29,  55 => 27,  52 => 26,  50 => 25,  21 => 1,  38 => 5,  35 => 4,  29 => 7,);
    }
}
