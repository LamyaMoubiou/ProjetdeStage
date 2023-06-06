<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddEleveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nom'=> 'required',
            'prenom'=>'required',
            'classe_id'=>'required',
            'tuteur_id'=>'required',
        ];
    }
    public function messages()
    {
        return [
            'classe_id.required'=>'the classe field is required'
        ];
    }
}
