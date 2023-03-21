import React, { useEffect, useState } from "react";
import "../../style/Admin/recuadro.css";
import { ModalProyect } from "./modalAdmin";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const urlus = "http://localhost:4000/api/users";

export function Recuadro() {
  const [idModificar, setIdModificar] = useState(null);

  const [Proyects, setProyects] = useState([]);

  const [modal, setModal] = useState(false);

  const getUsers = async () => {
    const response = await axios.get(urlus);
    setUsers(response.data);
  };

  const [users, setUsers] = useState([]);
  const [numCasillas, setNumCasillas] = useState(0);

  const modalInsertar = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getUsers();
  }, [users]);

  useEffect(() => {
    getProyects();
  }, [Proyects]);

  const getProyects = async () => {
    const response = await axios.get("http://localhost:4000/api/proyects");
    setProyects(response.data);
  };

  const deleteProyects = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/proyects/${id}`);
      getProyects();
    } catch (error) {
      console.log(error);
    }
  };

  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    images: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (idModificar !== null) {
      const indexModificar = Proyects.findIndex(
        (Proyects) => Proyects._id === idModificar
      );
      const nuevosDatos = [...Proyects];
      nuevosDatos[indexModificar] = formValues;
      setProyects(nuevosDatos);
      setIdModificar(null);
    } else {
      setProyects((prevState) => [...prevState, formValues]);
    }
    setFormValues({ id: 0, name: "", description: "", price: 0, images: "" });
  };

  const [mostrar, setMostrarProyect] = useState(false);

  const [contenido, setContenido] = useState(false);

  const [Inter, setprojectIntegrante] = useState([]);

  function otroProyecto() {
    setMostrarProyect(true);
    setContenido(true);
    console.log(Proyects.length);
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  const [form, setForm] = useState({
    tipoModal: "actualizar",
    _id: "",
    proyectName: "",
    proyectDes: "",
    fechIn: "",
    fechFin: "",
    resp: "",
    state: "",
    Integrantes: Inter
  });


  const seleccionarIntegrante = (integrante) => {
    setForm({
      tipoModal: "actualizar",
      _id: integrante._id,
      proyectName: integrante.nombreUsuario,
      proyectDes: integrante.apellidosUsuario,
      fechIn: integrante.rol,
      fechFin: integrante.correo,
      resp: integrante.password,
      state: integrante.estado,
      Integrantes: integrante.Inter
    });
  };

  const saveProyect = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/proyects", form);
    } catch (error) {
      console.log(error);
    }
  };

  function handleNumCasillasChange(e) {
    setNumCasillas(Number(e.target.value));
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
            value={Inter[i]?.name || ""}
            onChange={(e) => {
              const nuevosIntegrantes = [...Inter];
              nuevosIntegrantes[i] = { name: e.target.value };
              setprojectIntegrante(nuevosIntegrantes);
              console.log(Inter);
            }}
          />
        </div>
      );
    }
    return casillasTexto;
  }



  return (
    <div className="Recuadro-contenedor container">
      <div className="Recuadro-Proyectos">
        <h2 className="Recuadro-Proyectos-titulo">Proyectos</h2>
        <hr className="Recuadro-hr" />
      </div>
      <div className="Recuadro-contenido">
        {Proyects.length == 0 ? (
          <div className="Recuadro-contenido-sinContenido">
            <button
              className="Recuadro-contenido-sinContenido-boton"
              onClick={otroProyecto}
            >
              {" "}
              AGREGAR{" "}
            </button>
          </div>
        ) : (
          <div className="Recuadro-contenido-conContenido position-relative">
            <Table className="form-table" striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Final</th>
                  <th>Encargado</th>
                  <th>Estado</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Proyects.map((Proyects, index) => (
                  <tr key={index}>
                    <td>{Proyects.proyectName}</td>
                    <td>{Proyects.fechIn}</td>
                    <td>{Proyects.fechFin}</td>
                    <td>{Proyects.resp}</td>
                    <td>{Proyects.state}</td>
                    <td>
                      <button
                        className="icon-pen"
                        onClick={() => setIdModificar(Proyects._id)}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="icon-trash"
                        onClick={() => deleteProyects(Proyects._id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button
              className="btn btn-success position-absolute end-0"
              onClick={() => modalInsertar()}
            >
              Agregar
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={modal}>
        <ModalHeader style={{ display: "block" }}>
        <button className="btn position-absolute start-0" onClick={() => modalInsertar()}>
            <i
              class="fa-solid fa-circle-xmark"
              style={{ fontSize: "1.6em", color:"#db1009" }}
            ></i>
          </button>
          <br />
          <h2 className="ModalProyect-titulo">Creando proyecto</h2>
        </ModalHeader>
        <ModalBody>
        <div className="ModalProyect-form">
        <form action="" onSubmit={saveProyect}>
          <div className="ModalProyect-form-Nombre">
            <label>Nombre del proyecto</label>
            <input
              type="text"

              onChange={handleChange}
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

              onChange={handleChange}
            ></input>
          </div>

          <div className="ModalProyect-form-FechaIn">
            <label>Fecha Inicio</label>
            <input
              type="date"

              onChange={handleChange}
            />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Fecha Final</label>
            <input
              type="date"

              onChange={handleChange}
            />
          </div>

          <div className="ModalProyect-form-FechaFin">
            <label>Responsable</label>
            <input
              type="text"

              onChange={handleChange}
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
                onChange={handleChange}
                required
              />
              <label>Pausado</label>
              <input
                type="radio"
                id="pausado"
                name="Estado"
                value="Pausado"
                onChange={handleChange}
              />
              <label>Finalizado</label>
              <input
                type="radio"
                id="finalizado"
                name="Estado"
                value="Finalizado"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="ModalProyect-form-Btn" onClick={() => modalInsertar()}>
            <button>Guardar</button>
          </div>
        </form>
        </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}
