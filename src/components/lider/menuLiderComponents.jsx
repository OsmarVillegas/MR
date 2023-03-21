import "../../style/Creator/menuCreator.css";
import { Recuadro } from "./reutilizable";
import { Link } from "react-router-dom";

export function Contenido() {
  return (
    <div className="liderContenido">
      <h2 className="liderContenido-titulo">Administrador</h2>
      <div className="liderContenido-contenido">
        <Recuadro titulo="Integrantes" desc="Administrar a los integrantes del proyecto" link="/creador/miembros">
          <ul>
            <li>Consultar la lista de todos los integrantes</li>
            <li>Editar información</li>
            <li>Eliminar integrantes</li>
          </ul>
        </Recuadro>
        <Recuadro titulo="Tareas" desc="Gestionar las tareas del proyecto" link="/creador/tareas">
          <ul>
            <li>Asignar tarea</li>
            <li>Consultar tareas</li>
            <li>Editar tarea</li>
            <li>Eliminar tarea</li>
          </ul>
        </Recuadro>
      </div>
    </div>
  );
}
