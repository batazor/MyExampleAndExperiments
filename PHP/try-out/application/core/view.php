<?php

class View
{	
	function generate($content_view, $data = null)
	{
	$loader = new Twig_Loader_Filesystem('application/views');
	$twig = new Twig_Environment($loader, array(
	    'cache'       => 'compilation_cache',
	    'auto_reload' => true

	));
		echo $twig->render($content_view, array('info' => $data));
	}
}
