<?php

/* menu.html */
class __TwigTemplate_2545741b598f484d132ecfd40c8f2b6433ebf8377933ec8255985a0c2f5224fc extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'menu' => array($this, 'block_menu'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $this->displayBlock('menu', $context, $blocks);
    }

    public function block_menu($context, array $blocks = array())
    {
        // line 2
        echo "\t<div class=\"st-menu st-effect-11\" id=\"menu-11\">
\t\t<nav>
\t\t\t<h2 class=\"icon icon-stack\"><i class=\"fa fa-anchor\"></i>Sidebar</h2>
\t\t\t<ul id=\"menu_list\">
\t\t\t\t<li><a href=\"/main\"><i class=\"fa fa-home\"></i>Главная</a></li>
\t\t\t\t<li><a href=\"/question/option\"><i class=\"fa fa-play-circle\"></i>Пройти тест</a></li>
\t\t\t\t<li><a href=\"/#\"><i class=\"fa fa-question-circle\"></i>Вопросы</a></li>
\t\t\t\t<li><a href=\"/#\"><i class=\"fa fa-bar-chart-o\"></i>Статистика</a></li>
\t\t\t\t<li><a href=\"/about\"><i class=\"fa fa-smile-o\"></i>О нас</a></li>
\t\t\t\t";
        // line 11
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($this->getAttribute($_info_, "user"), "reg") == 1)) {
            // line 12
            echo "\t\t\t\t\t<li><a href=\"/users/";
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "user"), "login"), "html", null, true);
            echo "\"><i class=\"fa fa-user\"></i>Профиль</a></li>
\t\t\t\t";
        }
        // line 14
        echo "\t\t\t</ul>
\t\t\t<a href=\"#\" id=\"pull\">Меню</a>
\t\t</nav>
\t\t";
        // line 17
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($this->getAttribute($_info_, "user"), "reg") == 0)) {
            // line 18
            echo "\t\t\t<div id=\"flat-form\">
\t\t\t\t<ul class=\"tabs\">
\t\t\t\t\t<li><a href=\"#login\" class=\"active\">Войти</a></li>
\t\t\t\t\t<li><a href=\"#register\">Зарегистрироваться</a></li>
\t\t\t\t\t<li><a href=\"#reset\">Забыл пароль</a></li>
\t\t\t\t</ul>
\t\t\t\t<div id=\"login\" class=\"form-action show\">
\t\t\t\t\t<form id=\"open\">
\t\t\t\t\t\t<ul>
\t\t\t\t\t\t\t<li><input type=\"text\" name=\"login\" class=\"login\" placeholder=\"Введите логин\" required/></li>
\t\t\t\t\t\t\t<li><input type=\"password\" name=\"pass\" class=\"pass\" placeholder=\"Введите пароль\" required/></li>
\t\t\t\t\t\t\t<li><button class=\"button\">Войти</button></li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<div id=\"register\" class=\"form-action hide\">
\t\t\t\t\t<form id=\"reg\">
\t\t\t\t\t\t<ul>
\t\t\t\t\t\t\t<li><input type=\"text\" name=\"login\" class=\"login\" placeholder=\"Введите логин\" required/></li>
\t\t\t\t\t\t\t<li><input type=\"password\" name=\"pass\" class=\"pass\" placeholder=\"Введите пароль\" required/></li>
\t\t\t\t\t\t\t<li><input type=\"text\" name=\"email\" class=\"email\" placeholder=\"Введите email\" required/></li>
\t\t\t\t\t\t\t<li><button class=\"button\">Зарегистрироваться</button></li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<div id=\"reset\" class=\"form-action hide\">
\t\t\t\t\t<form id=\"restore\">
\t\t\t\t\t\t<ul>
\t\t\t\t\t\t\t<li><input type=\"text\" name=\"email\" class=\"email\" placeholder=\"Введите email\" required/></li>
\t\t\t\t\t\t\t<li><button class=\"button\">Восстановить пароль</button></li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t</form>
\t\t\t\t</div>
\t\t\t\t<div class=\"user_otvet\"></div>
\t\t\t</div>
\t\t";
        }
        // line 54
        echo "\t</div>
";
    }

    public function getTemplateName()
    {
        return "menu.html";
    }

    public function getDebugInfo()
    {
        return array (  93 => 54,  47 => 14,  40 => 12,  37 => 11,  26 => 2,  20 => 1,  19 => 1,  191 => 28,  188 => 27,  183 => 7,  120 => 67,  118 => 66,  112 => 62,  103 => 57,  92 => 50,  81 => 43,  70 => 36,  63 => 31,  60 => 30,  57 => 29,  55 => 18,  52 => 17,  50 => 25,  21 => 1,  38 => 5,  35 => 4,  29 => 7,);
    }
}
