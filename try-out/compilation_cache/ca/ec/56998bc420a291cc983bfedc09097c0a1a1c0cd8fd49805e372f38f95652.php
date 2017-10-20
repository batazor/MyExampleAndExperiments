<?php

/* tag.html */
class __TwigTemplate_caec56998bc420a291cc983bfedc09097c0a1a1c0cd8fd49805e372f38f95652 extends Twig_Template
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
        echo "Вопросы по тегу";
    }

    // line 4
    public function block_content($context, array $blocks = array())
    {
        // line 5
        echo "\t";
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($_info_, "otvet") == "gut")) {
            // line 6
            echo "\t\t<div id=\"question\">
\t\t\t";
            // line 7
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($_info_, "question"));
            foreach ($context['_seq'] as $context["_key"] => $context["question"]) {
                // line 8
                echo "\t\t\t\t<article class=\"list\"><p><a href=\"/question/";
                if (isset($context["question"])) { $_question_ = $context["question"]; } else { $_question_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_question_, "id"), "html", null, true);
                echo "\">";
                if (isset($context["question"])) { $_question_ = $context["question"]; } else { $_question_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_question_, "question"), "html", null, true);
                echo "</a></p></article>
\t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['question'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 10
            echo "\t\t</div>
\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
<script>
\$(document).ready(function(){
\t// basic paging logic to demo the buttons
\tvar pr = document.querySelector( '.paginate.left' );
\tvar pl = document.querySelector( '.paginate.right' );

\tpr.onclick = slide.bind( this, -1 );
\tpl.onclick = slide.bind( this, 1 );

\tvar index = 0, total = ";
            // line 21
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "page_count"), "html", null, true);
            echo ";

\tfunction slide(offset) {
\t\tindex = Math.min( Math.max( index + offset, 0 ), total - 1 );
\t\tdocument.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;
\t\tpr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
\t\tpl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
\t}

\tslide(0);

\t\$('.left').click( function() {
\t\t\$.ajax({
\t\t\ttype: 'POST',
\t\t\turl: '/ajax.php?action=paginator_tag',
\t\t\tdata: 'count=";
            // line 36
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
            echo "&tag_id=";
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "tag_id"), "html", null, true);
            echo "&page='+index,
\t\t\tsuccess: function(data){
\t\t\t\t\$('#question').html(data);
\t\t\t}
\t\t});
\t});
\t\$('.right').click( function() {
\t\t\$.ajax({
\t\t\ttype: 'POST',
\t\t\turl: '/ajax.php?action=paginator_tag',
\t\t\tdata: 'count=";
            // line 46
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
            echo "&tag_id=";
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "tag_id"), "html", null, true);
            echo "&page='+index,
\t\t\tsuccess: function(data){
\t\t\t\t\$('#question').html(data);
\t\t\t}
\t\t});
\t});
});
</script>
\t";
        }
    }

    public function getTemplateName()
    {
        return "tag.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  112 => 46,  95 => 36,  76 => 21,  63 => 10,  50 => 8,  45 => 7,  42 => 6,  38 => 5,  35 => 4,  29 => 2,);
    }
}
