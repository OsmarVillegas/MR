import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/Admin/modal.css";

const url = "http://localhost:4000/api/users";
export function ModalProyect() {
  const [users, setUsers] = useState([]);
  const [Proyects, setProyects] = useState([]);

  const [proyectName, setproyectName] = useState("");
  const [proyectDes, setproyectDes] = useState("");
  const [fechIn, setfechIn] = useState("");
  const [fechFin, setfechFin] = useState("");
  const [resp, setresp] = useState("");
  const [state, setstate] = useState("Activo");
  const [Integrantes, setprojectIntegrante] = useState([]);

  function handleChange(e) {
    setstate(e.target.value);
  }

  const peticionPut = () => {
    axios
      .put(url + "/" , {
        proyectName,
        proyectDes,
        fechIn,
        fechFin,
        resp,
        state,
        proyectIntegrante: Integrantes,
      })
      .then((response) => {
      });
  };

  const seleccionarProyecto = (integrante) => {
    setproyectName(integrante.proyectName);
  };

  const saveProyect = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/proyects", {
        proyectName,
        proyectDes,
        fechIn,
        fechFin,
        resp,
        state,
        proyectIntegrante: Integrantes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    const response = await axios.get(url);
    setUsers(response.data);
  };

  const addIntegrante = () => {
    setprojectIntegrante([...Integrantes, { name: "" }]);
  };

  const [numCasillas, setNumCasillas] = useState(0);
  const [textos, setTextos] = useState(Array(5).fill(""));

  function handleNumCasillasChange(e) {
    setNumCasillas(Number(e.target.value));
  }

  function handleTextoChange(e, index) {
    const nuevosTextos = [...textos];
    nuevosTextos[index] = e.target.value;
    setTextos(nuevosTextos);
  }

  function renderCasillasTexto() {
    const casillasTexto = [];
    for (let i = 0; i < numCasillas; i++) {
      casillasTexto.push(
        <div key={i}>
          <label>
            Integrante {i + 1}: <p> </p>{" "}
          </label>
          <input
            type="text"
            value={Integrantes[i]?.name || ""}
            onChange={(e) => {
              const nuevosIntegrantes = [...Integrantes];
              nuevosIntegrantes[i] = { name: e.target.value };
              setprojectIntegrante(nuevosIntegrantes);
              console.log(Integrantes);
            }}
          />
        </div>
      );
    }
    return casillasTexto;
  }

  return (
    <div className="ModalProyect-container">
      
      <div className="ModalProyect-form">
        <form action="" onSubmit={saveProyect}>
          <div className="ModalProyect-form-Nombre">
            <label>Nombre del proyecto</label>
            <input
              type="text"
              value={proyectName}
              onChange={(e) => setproyectName(e.target.value)}
            />
          </div>

          <div className="ModalProyect-form-Description">
            <label>Description</label>
            <input
              name="proyectDescription"
              id="ProyectDesc"
              cols="30"
              rows="10"
              type="text"
              value={proyectDes}
              onChange={(e) => setproyectDes(e.target.value)}
            ></input>
          </div>

          <div className="ModalProyect-form-FechaIn">
            <label>Fecha Inicio</label>
            <input
              type="date"
              value={fechIn}
              onChange={(e) => setfechIn(e.target.value)}
            />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Fecha Final</label>
            <input
              type="date"
              value={fechFin}
              onChange={(e) => setfechFin(e.target.value)}
            />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Responsable</label>
            <input
              type="text"
              value={resp}
              onChange={(e) => setresp(e.target.value)}
            />
          </div>

          <div className="ModalProyect-form-Integrantes">
            <label>Integrantes</label>
            <div>
              <label>Número de integrantes:</label>
              <input
                type="number"
                name="numCasillas"
                onChange={handleNumCasillasChange}
              />
            </div>
          </div>
          {renderCasillasTexto()}

          <div className="ModalProyect-form-contenido"></div>

          <div className="ModalProyect-form-Integrantes-miembros">
            <label>Nombre ApellidoPaterno ApellidoMaterno</label>
            <div className="table-container">
              <table>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.nombreUsuario} </td>
                      <td>{user.apellidosUsuario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ModalProyect-form-Estado">
            <label>Estado</label>
            <div className="ModalProyect-form-Estado-values">
              <label>Activo</label>
              <input
                type="radio"
                id="activo"
                name="Estado"
                value="Activo"
                onChange={(e) => setstate(e.target.value)}
                required
              />
              <label>Pausado</label>
              <input
                type="radio"
                id="pausado"
                name="Estado"
                value="Pausado"
                onChange={(e) => setstate(e.target.value)}
              />
              <label>Finalizado</label>
              <input
                type="radio"
                id="finalizado"
                name="Estado"
                value="Finalizado"
                onChange={(e) => setstate(e.target.value)}
              />
            </div>
          </div>
          <div className="ModalProyect-form-Btn">
            <button>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
