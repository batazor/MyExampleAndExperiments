<?php

/* main.html */
class __TwigTemplate_bb1041fa3c104216c0f0bd093c0bafdf52850ada37881ce46d5fc6e49baa0f40 extends Twig_Template
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
        echo "Пройди тест. Сделай жизнь";
    }

    // line 4
    public function block_content($context, array $blocks = array())
    {
        // line 5
        echo "\t<div id=\"question\">
\t\t<div class=\"menu\">
\t\t\t<a class=\"button red\" href=\"/question/option\">Настраиваемый тест</a>
\t\t\t<a class=\"button red\" href=\"/question/rand\">random</a>
\t\t\t<p>Отвечай на череду случайных вопросов, либо выбери только интересные для вас темы</p>
\t\t</div>
\t</div>
";
    }

    public function getTemplateName()
    {
        return "main.html";
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
