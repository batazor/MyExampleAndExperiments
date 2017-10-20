<?php

class Controller_about extends Controller
{
	
	function __construct()
	{
		$this->model = new Model_about();
		$this->view = new View();
	}
	
	function action_index()
	{
		$data = $this->model->get_data();
		$this->view->generate('about.html', $data);
	}

}