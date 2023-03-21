import React from "react";
import { Recuadro } from '../components/admin/adminComponents'
import { HeaderAdmin } from '../components/HeadersAndFooters/Header'

function Admin() {
 return(
    <div>
        <HeaderAdmin titulo="Administrador de proyectos" link="/" />
        <Recuadro />
    </div>
 );   
}

export default Admin;