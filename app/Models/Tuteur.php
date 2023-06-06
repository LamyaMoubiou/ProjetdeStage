<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'identifiant',
        'motPasse',
    ];

    public function eleves()
    {
        return $this->hasMany(Eleve::class);
    }
}
