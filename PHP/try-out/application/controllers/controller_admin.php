<?php

class Controller_Admin extends Controller
{
	
	function __construct()
	{
		$this->model = new Model_Admin();
		$this->view = new View();
	}
	
	function action_index()
	{
		$data = $this->model->get_data();
		$this->view->generate('admin.html', $data);
	}

}
