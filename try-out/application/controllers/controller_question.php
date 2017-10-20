<?php

class Controller_Question extends Controller
{
	
	function __construct()
	{
		$this->model = new Model_Question();
		$this->view = new View();
	}
	
	function action_index()
	{
		$data = $this->model->get_data();
		$this->view->generate('question.html', $data);
	}

}