<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Eleve;
use App\Models\Classe;
use App\Models\Tuteur;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        

        // Create 3 classes and assign a professeur to each
        $classes = Classe::factory()
            ->count(3)
            ->create();

        // Create 10 tuteurs with 2 eleves each
        $tuteurs = Tuteur::factory()->count(10)->create()->each(function ($tuteur) {
            $eleves = Eleve::factory()->count(2)->create(['tuteur_id' => $tuteur->id]);
        });

        // Assign each eleve to a classes
        $eleves = Eleve::all();
        foreach ($eleves as $index => $eleve) {
            $eleve->classe()->associate($classes[$index % 3])->save();
        }
    }
}
