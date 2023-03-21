import { HeaderAdmin } from "../../components/HeadersAndFooters/Header";
import { Contenido } from "../../components/lider/menuLiderComponents";

function MenuLider() {
  return (
    <div>
      <HeaderAdmin titulo="Vista Lider" link="/" />
      <Contenido />
    </div>
  );
}

export default MenuLider;
