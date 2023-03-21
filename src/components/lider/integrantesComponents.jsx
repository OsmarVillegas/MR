import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../style/Creator/integrantesCreator.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

const url = "http://localhost:4000/api/users";

export function FormularioIntegrantes() {
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    tipoModal: "actualizar",
    usuarioId: "",
    nombreUsuario: "",
    apellidosUsuario: "",
    rol: "",
    correo: "",
    password: "",
    estado: "",
  });

  const seleccionarIntegrante = (integrante) => {
    setForm({
      tipoModal: "actualizar",
      _id: integrante._id,
      nombreUsuario: integrante.nombreUsuario,
      apellidosUsuario: integrante.apellidosUsuario,
      rol: integrante.rol,
      correo: integrante.correo,
      password: integrante.password,
      estado: integrante.estado,
    });
  };

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

  const modalInsertar = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
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
    <div class="Formulario contenido">
      <div class="form">
        <h1 class="form-titulo">Integrantes</h1>
        <hr className="Recuadro-hr" />
        <div class="formulario position-relative">
          <Table className="form-table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Password</th>
                <th>Estado</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((integrante) => {
                return (
                  <tr key={integrante.id}>
                    <td>{integrante._id}</td>
                    <td>{integrante.nombreUsuario}</td>
                    <td>{integrante.apellidosUsuario}</td>
                    <td>{integrante.rol}</td>
                    <td>{integrante.correo}</td>
                    <td>{integrante.password}</td>
                    <td>{integrante.estado}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          seleccionarIntegrante(integrante);
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
                          seleccionarIntegrante(integrante);
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
              });
              modalInsertar();
            }}
          >
            Agregar
          </button>
          <Modal isOpen={modal}>
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
                <label htmlFor="">Id</label>
                <input
                  className="form-control"
                  type="number"
                  name="usuarioId"
                  id="usuarioId"
                  onChange={handleChange}
                  value={form ? form.usuarioId : data.length + 1}
                />
                <br />
                <label htmlFor="nombreUsuario">Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombreUsuario"
                  id="nombreUsuario"
                  onChange={handleChange}
                  value={form ? form.nombreUsuario : ""}
                />
                <br />
                <label htmlFor="apellidosUsuario">Apellidos</label>
                <input
                  className="form-control"
                  type="text"
                  name="apellidosUsuario"
                  id="apellidosUsuario"
                  onChange={handleChange}
                  value={form ? form.apellidosUsuario : ""}
                />
                <br />
                <label htmlFor="rol">Rol</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="rol"
                  id="rol"
                  onChange={handleChange}
                  value={form ? form.rol : ""}
                >
                  <option selected>Open this select menu</option>
                  <option value="Miembro">Miembro</option>
                  <option value="Lider">Lider</option>
                </select>

                <br />
                <label htmlFor="correo">Correo</label>
                <input
                  className="form-control"
                  type="text"
                  name="correo"
                  id="correo"
                  onChange={handleChange}
                  value={form ? form.correo : ""}
                />
                <br />
                <label htmlFor="password">Contraseña</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={form ? form.password : ""}
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
                  <option value="Suspendido">Suspendido</option>
                </select>
              </div>
            </ModalBody>
            <ModalFooter>
              {form.tipoModal == "insertar" ? (
                <button
                  className="btn btn-success"
                  onClick={() => peticionPost()}
                >
                  Insertar
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => peticionPut()}
                >
                  Actualizar
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}
