$(document).ready(function() {
$('.tabs').on('click','li a',function(e){$('#flat-form form').show();e.preventDefault();var $tab=$(this),href=$tab.attr('href');$('.active').removeClass('active');$tab.addClass('active');$('.show').removeClass('show').addClass('hide').hide();$(href).removeClass('hide').addClass('show').hide().fadeIn(550)});
$(function(){var pull=$('#pull');menu=$('nav ul');menuHeight=menu.height();$(pull).on('click',function(e){e.preventDefault();menu.slideToggle()});$(window).resize(function(){var w=$(window).width();if(w>320&&menu.is(':hidden')){menu.removeAttr('style')}})});
});