<?php

/* admin.tpl */
class __TwigTemplate_24287f03731a198552a1d44d7385c5a772d5a5aa336121c3ea222a94672a1dc6 extends Twig_Template
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
\t<meta charset=\"utf-8\">
    <title>";
        // line 7
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> 
    <link rel=\"stylesheet\" href=\"/css/normalize.css\">
\t<link rel=\"stylesheet/less\" href=\"/css/admin.less\">
\t<link href=\"//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css\" rel=\"stylesheet\">
\t<link rel=\"stylesheet\" href=\"/css/jquery.mCustomScrollbar.css\"/>
\t<script src=\"/js/prefixfree.min.js\"></script>
\t<script src=\"/js/less.min.js\"></script>
\t<script src=\"//code.jquery.com/jquery.min.js\"></script>
\t<script src=\"/js/modernizr.custom.js\"></script>
\t<script src=\"/js/ckeditor/ckeditor.js\"></script>
</head>

<body>

\t<div id=\"box\">
\t\t<div id=\"content\">
\t    \t";
        // line 24
        $this->displayBlock('content', $context, $blocks);
        // line 26
        echo "\t\t</div>
\t\t<aside>
\t\t\t";
        // line 28
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($_info_, "status") > 1)) {
            // line 29
            echo "\t\t\t\t<h1><a href=\"/admin\">try-out.tk</a></h1>
\t\t\t\t<nav>
\t\t\t\t\t<ul>
\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-home\"></i></div><a href=\"/admin\"><span>Главная</span></a></div></li>
\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-sign-in\"></i></div><a href=\"/main\"><span>На сайт</span></a></div></li>
\t\t\t\t\t\t";
            // line 34
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "status") > 2)) {
                // line 35
                echo "\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-cogs\"></i></div><a href=\"/admin\"><span>Настройки</span></a></div></li>
\t\t\t\t\t\t";
            }
            // line 37
            echo "\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-question-circle\"></i></div><a href=\"/admin/content\"><span>Вопросы</span></a></div></li>
\t\t\t\t\t\t";
            // line 38
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "status") > 2)) {
                // line 39
                echo "\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-tags\"></i></div><a href=\"/admin/tag\"><span>Теги</span></a></div></li>
\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-group\"></i></div><a href=\"/admin/users\"><span>Юзеры</span></a></div></li>
\t\t\t\t\t\t<li><div class=\"link_bg\"></div><div class=\"link_title\"><div class=\"icon\"><i class=\"fa fa-envelope\"></i></div><a href=\"/admin/messages\"><span>Сообщения</span></a></div></li>
\t\t\t\t\t\t";
            }
            // line 43
            echo "\t\t\t\t\t</ul>
\t\t\t\t</nav>
\t\t\t";
        }
        // line 46
        echo "\t\t</aside>
\t</div>

<script src=\"/js/jquery.mCustomScrollbar.concat.min.js\"></script>
<script>
\t(function(\$){
\t\t\$(window).load(function(){
\t\t\t\$(\"body\").mCustomScrollbar({
\t\t\t\tscrollButtons:{
\t\t\t\t\tenable:true
\t\t\t\t},
\t\t\t\tadvanced:{autoExpandHorizontalScroll:true,updateOnContentResize:true,autoScrollOnFocus:false}
\t\t\t});
\t\t\t/*demo fn*/
\t\t\t\$(\"#add\").click(function(e){
\t\t\t\te.preventDefault();
\t\t\t\t\$(\"body\").mCustomScrollbar(\"update\");
\t\t\t});
\t\t});
\t})(jQuery);
\tif(\$(\"textarea\").length) {CKEDITOR.replace('question');}
</script>
</body>
</html>";
    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
    }

    // line 24
    public function block_content($context, array $blocks = array())
    {
        // line 25
        echo "\t    \t";
    }

    public function getTemplateName()
    {
        return "admin.tpl";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  124 => 25,  121 => 24,  116 => 7,  89 => 46,  84 => 43,  75 => 38,  72 => 37,  65 => 34,  58 => 29,  55 => 28,  51 => 26,  49 => 24,  21 => 1,  594 => 303,  590 => 301,  587 => 300,  576 => 291,  568 => 287,  563 => 286,  557 => 284,  552 => 281,  539 => 272,  525 => 262,  506 => 247,  493 => 236,  482 => 232,  477 => 231,  471 => 229,  468 => 228,  463 => 227,  459 => 225,  456 => 224,  452 => 222,  449 => 221,  436 => 212,  419 => 202,  400 => 187,  387 => 176,  379 => 173,  372 => 171,  365 => 169,  362 => 168,  357 => 167,  352 => 166,  346 => 164,  343 => 163,  338 => 162,  334 => 160,  325 => 155,  319 => 153,  311 => 149,  305 => 147,  302 => 146,  287 => 133,  284 => 132,  280 => 130,  277 => 129,  264 => 120,  250 => 110,  231 => 95,  218 => 84,  202 => 82,  197 => 81,  193 => 79,  185 => 75,  180 => 74,  175 => 71,  164 => 68,  156 => 62,  149 => 60,  142 => 58,  138 => 57,  134 => 55,  129 => 54,  118 => 47,  113 => 44,  95 => 30,  91 => 28,  88 => 27,  82 => 23,  78 => 39,  68 => 35,  63 => 18,  56 => 16,  52 => 14,  48 => 12,  45 => 11,  38 => 6,  35 => 5,  29 => 7,);
    }
}
