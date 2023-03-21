import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from "./pages/Administrador";
import MenuLider from "./pages/lider/menuLider";
import Miembros from "./pages/lider/miembros";
import Tarea from "./pages/lider/tareas";
import ProyectDisp from './pages/lider/proyectosDisponibles';
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />}/>
      <Route path="/creador" element={<MenuLider />}/>
      <Route path="/creador/miembros" element={<Miembros />}/>
      <Route path="/creador/tareas" element={<Tarea />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
