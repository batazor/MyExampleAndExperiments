<?php

/* users.html */
class __TwigTemplate_2bb9f128abf334011274312318f4d67d15fda2a60cb13478ef108b1908e539e4 extends Twig_Template
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
        echo "Добро ожаловать";
    }

    // line 4
    public function block_content($context, array $blocks = array())
    {
        // line 5
        echo "\t";
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($_info_, "page_status") == "my")) {
            // line 6
            echo "\t\t<p>Добро пожаловать домой</p>
\t";
        } elseif (($this->getAttribute($_info_, "page_status") == "stranger")) {
            // line 8
            echo "\t\t<p>Что надо?</p>
\t";
        }
    }

    public function getTemplateName()
    {
        return "users.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  46 => 8,  42 => 6,  38 => 5,  35 => 4,  29 => 2,);
    }
}
