<?php

class Controller_Users extends Controller
{
	
	function __construct()
	{
		$this->model = new Model_Users();
		$this->view = new View();
	}
	
	function action_index()
	{
		$data = $this->model->get_data();
		$this->view->generate('users.html', $data);
	}

}
