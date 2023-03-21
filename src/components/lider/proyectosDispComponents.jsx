import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import "../../style/Creator/integrantesCreator.css";

export function ProyectDisponibles() {
    

  const [rows, setRows] = React.useState([]);
  
  React.useEffect(() => {
    fetch('/api/users/') //URL de listado de productos
    .then((response) => response.json())
    .then((data) => {
       console.log(data);
       setRows(data); //
    })
    .catch((err) => {
       console.log(err.message);
    });  }, []);


  console.log("Integrantes: ", rows);

  const [idModificar, setIdModificar] = useState(null);

  const [formValues, setFormValues] = useState({
    nombreUsuario: "",
    apellidosUsuario: "",
    rol: "",
    correo: "",
    password: "",
    estado: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (idModificar !== null) {
      const indexModificar = rows.findIndex((row) => row.id === idModificar);
      const nuevosDatos = [...rows];
      nuevosDatos[indexModificar] = formValues;
      setRows(nuevosDatos);
      setIdModificar(null);
    } else {
      setRows((prevState) => [...prevState, formValues]);
    }
    setFormValues({
      nombreUsuario: "",
      apellidosUsuario: "",
      rol: "",
      correo: "",
      password: "",
      estado: "",
    });
  };

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setRows(data);
  };

  const eliminarDato = async (id) => {
    // const nuevosDatos = rows.filter((row) => row.id !== id);
    // setRows(nuevosDatos);
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
    console.log(id)
    if (response.ok) {
      fetchUsers(); // Actualizamos la lista de usuarios después de eliminar uno
    }
  };

  return (
    <div class="Formulario contenido">
      <div class="form">
        <h1 class="form-titulo">Integrantes</h1>
        <hr className="Recuadro-hr" />
        <div class="formulario">
          <Table className="form-table" striped bordered hover responsive>
            <thead>
              <tr>
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
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.nombreUsuario}</td>
                  <td>{row.apellidosUsuario}</td>
                  <td>{row.rol}</td>
                  <td>{row.correo}</td>
                  <td>{row.password}</td>
                  <td>{row.estado}</td>
                  <td>
                    <button
                      className="icon-pen"
                      onClick={() => setIdModificar(row._id)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="icon-trash"
                      onClick={() => eliminarDato(row._id)}
                    >
                      <i className="fa-regular fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
