<?php

use App\Http\Controllers\ClasseController;
use App\Http\Controllers\EleveController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('Eleve',[EleveController::class,'index']);
Route::post('Eleve',[EleveController::class,'store']);
Route::get('Eleve/{id}',[EleveController::class,'show']);
Route::put('Eleve/{id}',[EleveController::class,'update']);
// Route::delete('Eleve/{id}',[EleveController::class,'destroy']);
Route::post('Eleve/delete/{id}' , [EleveController::class, 'delete']);
Route::get('Classe/{Classe}/Eleve',[EleveController::class,'gatEleveByClasse']);
// Route::get('search/{eleve}/Eleve',[EleveController::class,'getEleveByEleve']);
Route::get('/Eleve/search', [EleveController::class, 'getEleveByEleve']);

Route::get('order/{column}/{direction}/Eleve',[EleveController::class,'getEleveOrderBy']);

Route::get('Classe',[ClasseController::class,'index']);
