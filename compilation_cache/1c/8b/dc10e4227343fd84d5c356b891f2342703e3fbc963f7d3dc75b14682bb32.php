<?php

/* question.html */
class __TwigTemplate_1c8bdc10e4227343fd84d5c356b891f2342703e3fbc963f7d3dc75b14682bb32 extends Twig_Template
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
        echo "Вопросы (=";
    }

    // line 4
    public function block_content($context, array $blocks = array())
    {
        // line 5
        echo "\t";
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($_info_, "otvet") == "rand")) {
            // line 6
            echo "\t\t<div id=\"question\">
\t\t\t<article class=\"ac-custom ac-checkbox ac-cross\">
\t\t\t\t<a class=\"button red ajax rand\">Проверить</a>
\t\t\t\t<p><span class=\"span\">Вопрос</span></p>
\t\t\t\t\t<div class=\"text\">";
            // line 10
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo $this->getAttribute($this->getAttribute($_info_, "question"), "question");
            echo "</div>
\t\t\t\t<p><span class=\"span\">Варианты ответа</span></p>
\t\t\t\t\t<ul id=\"variant\">
\t\t\t\t\t\t";
            // line 13
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable(range(0, (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($_info_, "question"), "answer"), "answer")) - 1)));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 14
                echo "\t\t\t\t\t\t\t<li><input id=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\" type=\"checkbox\" name='";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "'><label for=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\">";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($_info_, "question"), "answer"), "answer"), $_i_, array(), "array");
                echo "</label></li>
\t    \t\t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 16
            echo "    \t\t\t\t</ul>
    \t\t\t\t<div class=\"otvet\"></div>
\t\t\t\t<input type=\"hidden\" name=\"id\" id=\"id\" value=\"";
            // line 18
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "id"), "html", null, true);
            echo "\">
\t\t\t\t<footer>
\t\t\t\t\t<ul>
\t\t\t\t\t\t<li><p>Теги: 
\t\t\t\t\t\t";
            // line 22
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($this->getAttribute($_info_, "question"), "tag"));
            foreach ($context['_seq'] as $context["_key"] => $context["tag"]) {
                // line 23
                echo "\t\t\t\t\t\t\t<span class=\"span\"><a href=\"/tag/";
                if (isset($context["tag"])) { $_tag_ = $context["tag"]; } else { $_tag_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_tag_, "link"), "html", null, true);
                echo "\">";
                if (isset($context["tag"])) { $_tag_ = $context["tag"]; } else { $_tag_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_tag_, "tag"), "html", null, true);
                echo "</a></span>
\t    \t\t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['tag'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 25
            echo "\t    \t\t\t\t</p></li>
\t\t\t\t\t\t<li><p>Автор: ";
            // line 26
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "author"), "html", null, true);
            echo "</p></li>
\t\t\t\t\t\t<li><p>Дата публикации: ";
            // line 27
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, twig_date_format_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "date"), "d/m/Y"), "html", null, true);
            echo "</p></li>
\t\t\t\t\t</ul>
\t\t\t\t</footer>
\t\t\t</article>
\t\t\t<div class=\"menu\">
\t\t\t\t<a class=\"button red\" href=\"/question/option\">Настраиваемый тест</a>
\t\t\t\t";
            // line 33
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "fix") == "link")) {
                // line 34
                echo "\t\t\t\t\t<a class=\"button red\" href=\"/question/rand\">random</a>
\t\t\t\t";
            } else {
                // line 36
                echo "\t\t\t\t\t<a class=\"button red ajax rand_update\" href=\"#\">random</a>
\t\t\t\t";
            }
            // line 38
            echo "\t\t\t\t<p>Отвечай на череду случайных вопросов, либо выбери только интересные для вас темы</p>
\t\t\t</div>
\t\t</div>
\t\t<script>
\t\t\t\$('#question').on('click', '.rand', function() {
\t\t\t\t\$('article .otvet').css('display','block');
\t\t\t\tvar all=\$('#variant input:checkbox:checked').serializeArray();
\t\t\t\tparams = {
\t\t\t\t\tid : '";
            // line 46
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "id"), "html", null, true);
            echo "',
\t\t\t\t\tcheckbox : all
\t\t\t\t};
\t\t\t\t\$.ajax({
\t\t\t\t\ttype: 'POST',
\t\t\t\t\turl: '/ajax.php?action=question_verify',
\t\t\t\t\tdata: params,
\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\$('.otvet').html(data);
\t\t\t\t\t}
\t\t\t\t});
\t\t\t});
\t\t</script>
\t";
        } elseif (($this->getAttribute($_info_, "otvet") == "go")) {
            // line 60
            echo "\t\t<div id=\"question\">
\t\t\t<article class=\"ac-custom ac-checkbox ac-checkmark\">
\t\t\t\t<a href=\"#\" class=\"button red rand\">Проверить</a>
\t\t\t\t<a href=\"#\" class=\"button red start\">Я устал</a>
\t\t\t\t<div id=\"fix\">
\t\t\t\t\t<p><span class=\"span\">Вопрос</span></p>
\t\t\t\t\t\t<div class=\"text\">";
            // line 66
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo $this->getAttribute($this->getAttribute($_info_, "question"), "question");
            echo "</div>
\t\t\t\t\t<p><span class=\"span\">Варианты ответа</span></p>
\t\t\t\t\t\t<ul id=\"variant\">
\t\t\t\t\t\t\t";
            // line 69
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable(range(0, (twig_length_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($_info_, "question"), "answer"), "answer")) - 1)));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 70
                echo "\t\t\t\t\t\t\t\t<li><input id=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\" type=\"checkbox\" name='";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "' data-otvet=\"";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "id"), "html", null, true);
                echo "\"><label for=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\">";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($_info_, "question"), "answer"), "answer"), $_i_, array(), "array");
                echo "</label></li>
\t\t    \t\t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 72
            echo "\t\t\t\t\t\t</ul>
\t\t\t\t\t<input type=\"hidden\" name=\"id\" id=\"id\" value=\"";
            // line 73
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "question"), "id"), "html", null, true);
            echo "\">
\t\t\t\t</div>
\t\t\t\t<div class=\"otvet\"></div>
\t\t\t\t<footer>
\t\t\t\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
\t\t\t\t</footer>
\t\t\t</article>
\t\t\t<div class=\"menu\">
\t\t\t\t<a class=\"button red\" href=\"/question/option\">Настраиваемый тест</a>
\t\t\t\t<a class=\"button red\" href=\"/question/rand\">random</a>
\t\t\t\t<p>Отвечай на череду случайных вопросов, либо выбери только интересные для вас темы</p>
\t\t\t</div>
\t\t</div>
\t\t<script>
\t\t\t\$(document).ready(function(){
\t\t\t\t// basic paging logic to demo the buttons
\t\t\t\tvar pr = document.querySelector( '.paginate.left' );
\t\t\t\tvar pl = document.querySelector( '.paginate.right' );

\t\t\t\tpr.onclick = slide.bind( this, -1 );
\t\t\t\tpl.onclick = slide.bind( this, 1 );

\t\t\t\tvar index = 0, total = ";
            // line 95
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "page_count"), "html", null, true);
            echo ";

\t\t\t\tfunction slide(offset) {
\t\t\t\t\tindex = Math.min( Math.max( index + offset, 0 ), total - 1 );
\t\t\t\t\tdocument.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;
\t\t\t\t\tpr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
\t\t\t\t\tpl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
\t\t\t\t}

\t\t\t\tslide(0);

\t\t\t\t\$('#paginator').on('click', '.left', function(){
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=question_update',
\t\t\t\t\t\tdata: 'page='+index+'&arr=";
            // line 110
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "question_arr"), "html", null, true);
            echo "&otvet='+otvet,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('#fix').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t\t\$('.otvet').hide(20);
\t\t\t\t});
\t\t\t\t\$('#paginator').on('click', '.right', function(){
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=question_update',
\t\t\t\t\t\tdata: 'page='+index+'&arr=";
            // line 121
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "question_arr"), "html", null, true);
            echo "&otvet='+otvet,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('#fix').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t\t\$('.otvet').hide(20);
\t\t\t\t});

\t\t\t\tfunction in_array(value, array) {
\t\t\t\t\tfor(var i = 0; i < array.length; i++) {if(array[i] == value) return true;}
\t\t\t\t\treturn false;
\t\t\t\t}

\t\t\t\totvet = []

\t\t\t\t\$('#fix').on('click', ':checkbox', function(){
\t\t\t\t\tif(\$(this).prop(\"checked\")) {
\t\t\t\t\t\tif (!in_array((\$(this).data('otvet')+\".\"+(this.name)), otvet)) {otvet.push((\$(this).data('otvet')+\".\"+(this.name)));}
\t\t\t\t\t} else {
\t\t\t\t\t\tkey = otvet.indexOf((\$(this).data('otvet')+\".\"+(this.name)));
\t\t\t\t\t\totvet.splice (key,1);
\t\t\t\t\t}
\t\t\t\t});

\t\t\t\t\$('#question').on('click', '.start', function(){
\t\t\t\t\tquestion_verify = otvet.join('|');
\t\t\t\t\t\$('#question').html(question_verify);
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=question_verify_all',
\t\t\t\t\t\tdata: 'question_verify='+question_verify+'&num=";
            // line 151
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "page_count"), "html", null, true);
            echo "',
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('#question').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\t
\t\t\t\t\$('#question').on('click', '.rand', function() {
\t\t\t\t\t\$('article .otvet').css('display','block');
\t\t\t\t\tvar all=\$('#variant input:checkbox:checked').serializeArray();
\t\t\t\t\tparams = {
\t\t\t\t\t\tid : \$('#id').val(),
\t\t\t\t\t\tcheckbox : all
\t\t\t\t\t};
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=question_verify',
\t\t\t\t\t\tdata: params,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.otvet').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t});
\t\t</script>
\t";
        } elseif (($this->getAttribute($_info_, "otvet") == "option")) {
            // line 177
            echo "\t\t<div id=\"question\">
\t\t\t<article class=\"ac-custom ac-checkbox ac-checkmark\">
\t\t\t\t<a href=\"#\" class=\"button red start\">Запустить</a>
\t\t\t\t<p><span>Выберите теги по которым хотите провести тестирование</span></p>
\t\t\t\t<ul id=\"variant\">
\t\t\t\t\t";
            // line 182
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable(range(0, (twig_length_filter($this->env, $this->getAttribute($_info_, "tag")) - 1)));
            foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                // line 183
                echo "\t\t\t\t\t\t<li><input id=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\" type=\"checkbox\" name='";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($_info_, "tag"), $_i_, array(), "array"), "link", array(), "array"), "html", null, true);
                echo "'><label for=\"cb";
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $_i_, "html", null, true);
                echo "\">";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($_info_, "tag"), $_i_, array(), "array"), "tag", array(), "array"), "html", null, true);
                echo "</label></li>
    \t\t\t\t";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 185
            echo "\t\t\t\t</ul>
\t\t\t\t<footer>
\t\t\t\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
\t\t\t\t</footer>
\t\t\t</article>
\t\t\t<div class=\"menu\">
\t\t\t\t<a class=\"button red\" href=\"/question/option\">Настраиваемый тест</a>
\t\t\t\t<a class=\"button red\" href=\"/question/rand\">random</a>
\t\t\t\t<p>Отвечай на череду случайных вопросов, либо выбери только интересные для вас темы</p>
\t\t\t</div>
\t\t</div>
\t\t<script>
\t\t\t\$(document).ready(function(){
\t\t\t\t// basic paging logic to demo the buttons
\t\t\t\tvar pr = document.querySelector( '.paginate.left' );
\t\t\t\tvar pl = document.querySelector( '.paginate.right' );

\t\t\t\tpr.onclick = slide.bind( this, -1 );
\t\t\t\tpl.onclick = slide.bind( this, 1 );

\t\t\t\tvar index = 0, total = ";
            // line 205
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "page_count"), "html", null, true);
            echo ";

\t\t\t\tfunction slide(offset) {
\t\t\t\t\tindex = Math.min( Math.max( index + offset, 0 ), total - 1 );
\t\t\t\t\tdocument.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;
\t\t\t\t\tpr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
\t\t\t\t\tpl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
\t\t\t\t}

\t\t\t\tslide(0);

\t\t\t\t\$('#paginator').on('click', '.left', function(){
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=paginator_tag_option',
\t\t\t\t\t\tdata: 'count=";
            // line 220
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
            echo "&page='+index+'&tag='+tag,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('#variant').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\t\$('#paginator').on('click', '.right', function(){
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax.php?action=paginator_tag_option',
\t\t\t\t\t\tdata: 'count=";
            // line 230
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
            echo "&page='+index+'&tag='+tag,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('#variant').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});

\t\t\t\tfunction in_array(value, array) {
\t\t\t\t\tfor(var i = 0; i < array.length; i++) {if(array[i] == value) return true;}
\t\t\t\t\treturn false;
\t\t\t\t}

\t\t\t\ttag = []

\t\t\t\t\$('#variant').on('click', ':checkbox', function(){
\t\t\t\t\tif(\$(this).prop(\"checked\")) {
\t\t\t\t\t\tif (!in_array(this.name, tag)) {tag.push(this.name);}
\t\t\t\t\t} else {
\t\t\t\t\t\tkey = tag.indexOf(this.name);
\t\t\t\t\t\ttag.splice (key,1);
\t\t\t\t\t}
\t\t\t\t});

\t\t\t\t\$('#question').on('click', '.start', function(){
\t\t\t\t\ttag_link = tag.join('&')
\t\t\t\t\tlocation.href = '/question/tag/'+tag_link;
\t\t\t\t});
\t\t\t});
\t\t</script>
\t";
        }
        // line 260
        echo "\t<script src=\"/js/svgcheckbx.js\"></script>
\t<script>
\t\tggg();
\t\t\$('.rand_update').on('click', function(){
\t\t\t\$.ajax({
\t\t\t\turl: '/ajax.php?action=question_update',
\t\t\t\tsuccess: function(data){
\t\t\t\t\t\$('.ac-custom').html(data);
\t\t\t\t}
\t\t\t});
\t\t});
\t\t\$(window).load(function(){
\t\t\t\$(\".code\").mCustomScrollbar({
\t\t\t    horizontalScroll:true
\t\t\t});
\t\t});
\t</script>
";
    }

    public function getTemplateName()
    {
        return "question.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  459 => 260,  425 => 230,  411 => 220,  392 => 205,  370 => 185,  349 => 183,  344 => 182,  337 => 177,  307 => 151,  273 => 121,  258 => 110,  239 => 95,  213 => 73,  210 => 72,  187 => 70,  182 => 69,  175 => 66,  167 => 60,  149 => 46,  139 => 38,  135 => 36,  131 => 34,  128 => 33,  118 => 27,  113 => 26,  110 => 25,  97 => 23,  92 => 22,  84 => 18,  80 => 16,  60 => 14,  55 => 13,  48 => 10,  42 => 6,  38 => 5,  35 => 4,  29 => 2,);
    }
}
