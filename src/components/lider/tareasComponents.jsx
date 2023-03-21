import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "../../style/Creator/integrantesCreator.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

const url = "http://localhost:4000/api/tasks";

const proyect = "http://localhost:4000/api/proyects";

export function FormularioTarea() {
  const [resp, setResp] = useState("1234");

  const [proyectName, setName] = useState();

  const [proy, setProy] = useState([]);

  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    nombreProyecto: "",
    nombreTarea: "",
    descripcion: "",
    fechaEntrega: "",
    estado: "",
    responsable: "",
  });

  const peticionPost = () => {
    axios
      .post(url, form)
      .then((response) => {
        modalInsertar();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionPut = () => {
    axios.put(url + "/" + form._id, form).then((response) => {
      modalInsertar();
    });
  };

  const peticionDelete = () => {
    axios.delete(url + "/" + form._id).then((response) => {});
  };

  const seleccionarTarea = (tarea) => {
    setForm({
      tipoModal: "actualizar",
      _id: tarea._id,
      nombreTarea: tarea.nombreTarea,
      descripcion: tarea.descripcion,
      fechaEntrega: tarea.fechaEntrega,
      estado: tarea.estado,
      responsable: tarea.responsable,
    });
  };

  const modalInsertar = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, [modalInsertar]);

  useEffect(() => {
    axios.get(proyect).then((response) => {
      setProy(response.data);
      if (resp == proy[0].resp) {
        setName(proy[0].proyectName);
      }
    });
  }, [modalInsertar]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };

  return (
    <div class="Formulario contenido ">
      <div class="form">
        <h1 class="form-titulo">Integrantes</h1>
        <hr className="Recuadro-hr" />
        <div class="formulario position-relative">
          <Table className="form-table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>fecha Registro</th>
                <th>fecha Entrega</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tarea) => {
                return (
                  <tr key={tarea.id}>
                    <td>{tarea._id}</td>
                    <td>{tarea.nombreTarea}</td>
                    <td>{tarea.descripcion}</td>
                    <td>{tarea.createdAt}</td>
                    <td>{tarea.fechaEntrega}</td>
                    <td>{tarea.estado}</td>
                    <td>{tarea.responsable}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          seleccionarTarea(tarea);
                          modalInsertar();
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          seleccionarTarea(tarea);
                          peticionDelete();
                        }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <button
            className="btn btn-success position-absolute end-0"
            onClick={() => {
              setForm({
                form: null,
                tipoModal: "insertar",
                nombreProyecto: proyectName,
              });
              modalInsertar();
            }}
          >
            Agregar
          </button>
        </div>
      </div>

      <Modal isOpen={modal} className="position-relative">
        <ModalHeader style={{ display: "block" }}>
          <button className="btn position-absolute end-0" onClick={() => modalInsertar()}>
            <i
              class="fa-solid fa-circle-xmark"
              style={{ fontSize: "1.6em", color:"#db1009" }}
            ></i>
          </button>
          <br />
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="nombreProyecto">Id</label>
            <input
              className="form-control"
              type="text"
              name="nombreProyecto"
              id="nombreProyecto"
              onChange={handleChange}
              readOnly
              value={proyectName}
            />
            <br />
            <label htmlFor="nombreTarea">Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombreTarea"
              id="nombreTarea"
              onChange={handleChange}
              value={form ? form.nombreTarea : ""}
            />
            <br />
            <label htmlFor="descripcion">Descripción</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              id="descripcion"
              onChange={handleChange}
              value={form ? form.descripcion : ""}
            />
            <br />
            <label htmlFor="fechaEntrega">fechaEntrega</label>
            <input
              className="form-control"
              type="date"
              name="fechaEntrega"
              id="fechaEntrega"
              onChange={handleChange}
              value={form ? form.fechaEntrega : ""}
            />
            <br />
            <label htmlFor="estado">Estado</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="estado"
              id="estado"
              onChange={handleChange}
              value={form ? form.estado : ""}
            >
              <option selected>Open this select menu</option>
              <option value="Activo">Activo</option>
              <option value="Pausado">Pausado</option>
              <option value="Pausado">Terminado</option>
            </select>
            <br />
            <label htmlFor="responsable">Responsable</label>
            <input
              className="form-control"
              type="text"
              name="responsable"
              id="responsable"
              onChange={handleChange}
              value={form ? form.responsable : ""}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          {form.tipoModal == "insertar" ? (
            <button className="btn btn-success" onClick={() => peticionPost()}>
              Insertar
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => peticionPut()}>
              Actualizar
            </button>
          )}
          <button className="btn btn-danger" onClick={() => modalInsertar()}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
