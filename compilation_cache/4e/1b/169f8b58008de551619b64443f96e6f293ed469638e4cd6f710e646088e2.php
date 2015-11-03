<?php

/* 404.html */
class __TwigTemplate_4e1b169f8b58008de551619b64443f96e6f293ed469638e4cd6f710e646088e2 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("template.tpl");

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "template.tpl";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_title($context, array $blocks = array())
    {
        echo "Что то пошло не так";
    }

    // line 4
    public function block_content($context, array $blocks = array())
    {
        // line 5
        echo "\t<div id=\"error_404\">
\t\t<h1>404</h1>
\t\t<div class=\"z\">
\t\t\t<div class=\"rabbit\"></div>
\t\t\t<div class=\"clouds\"></div>
\t\t</div>
\t\t<p>Запрошенная вами страница не найдена. Вернитесь на <a href=\"/main\">главную</a> или <a onclick=\"history.back()\">предыдущую</a> страницу.</p>
\t</div>
";
    }

    public function getTemplateName()
    {
        return "404.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  38 => 5,  35 => 4,  29 => 2,);
    }
}
