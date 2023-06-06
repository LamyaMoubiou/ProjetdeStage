import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Edit() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { eleveId } = useParams();

    useEffect(() => {
        fetchEleve();
    }, []);

   
    const fetchEleve = async () => {
        try {
            const response = await axios.get(`/api/Eleve/${eleveId}`);
            const { nom, prenom, done } = response.data;
            if (nom && prenom) {
                setNom(nom);
                setPrenom(prenom);
                setDone(done);
            }
        } catch (error) {
            console.log(error);
        }
    };



    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const Eleve = {
            nom: nom,
            prenom: prenom,
            done: done,
        };
        try {
            await axios.put(`/api/Eleve/${eleveId}`, Eleve);
            setLoading(false);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Élève modifié avec succès.',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            setLoading(false);
            setErrors(error.response.data.errors);
        }
    };

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-white my-2 rounded p-2 bg-danger">
                {error}
            </div>
        ))
    );


    return (
        <div className="row my-5">
            <div className="col-md-6 mx-auto">
                <div className="card">
                    <div className="card-header bg-white">
                        <div className="text-center mt-2">
                            <h5>Modifier l'élève</h5>
                        </div>
                        <div className="card-body">
                            <form className="mt-5" onSubmit={(e) => formSubmit(e)}  >
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom de l'élève*</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        className="form-control"
                                        placeholder="Nom de Famille"
                                    />
                                    {renderErrors('nom')}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prenom" className="form-label">Prénom de l'élève*</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                        className="form-control"
                                        placeholder="Prénom"
                                    />
                                    {renderErrors('prenom')}
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="done"
                                        checked={done}
                                        onChange={() => setDone(!done)} // Met à jour la valeur de done lors du changement de la case à cocher
                                        id="done"
                                    />

                                    <label className="form-check-label" htmlFor="done">
                                        Done
                                    </label>
                                </div>
                                {loading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <button type="submit" className="btn btn-primary">
                                        Modifier
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
