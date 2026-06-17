<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
// Mengelompokkan semua rute API dan menerapkan filter CORS global
// Mengelompokkan semua rute API dan menerapkan filter CORS global
$routes->group('api', ['filter' => 'cors'], function($routes) {
    
    // -- TAMBAHKAN 2 BARIS INI UNTUK MENANGANI CORS PREFLIGHT BROWSER --
    $routes->options('(:any)', static function () {});
    $routes->options('', static function () {});

    // Endpoint Login (Tanpa Token)
    $routes->post('login', 'Auth::login');

    // Endpoint Kategori (GET tanpa token, POST/PUT/DELETE wajib token)
    $routes->get('kategori', 'Kategori::index');
    $routes->get('kategori/(:num)', 'Kategori::show/$1');
    $routes->post('kategori', 'Kategori::create', ['filter' => 'auth']);
    $routes->put('kategori/(:num)', 'Kategori::update/$1', ['filter' => 'auth']);
    $routes->delete('kategori/(:num)', 'Kategori::delete/$1', ['filter' => 'auth']);

    // Endpoint Barang (GET tanpa token, POST/PUT/DELETE wajib token)
    $routes->get('barang', 'Barang::index');
    $routes->get('barang/(:num)', 'Barang::show/$1');
    $routes->post('barang', 'Barang::create', ['filter' => 'auth']);
    $routes->put('barang/(:num)', 'Barang::update/$1', ['filter' => 'auth']);
    $routes->delete('barang/(:num)', 'Barang::delete/$1', ['filter' => 'auth']);

    // Endpoint Histori Transaksi
    $routes->get('histori', 'Histori::index');
    $routes->post('histori', 'Histori::create', ['filter' => 'auth']);
    $routes->delete('histori/(:num)', 'Histori::delete/$1', ['filter' => 'auth']);

});
