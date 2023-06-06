import axios from "axios";
import React, { useEffect, useState } from "react";
import useClasses from "../../custom/useClasses";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Home() {
    const [Eleve, setEleve] = useState([]);
    const [Classe, setClasse] = useState([]);
    const [page, setPage] = useState(1);
    const [ClassId, setClassId] = useState(null);
    const [OrderBy, setOrderBy] = useState(null);
    // const [searchEleve, setSearchEleve] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const[IsSearching,setIsSeraching]=useState(false);
    const[SearchItems,setSearchItems]=useState([]);

    useEffect(() => {
        fetchEleve();
    }, [page, ClassId, OrderBy, searchTerm]);

    //     const handleSearch = async () => {
    //         try {
    //             const response = await axios.get('/api/Eleve/search', {
    //                 params: {
    //                     query: searchTerm
    //                 }
    //             })
    //                 console.log(response)
    //         }
    //             // setEleve(response.data);
    //         catch (error) {
    //         console.log(error);
    //     }
    // };
    const handleSearch = (event) => {
        // const searchTerm = event.target.value;
        // setSearchTerm(searchTerm);
        // const list = Eleve.data ;
        // const res = list.filter((item) =>
        //     item.nom.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        //     item.prenom.toLowerCase().startsWith(searchTerm.toLowerCase())
        // );
        // setEleve(res);

        // console.log(Eleve);
        setIsSeraching(true);
        if (Eleve.data) {
            const filtered = Eleve.data.filter((item) =>
                item.nom.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchItems(filtered);
        };

        // console.log(searchTerm);
        // var res = [];

        // Eleve.data?.map((item) => {
        //     if (item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ) {
        //         res = [...res, item];
        //     }
        // })

        // setEleve(res);
        // console.log(Eleve.data)
    }



    const fetchEleve = async () => {

        try {
            // if (ClassId) {
            //     const response = await axios.get(`/api/Classe/${ClassId}/Eleve?page=${page}`);
            //     setEleve(response.data);
            if (OrderBy) {
                const response = await axios.get(`/api/order/${OrderBy.column}/${OrderBy.direction}/Eleve?page=${page}`);
                setEleve(response.data);
                // } else if (searchEleve) {
                //     const response = await axios.get(`/api/search/${searchEleve}}/Eleve?page=${page}`);
                //     setEleve(response.data);
            } else {
                const response = await axios.get(`/api/Eleve?page=${page}`);
                setEleve(response.data);
            }

        } catch (error) {
            console.log(error);

        }

    }



    const fetchPrevNextEleve = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'))
    }

    // const fetchClasse = async () => {
    //     try {
    //         const response = await axios.get('/api/Classe');
    //         setClasse(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const rederPagination = () => (
        <ul className="pagination">
            {
                Eleve.links?.map((link, index) => (
                    <li key={index} className="page-item">
                        <a style={{ cursor: 'pointer' }}
                            onClick={() => fetchPrevNextEleve(link.url)}
                            className={`page-link ${link.active ? 'active' : ''}`}>
                            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                        </a>
                    </li>
                ))
            }
        </ul>
    )

    const deleteEleve = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const response = await axios.post(`http://127.0.0.1:8000/api/Eleve/delete/${id}`)
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    )
                    fetchEleve();
                } catch (error) {
                    consol.log(error);
                }
            }
        });
    }




    const checkIfEleveIsDone = (done) => (
    done ? (
        <span className="badge bg-success">
            Done
        </span>
    ) :
    (
        <span className="badge bg-danger">
            Processing...
        </span>
    )
);


    return (
        <div className="row my-5 ">
            <div className="row my-3">
                <div className="col-md-4">
                    <div className="form-group">
                        {/* <input type="text"
                            value={searchEleve}
                            onChange={
                                (event) => {
                                    setClassId(null);
                                    setOrderBy(null);
                                    setPage(1);
                                    setSearchEleve(event.target.value)
                                }
                            }
                            placeholder="Search..."
                            className="form-control"
                        /> */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={
                                (event) => {
                                    // setClassId(null);
                                    // setOrderBy(null);
                                    // setPage(1);
                                    handleSearch(event)
                                    setSearchTerm(event.target.value)
                                }

                            }
                            placeholder="Search..."
                            className="form-control"
                        />
                        {/* Afficher les résultats de la recherche */}
                        {/* {Eleve.data?.map((eleves) => (
                            <div key={eleves.id}>{eleves.nom} {eleves.prenom}</div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="col-md-9 card">
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                {/* <th>Classe Id</th> */}

                                <th>Done</th>
                                <th></th>
                                <th>Ajouter</th>
                            </tr>
                        </thead>
                        {!IsSearching &&( <tbody>
                            {
                                Eleve.data?.map(eleves => (
                                    <tr key={eleves.id}>
                                        <td>{eleves.id}</td>
                                        <td>{eleves.nom}</td>
                                        <td>{eleves.prenom}</td>
                                        {/* <td>{eleves.classe_id}</td> */}

                                        <td>
                                            {checkIfEleveIsDone(eleves.done)}
                                        </td>
                                        <td>{eleves.Ajouter}</td>
                                        <td>{eleves.created_at}</td>
                                        <td>
                                            <Link to={`edit/${eleves.id}`} className="btn btn-sm btn-warning">
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                            <button
                                                onClick={() => deleteEleve(eleves.id)}
                                                className="btn btn-sm btn-danger mx-1">
                                                <i className="fas fa-trash"></i>
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody> )}
                        {IsSearching && ( <tbody>
                            {
                                SearchItems.map(eleves => (
                                    <tr key={eleves.id}>
                                        <td>{eleves.id}</td>
                                        <td>{eleves.nom}</td>
                                        <td>{eleves.prenom}</td>
                                        {/* <td>{eleves.classe_id}</td> */}

                                        <td>
                                            {checkIfEleveIsDone(eleves.done)}
                                        </td>
                                        <td>{eleves.Ajouter}</td>
                                        <td>{eleves.created_at}</td>
                                        <td>
                                            <Link to={`edit/${eleves.id}`} className="btn btn-sm btn-warning">
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                            <button
                                                onClick={() => deleteEleve(eleves.id)}
                                                className="btn btn-sm btn-danger mx-1">
                                                <i className="fas fa-trash"></i>
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody> )}
                        
                    </table>
                    <div className="my-4 d-flex justify-content-between">
                        <div>
                            showing {Eleve.from || 0}to {Eleve.to || 0} from
                            {Eleve.total} results.
                        </div>
                        <div>{rederPagination()}</div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header text-center bg-white">
                        <h5 className="mt-2">
                            Filter By
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="form-check">
                            <input type="radio" name="classes" className="form-check-input"
                                onChange={() => {
                                    setPage(1);
                                    fetchEleve();
                                }}
                            // checked={!ClassId ? true : false}
                            />
                            <label htmlFor="classes" className="form-check-label ">All</label>
                        </div>
                        {/* {
                        Classe?.map(classes => {
                            <div className="form-check" key={category.id}>
                                <input type="radio" name="classes" className="form-check-input"
                                    onChange={() => {
                                        setPage(1);
                                        fetchEleve();
                                    }}
                                    value={classes.id}
                                    id={classes.id}
                                />
                                <label htmlFor={classes.id} className="form-check-label ">{classes.nom}</label>
                            </div>
                        })
                    } */}


                    </div>
                </div>
                <div className="card mt-2">
                    <div className="card-header text-center bg-white">
                        <h5 className="mt-2">
                            Order By
                        </h5>
                    </div>
                    <div className="card-body">
                        <div>
                            <h6>ID</h6>
                            <div className="form-check" >
                                <input type="radio" name="id"
                                    value="asc"
                                    className="form-check-input"
                                    onChange={(event) => {
                                        setClassId(null);
                                        setPage(1);
                                        setOrderBy({
                                            column: 'id',
                                            direction: event.target.value
                                        })
                                    }}

                                />
                                <label htmlFor="id" className="form-check-label ">
                                    <i className="fas fa-arrow-up"></i>
                                </label>
                            </div>
                            <div className="form-check" >
                                <input type="radio" name="id" value="desc" className="form-check-input"
                                    onChange={(event) => {
                                        setClassId(null);
                                        setPage(1);
                                        setOrderBy({
                                            column: 'id',
                                            direction: event.target.value
                                        })
                                    }}

                                />
                                <label htmlFor="id" className="form-check-label ">
                                    <i className="fas fa-arrow-down"></i>
                                </label>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h6>Name</h6>
                            <div className="form-check" >
                                <input type="radio" name="nom"
                                    value="asc"
                                    className="form-check-input"
                                    onChange={(event) => {
                                        setClassId(null);
                                        setPage(1);
                                        setOrderBy({
                                            column: 'nom',
                                            direction: event.target.value
                                        })
                                    }}

                                />
                                <label htmlFor="nom" className="form-check-label ">
                                    A-Z
                                </label>
                            </div>
                            <div className="form-check" >
                                <input type="radio" name="nom" value="desc" className="form-check-input"
                                    onChange={(event) => {
                                        setClassId(null);
                                        setPage(1);
                                        setOrderBy({
                                            column: 'nom',
                                            direction: event.target.value
                                        })
                                    }}

                                />
                                <label htmlFor="nom" className="form-check-label ">
                                    Z-A
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}