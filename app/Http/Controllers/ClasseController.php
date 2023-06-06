<?php

namespace App\Http\Controllers;

use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    public function index(){
        return Classe::has('Eleve')->get();
    }
    public function find($id)
    {
        $classe = Classe::find($id);
        return response()->json(['classe' => $classe]);
    }
}
