<?php

/* admin.html */
class __TwigTemplate_929d3594a61abf1a6672a382e6eef9083f4126cf3409f1b2a187567ca1572001 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("admin.tpl");

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "admin.tpl";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_title($context, array $blocks = array())
    {
        echo "Админка";
    }

    // line 5
    public function block_content($context, array $blocks = array())
    {
        // line 6
        echo "<script>
\$(document).ready(function(){var i=\$('input').size()+1;\$('#add').click(function(){\$('<li class=\"field\"><div id=\"switch\" class=\"left\"><input type=\"checkbox\" name=\"vibor['+i+']\" checked><label><span class=\"fontawesome-ok\"></span><span class=\"fontawesome-remove\"></span><div></div></label></div><input type=\"text\" name=\"answer['+i+']\"></li>').fadeIn('slow').appendTo('.inputs');i++});\$('#remove').click(function(){if(i>1){\$('.field:last').remove();i--}});\$('#reset').click(function(){while(i>2){\$('.field:last').remove();i--}});\$('.submit').click(function(){var answers=[];\$.each(\$('.field'),function(){answers.push(\$(this).val())});if(answers.length==0){answers=\"none\"}alert(answers);return false})});
</script>


    ";
        // line 11
        if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
        if (($this->getAttribute($_info_, "otvet") == "main")) {
            // line 12
            echo "    \t<h1 class=\"title\">Hello!</h1>
    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "gut")) {
            // line 14
            echo "    \t<h3>Все прошло хорошо</h3>
    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "err")) {
            // line 16
            echo "\t    <p>Обноражуны следующие ошибки(";
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            echo twig_escape_filter($this->env, twig_length_filter($this->env, $this->getAttribute($_info_, "err")), "html", null, true);
            echo "):</p>
\t    <ul>
\t\t    ";
            // line 18
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            $context['_parent'] = (array) $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute($_info_, "err"));
            foreach ($context['_seq'] as $context["_key"] => $context["err"]) {
                // line 19
                echo "\t\t    \t<li><p>";
                if (isset($context["err"])) { $_err_ = $context["err"]; } else { $_err_ = null; }
                echo twig_escape_filter($this->env, $_err_, "html", null, true);
                echo "</p></li>
\t\t    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['err'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 21
            echo "\t\t</ul>
    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "content")) {
            // line 23
            echo "    \t<script type=\"text/javascript\" src=\"http://xoxco.com/projects/code/tagsinput/jquery.tagsinput.js\"></script>
    \t<script type=\"text/javascript\">\$(function() {\$('#tag').tagsInput({width:'auto'});});</script>
\t\t<h1 class=\"title\">Контент</h1>
    \t<p><a href=\"/admin/content/add\" class=\"button right\"><span>добавить</span></a></p>
    \t";
            // line 27
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "action") == "content_add")) {
                // line 28
                echo "\t\t\t<form class=\"add\" method=\"post\" action=\"/admin/content/add\">
\t\t\t\t<h4 class=\"title\">Введите ваш вопрос.</h4>
\t\t\t\t<textarea id=\"editor_area\" name=\"question\">";
                // line 30
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "content_list"), "question"), "html", null, true);
                echo "</textarea>
\t\t\t\t<h4 class=\"title\">Введите варианты ответов</h4>
\t\t\t\t<a href=\"#\" id=\"add\" class=\"but btnBlue\">Добавить</a>
\t\t\t\t<a href=\"#\" id=\"remove\" class=\"but btnBlue\">Удалить</a>
\t\t\t\t<a href=\"#\" id=\"reset\" class=\"but btnBlue\">Сбросить</a>
\t\t\t\t<ul>
\t\t\t\t\t<div class=\"inputs\">
\t\t\t\t\t</div>
\t\t\t\t</ul>
\t\t\t\t<h4 class=\"title\">Введите теги</h4>
\t\t\t\t<input type=\"text\" id=\"tag\" class=\"tag\" name=\"tag\"/></p>
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"go\" value=\"Готово\">
\t\t\t</form>
\t\t";
            } elseif (($this->getAttribute($_info_, "action") == "content_upd")) {
                // line 44
                echo "\t\t\t<h1>Обноление</h1>
\t\t\t<form class=\"add\" method=\"post\" action=\"/admin/content/upd\">
\t\t\t\t<h4 class=\"title\">Введите ваш вопрос.</h4>
\t\t\t\t<textarea id=\"editor_area\" name=\"question\">";
                // line 47
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "content_list"), "question"), "html", null, true);
                echo "</textarea>
\t\t\t\t<h4 class=\"title\">Введите варианты ответов</h4>
\t\t\t\t<a href=\"#\" id=\"add\" class=\"but btnBlue\">Добавить</a>
\t\t\t\t<a href=\"#\" id=\"remove\" class=\"but btnBlue\">Удалить</a>
\t\t\t\t<a href=\"#\" id=\"reset\" class=\"but btnBlue\">Сбросить</a>
\t\t\t\t<ul>
\t\t\t\t\t<div class=\"inputs\">
\t    \t\t\t\t";
                // line 54
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable(range(0, $this->getAttribute($this->getAttribute($_info_, "content_list"), "cout")));
                foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
                    // line 55
                    echo "\t\t\t\t\t\t\t<li class=\"field\" style=\"display: list-item;\">
\t\t\t\t\t\t\t\t<div id=\"switch\" class=\"left\">
\t\t\t\t\t\t\t\t\t";
                    // line 57
                    if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                    if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                    if (($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($_info_, "content_list"), "answer"), "vibor"), $_i_, array(), "array") == "on")) {
                        // line 58
                        echo "\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"vibor[";
                        if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                        echo twig_escape_filter($this->env, $_i_, "html", null, true);
                        echo "]\" checked>
\t\t\t\t\t\t\t\t\t";
                    } else {
                        // line 60
                        echo "\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"vibor[";
                        if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                        echo twig_escape_filter($this->env, $_i_, "html", null, true);
                        echo "]\">
\t\t\t\t\t\t\t\t\t";
                    }
                    // line 62
                    echo "\t\t\t\t\t\t\t\t\t\t<label>
\t\t\t\t\t\t\t\t\t\t\t<span class=\"fontawesome-ok\"></span>
\t\t\t\t\t\t\t\t\t\t\t<span class=\"fontawesome-remove\"></span>
\t\t\t\t\t\t\t\t\t\t\t<div></div>
\t\t\t\t\t\t\t\t\t\t</label>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<input type=\"text\" name=\"answer[]\" value=\"";
                    // line 68
                    if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                    if (isset($context["i"])) { $_i_ = $context["i"]; } else { $_i_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($_info_, "content_list"), "answer"), "answer"), $_i_, array(), "array"), "html", null, true);
                    echo "\">
\t\t\t\t\t\t\t</li>
\t    \t\t\t\t";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 71
                echo "\t\t\t\t\t</div>
\t\t\t\t</ul>
\t\t\t\t<h4 class=\"title\">Введите теги</h4>
\t\t\t\t<input type=\"text\" id=\"tag\" name=\"tag\" value=\"";
                // line 74
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "tag"), "html", null, true);
                echo "\">
\t\t\t\t<input type=\"hidden\" name=\"v_id\" value=\"";
                // line 75
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "content_list"), "id"), "html", null, true);
                echo "\">
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"upd\" value=\"Готово\">
\t\t\t</form>
\t\t";
            } elseif (($this->getAttribute($_info_, "action") == "content_list")) {
                // line 79
                echo "\t\t\t<h1>Список вопросов</h1>
\t\t\t<ul class=\"list\">
\t\t\t\t";
                // line 81
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($_info_, "content_list"));
                foreach ($context['_seq'] as $context["_key"] => $context["content_list"]) {
                    // line 82
                    echo "\t    \t\t\t<li>";
                    if (isset($context["content_list"])) { $_content_list_ = $context["content_list"]; } else { $_content_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_content_list_, "question"), "html", null, true);
                    echo " <a href=\"/admin/content/del/";
                    if (isset($context["content_list"])) { $_content_list_ = $context["content_list"]; } else { $_content_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_content_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-power-off\"></i></a><a href=\"/admin/content/upd/";
                    if (isset($context["content_list"])) { $_content_list_ = $context["content_list"]; } else { $_content_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_content_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-pencil\"></i></a></li>
\t    \t\t";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['content_list'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 84
                echo "\t\t\t</ul>
\t\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
\t\t\t<script>
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

\t\t\t\t\$('.left').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_question',
\t\t\t\t\t\tdata: 'count=";
                // line 110
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\t\$('.right').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_question',
\t\t\t\t\t\tdata: 'count=";
                // line 120
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t});
\t\t\t</script>
    \t";
            }
            // line 129
            echo "    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "users")) {
            // line 130
            echo "    \t<h1 class=\"title\">Юзеры</h1>
    \t<p><a href=\"/admin/users/add\" class=\"button right\"><span>добавить</span></a></p>
    \t";
            // line 132
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "action") == "users_add")) {
                // line 133
                echo "    \t\t<form class=\"add\" method=\"post\" action=\"/admin/users/add\">
\t\t\t\t<h4 class=\"title\">Введите логин</h4>
\t\t\t\t\t<input type=\"text\" name=\"login\">
\t\t\t\t<h4 class=\"title\">Введите пароль</h4>
\t\t\t\t\t<input type=\"password\" name=\"password\">
\t\t\t\t<h4 class=\"title\">Введите email</h4>
\t\t\t\t\t<input type=\"email\" name=\"email\">
\t\t\t\t<h4 class=\"title\">Статус. 0,1-пользователи 2-Админ 3-Админ 4-Хозяин</h4>
\t\t\t\t\t<input type=\"range\" min=\"0\" max=\"4\" step=\"1\" name=\"status\"/>
\t\t\t\t<br>
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"users_add\" value=\"Добавить\">
\t\t\t</form>
    \t";
            } elseif (($this->getAttribute($_info_, "action") == "users_upd")) {
                // line 146
                echo "    \t\t<form class=\"add\" method=\"post\" action=\"/admin/users/upd\">
    \t\t\t<input type=\"hidden\" name=\"u_id\" value=\"";
                // line 147
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "users_list"), "id"), "html", null, true);
                echo "\">
\t\t\t\t<h4 class=\"title\">Введите логин</h4>
\t\t\t\t\t<input type=\"text\" name=\"login\" value=\"";
                // line 149
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "users_list"), "login"), "html", null, true);
                echo "\">
\t\t\t\t<h4 class=\"title\">Введите новый пароль</h4>
\t\t\t\t\t<input type=\"password\" name=\"password\">
\t\t\t\t<h4 class=\"title\">Введите email</h4>
\t\t\t\t\t<input type=\"email\" name=\"email\" value=\"";
                // line 153
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "users_list"), "email"), "html", null, true);
                echo "\">
\t\t\t\t<h4 class=\"title\">Статус. 0,1-пользователи 2-Админ 3-Админ 4-Хозяин</h4>
\t\t\t\t\t<input type=\"range\" min=\"0\" max=\"4\" step=\"1\" name=\"status\" value=\"";
                // line 155
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "users_list"), "status"), "html", null, true);
                echo "\"/>
\t\t\t\t<br>
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"users_upd\" value=\"Обновить\">
\t\t\t</form>
    \t";
            } elseif (($this->getAttribute($_info_, "action") == "users_list")) {
                // line 160
                echo "    \t\t<h1>Список пользователей</h1>
\t\t\t<ul class=\"list\">
\t\t\t\t";
                // line 162
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($_info_, "users_list"));
                foreach ($context['_seq'] as $context["_key"] => $context["users_list"]) {
                    // line 163
                    echo "\t    \t\t\t<li>
\t    \t\t\t\t";
                    // line 164
                    if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "login"), "html", null, true);
                    echo "
\t    \t\t\t\t<span>
\t\t    \t\t\t\t<a href=\"/admin/users/del/";
                    // line 166
                    if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-power-off\"></i></a>
\t\t    \t\t\t\t<a href=\"/admin/users/upd/";
                    // line 167
                    if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-pencil\"></i></a>
\t\t    \t\t\t\t";
                    // line 168
                    if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                    if (($this->getAttribute($_users_list_, "status") > 2)) {
                        // line 169
                        echo "\t\t    \t\t\t\t\t<p style=\"background: #A74982;\">статус: ";
                        if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                        echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "status"), "html", null, true);
                        echo "</p>
\t\t    \t\t\t\t";
                    } else {
                        // line 171
                        echo "\t\t\t\t\t\t\t\t<p>статус: ";
                        if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                        echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "status"), "html", null, true);
                        echo "</p>
\t\t    \t\t\t\t";
                    }
                    // line 173
                    echo "\t    \t\t\t\t</span>
\t    \t\t\t</li>
\t    \t\t";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['users_list'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 176
                echo "\t\t\t</ul>
\t\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
\t\t\t<script>
\t\t\t\$(document).ready(function(){
\t\t\t\t// basic paging logic to demo the buttons
\t\t\t\tvar pr = document.querySelector( '.paginate.left' );
\t\t\t\tvar pl = document.querySelector( '.paginate.right' );

\t\t\t\tpr.onclick = slide.bind( this, -1 );
\t\t\t\tpl.onclick = slide.bind( this, 1 );

\t\t\t\tvar index = 0, total = ";
                // line 187
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

\t\t\t\t\$('.left').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_users',
\t\t\t\t\t\tdata: 'status=";
                // line 202
                if (isset($context["users_list"])) { $_users_list_ = $context["users_list"]; } else { $_users_list_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_users_list_, "status"), "html", null, true);
                echo "&count=";
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\t\$('.right').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_users',
\t\t\t\t\t\tdata: 'count=";
                // line 212
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t});
\t\t\t</script>
    \t";
            }
            // line 221
            echo "    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "tag")) {
            // line 222
            echo "    \t<h1 class=\"title\">Теги</h1>
    \t<p><a href=\"/admin/tag/add\" class=\"button right\"><span>добавить</span></a></p>
    \t";
            // line 224
            if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
            if (($this->getAttribute($_info_, "action") == "tag_list")) {
                // line 225
                echo "    \t\t<h1>Список тегов</h1>
    \t\t<ul class=\"list\">
\t\t\t\t";
                // line 227
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                $context['_parent'] = (array) $context;
                $context['_seq'] = twig_ensure_traversable($this->getAttribute($_info_, "tag_list"));
                foreach ($context['_seq'] as $context["_key"] => $context["tag_list"]) {
                    // line 228
                    echo "\t    \t\t\t<li>
\t    \t\t\t\t";
                    // line 229
                    if (isset($context["tag_list"])) { $_tag_list_ = $context["tag_list"]; } else { $_tag_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_tag_list_, "tag"), "html", null, true);
                    echo "
\t    \t\t\t\t<span>
\t\t    \t\t\t\t<a href=\"/admin/tag/del/";
                    // line 231
                    if (isset($context["tag_list"])) { $_tag_list_ = $context["tag_list"]; } else { $_tag_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_tag_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-power-off\"></i></a>
\t\t    \t\t\t\t<a href=\"/admin/tag/upd/";
                    // line 232
                    if (isset($context["tag_list"])) { $_tag_list_ = $context["tag_list"]; } else { $_tag_list_ = null; }
                    echo twig_escape_filter($this->env, $this->getAttribute($_tag_list_, "id"), "html", null, true);
                    echo "\"><i class=\"fa fa-pencil\"></i></a>
\t    \t\t\t\t</span>
\t    \t\t\t</li>
\t    \t\t";
                }
                $_parent = $context['_parent'];
                unset($context['_seq'], $context['_iterated'], $context['_key'], $context['tag_list'], $context['_parent'], $context['loop']);
                $context = array_intersect_key($context, $_parent) + $_parent;
                // line 236
                echo "\t\t\t</ul>
\t\t\t<div id=\"paginator\"><span class=\"paginate left ajax\"><i></i><i></i></span><p class=\"counter\"></p><span class=\"paginate right ajax\"><i></i><i></i></span></div>
\t\t\t<script>
\t\t\t\$(document).ready(function(){
\t\t\t\t// basic paging logic to demo the buttons
\t\t\t\tvar pr = document.querySelector( '.paginate.left' );
\t\t\t\tvar pl = document.querySelector( '.paginate.right' );

\t\t\t\tpr.onclick = slide.bind( this, -1 );
\t\t\t\tpl.onclick = slide.bind( this, 1 );

\t\t\t\tvar index = 0, total = ";
                // line 247
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

\t\t\t\t\$('.left').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_tag',
\t\t\t\t\t\tdata: 'count=";
                // line 262
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t\t\$('.right').click( function() {
\t\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: 'POST',
\t\t\t\t\t\turl: '/ajax_admin.php?action=paginator_tag',
\t\t\t\t\t\tdata: 'count=";
                // line 272
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($_info_, "count"), "html", null, true);
                echo "&page='+index,
\t\t\t\t\t\tsuccess: function(data){
\t\t\t\t\t\t\t\$('.list').html(data);
\t\t\t\t\t\t}
\t\t\t\t\t});
\t\t\t\t});
\t\t\t});
\t\t\t</script>
\t\t";
            } elseif (($this->getAttribute($_info_, "action") == "tag_upd")) {
                // line 281
                echo "\t\t\t<h1>Изменить тег</h1>
\t\t\t<form class=\"add\" method=\"post\" action=\"/admin/tag\">
\t\t\t\t<h4 class=\"title\">Введите tag</h4>
\t\t\t\t\t<input type=\"text\" name=\"tag\" value=\"";
                // line 284
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "tag"), "tag"), "html", null, true);
                echo "\">
\t\t\t\t<h4 class=\"title\">Введите link</h4>
\t\t\t\t\t<input type=\"text\" name=\"link\" value=\"";
                // line 286
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "tag"), "link"), "html", null, true);
                echo "\">
\t\t\t\t\t<input type=\"hidden\" name=\"id\" value=\"";
                // line 287
                if (isset($context["info"])) { $_info_ = $context["info"]; } else { $_info_ = null; }
                echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_info_, "tag"), "id"), "html", null, true);
                echo "\">
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"tag_upd\" value=\"Добавить\" style=\"margin-top:20px;\">
\t\t\t</form>
\t\t";
            } elseif (($this->getAttribute($_info_, "action") == "tag_add")) {
                // line 291
                echo "\t\t\t<h1>Добавить новый тег</h1>
\t\t\t<form class=\"add\" method=\"post\" action=\"/admin/tag\">
\t\t\t\t<h4 class=\"title\">Введите tag</h4>
\t\t\t\t\t<input type=\"text\" name=\"tag\">
\t\t\t\t<h4 class=\"title\">Введите link</h4>
\t\t\t\t\t<input type=\"text\" name=\"link\">
\t\t\t\t<input type=\"submit\" class=\"right button\" name=\"tag_add\" value=\"Добавить\" style=\"margin-top:20px;\">
\t\t\t</form>
\t\t";
            }
            // line 300
            echo "    ";
        } elseif (($this->getAttribute($_info_, "otvet") == "messages")) {
            // line 301
            echo "    \t<h1 class=\"title\">Почта</h1>
    ";
        } else {
            // line 303
            echo "\t\t<style>#content{width: 100%;} h1{text-align: center;}</style>
\t\t<h1>try-out.tk</h1>
\t\t<div class=\"inner-screen\">
\t\t\t<form class=\"form\" method=\"post\" action=\"/admin\">
\t\t\t\t<input type=\"text\"     name=\"login\"    placeholder=\"Login\">
\t\t\t\t<input type=\"password\" name=\"password\" placeholder=\"Password\">
\t\t\t\t<input type=\"submit\"   name=\"verification\" value=\"Войти\">
\t\t\t</form> 
\t\t</div>
    ";
        }
    }

    public function getTemplateName()
    {
        return "admin.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  594 => 303,  590 => 301,  587 => 300,  576 => 291,  568 => 287,  563 => 286,  557 => 284,  552 => 281,  539 => 272,  525 => 262,  506 => 247,  493 => 236,  482 => 232,  477 => 231,  471 => 229,  468 => 228,  463 => 227,  459 => 225,  456 => 224,  452 => 222,  449 => 221,  436 => 212,  419 => 202,  400 => 187,  387 => 176,  379 => 173,  372 => 171,  365 => 169,  362 => 168,  357 => 167,  352 => 166,  346 => 164,  343 => 163,  338 => 162,  334 => 160,  325 => 155,  319 => 153,  311 => 149,  305 => 147,  302 => 146,  287 => 133,  284 => 132,  280 => 130,  277 => 129,  264 => 120,  250 => 110,  231 => 95,  218 => 84,  202 => 82,  197 => 81,  193 => 79,  185 => 75,  180 => 74,  175 => 71,  164 => 68,  156 => 62,  149 => 60,  142 => 58,  138 => 57,  134 => 55,  129 => 54,  118 => 47,  113 => 44,  95 => 30,  91 => 28,  88 => 27,  82 => 23,  78 => 21,  68 => 19,  63 => 18,  56 => 16,  52 => 14,  48 => 12,  45 => 11,  38 => 6,  35 => 5,  29 => 3,);
    }
}
