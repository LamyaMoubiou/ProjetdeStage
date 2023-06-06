import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Add() {
    const [nom, setnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    
    const addEleve = async (e) => {
        setloading(true)
        e.preventDefault();
        const Eleve = {
            nom,
            prenom,
        };
        try {
            await axios.post('/api/Eleve', Eleve)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Eleve bien ajouter.',
                showConfirmButton: false,
                timer: 1500
            });
            setloading(false);
            navigate('/')
        } catch (error) {
            setloading(false);
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors([{ message: 'Une erreur est survenue. Veuillez réessayer plus tard.' }]);
            }
        }
    }

    const renderErrors = () => (
        errors.map((error, index) => (
            <div key={index} className="text-white my-2 rounded p-2 bg-danger">
                {error.message}
            </div>
        ))
    )
;





    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white">
                        <div className="text-center mt-2">
                            <h5>Ajouter Eleve</h5>
                        </div>
                        <div className="card-body">
                            <form className="mt-5" onSubmit={(e) => addEleve(e)}>

                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom de l'élève*</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={nom}
                                        onChange={(e) => setnom(e.target.value)}
                                        className="form-control"
                                        placeholder="Nom de Famille" />

                                    {renderErrors('nom')}

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prenom" className="form-label">Prenom de l'élève*</label>
                                    <input type="text"
                                        value={prenom}
                                        onChange={(e) => setprenom(e.target.value)}
                                        className="form-control" id="prenom"
                                        placeholder="Prenom de Famille" />
                                    {renderErrors('prenom')}
                                </div>
                                {
                                    loading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                }


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}