import React from "react";
import { HeaderAdmin } from '../../components/HeadersAndFooters/Header'
import { FormularioIntegrantes } from '../../components/lider/integrantesComponents'


function Miembros() {
 return(
    <div>
        <HeaderAdmin titulo="Integrantes" link="/creador" />
        <FormularioIntegrantes />
    </div>
 );   
}

export default Miembros;