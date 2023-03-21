import React from "react";
import { HeaderAdmin } from '../../components/HeadersAndFooters/Header'
import { ProyectDisponibles } from "../../components/lider/proyectosDispComponents";



function ProyectDisp() {
 return(
    <div>
        <HeaderAdmin titulo="Proyectos" />
        <ProyectDisponibles />
    </div>
 );   
}

export default ProyectDisp;