<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddEleveRequest;
use App\Http\Requests\EditEleveRequest;
use App\Models\Eleve;
use App\Models\Classe;
use Illuminate\Http\Request;

class EleveController extends Controller
{
    public function index()
    {
        return Eleve::with('Classe')->paginate(5);
    }
    public function store(Request $request)
    {
        $Eleve = new Eleve();
        $Eleve->nom = $request->nom;
        $Eleve->prenom = $request->prenom;
        $Eleve->save();
        // $Eleve = Eleve::Add([
        //     'nom'=>$request->nom,
        //     'prenom'=>$request->prenom,

        return $Eleve;
    }


    public function show(Eleve $Eleve)
    {
        return $Eleve;
    }

    // public function update(EditEleveRequest $request, Eleve $Eleve)
    // {
    //     $Eleve->update([
    //         'nom' => $request->nom,
    //         'prenom' => $request->prenom,
    //         'done' => $request->done,
    //     ]);
    //     return $Eleve;
    // }
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'done' => 'boolean',
        ]);

        // Si les données sont valides, procédez à la mise à jour de l'élève
        $eleve = Eleve::find($id);
        $eleve->nom = $validatedData['nom'];
        $eleve->prenom = $validatedData['prenom'];
        $eleve->done = $validatedData['done'];
        $eleve->save();

        return response()->json(['message' => 'Élève modifié avec succès']);
    }

    public function delete($id)
    {
        $eleve = Eleve::find($id);
        $eleve->delete();
        return ['message' => 'Cet élève à bien était supprimer'];

    }

    public function getEleveByClasse(Classe $Classe)
    {
        return $Classe->Eleves()->with('Classe')->paginate(5);
    }

    public function getEleveOrderBy($column, $direction)
    {
        return Eleve::with('Classe')->orderBy($column, $direction)->paginate(5);
    }
    public function getEleveByEleve($eleve)
    {
        $Eleve = Eleve::with('Classe')
            ->where('nom', 'like', '%' . $eleve . '%')
            ->orwhere('prenom', 'like', '%' . $eleve . '%')
            ->paginate(5);
        return $Eleve;
    }

    // public function search(Request $request)
    // {
    //     $query = $request->input('query');

    //     $eleve = Eleve::where('nom', 'LIKE', "%$query%")
    //         ->orWhere('prenom', 'LIKE', "%$query%")
    //         ->paginate(5);

    //     return response()->json($eleve);


    // }

}