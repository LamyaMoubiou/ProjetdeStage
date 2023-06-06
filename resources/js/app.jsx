import './bootstrap';

import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Eleve from './components/eleves/eleve';
import Add from './components/eleves/Add';
import Edit from './components/eleves/Edit';
import Header from './components/Header';


ReactDOM.createRoot(document.getElementById('app')).render(
    <div className="row">
        <div className="col-md-12">
            <BrowserRouter>
                <Header />
                <Routes>
                    {/* <Route  path='/' exact element={< Eleve/>}/>
                        <Route path='/Add'  exact element={<Add/>} />
                        <Route  path="/Edit/:EleveId" exact element={<Edit/>}/> */}
                    <Route exact path="/" element={ <Eleve />} />
                    <Route exact path="/Add" element={ <Add />} />
                    <Route exact path="/edit/:eleveId" element={<Edit/>} />
                </Routes>
            </BrowserRouter>
        </div>
    </div>

);
