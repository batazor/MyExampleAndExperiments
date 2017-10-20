<?php

// подключаем файлы ядра
require_once 'core/model.php';
require_once 'core/view.php';
require_once 'core/controller.php';
require_once 'core/route.php';

// подключаем прочие файлы
require_once 'lib/Twig/Autoloader.php'; // подключение шаблонизатора
require_once 'lib/MysqliDb.php';        // работа с базой данных


Twig_Autoloader::register(); // запускаем шаблонизатор
Route::start();              // запускаем маршрутизатор