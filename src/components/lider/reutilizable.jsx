import "../../style/Creator/menuCreator.css";
import { Link } from "react-router-dom";

export function Recuadro({ titulo, desc, link, children }) {
  return (
    <Link to={link}>
      <div className="liderCuadro">
        <div className="cuadroHead">
          <h3>{titulo}</h3>
          <p>{desc}</p>
        </div>
        <div className="cuadroCaracteristicas">{children}</div>
        <div className="cuadroPie"></div>
      </div>
    </Link>
  );
}
