<?php

class Controller_tag extends Controller
{
	
	function __construct()
	{
		$this->model = new Model_tag();
		$this->view = new View();
	}
	
	function action_index()
	{
		$data = $this->model->get_data();
		$this->view->generate('tag.html', $data);
	}

}
