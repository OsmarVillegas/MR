import React from "react";
import { HeaderAdmin } from '../../components/HeadersAndFooters/Header'
import { FormularioTarea } from "../../components/lider/tareasComponents"


function Tarea() {
 return(
    <div>
        <HeaderAdmin titulo="Tareas" link="/creador"/>
        <FormularioTarea />
    </div>
 );   
}

export default Tarea;