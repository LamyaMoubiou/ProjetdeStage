<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Eleve extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'classe_id',
        'tuteur_id',
        'done',
    ];

    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }
    
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

    public function tuteur()
    {
        return $this->belongsTo(Tuteur::class);
    }

}
