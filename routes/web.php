<?php
  use App\Http\Controllers\Controller;
  use Illuminate\Support\Facades\Route;

// * Controller - Controls the web in general.
  Route::get('/', [ Controller::class, 'index', ])
    ->name('index');

  Route::post('/check', [ Controller::class, 'check', ])
    ->name('check');

  Route::post('/in', [ Controller::class, 'in', ])
    ->name('in');

  Route::middleware('auth')
    ->group(function () {
      Route::get('/out', [ Controller::class, 'out', ])
        ->name('out');
    });