import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  eventStartAddNew,
  eventStartUpdate,
  eventStartLoading,
  eventStartDelete,
} from "../../actions/events";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

export const TableNameScreen = () => {
  const { events } = useSelector((state) => state.business);
  console.log(events);
  const history = useHistory();
  const { businessId } = useParams();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Role",
      field: "role",
    },
  ];

  const styles = useStyles();

  const [data, setData] = useState([]);
  const [modalInst, setModalInst] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tableView, setTableView] = useState(true);

  const [itemSelect, setItemSelect] = useState({
    email: "",
    name: "",
    phone: 0,
    role: "",
    join_date: 0,
    personId: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openCloseModal = () => {
    setModalInst(!modalInst);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const getData = async () => {
    dispatch(eventStartLoading(businessId));
    /*
    await axios
      .get(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${businessId}/persons`,
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(res.data.persons);
        dispatch(eventStartLoading(res.data.persons));
      })
      .catch((error) => {
        console.error(error);
      });
      */
  };

  const postData = async () => {
    console.log(itemSelect);
    dispatch(
      eventStartAddNew(
        {
          email: itemSelect.email,
          name: itemSelect.name,
          phone: itemSelect.phone,
          role: itemSelect.role,
          join_date: itemSelect.join_date,
        },
        businessId
      )
    );
    openCloseModal();
    getData();
  };

  const putData = async () => {
    const data = {
      email: itemSelect.email,
      name: itemSelect.name,
      phone: itemSelect.phone,
      role: itemSelect.role,
      join_date: itemSelect.join_date,
    };
    dispatch(eventStartUpdate(businessId, itemSelect.personId, data));
    openCloseModalEdit();
  };

  const deleteData = async () => {
    dispatch(eventStartDelete(businessId, itemSelect.personId));
    openCloseModalDelete();
  };

  const selectItem = (item, cas) => {
    setItemSelect(item);
    cas === "editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Item</h3>
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Email"
        name="email"
        onChange={handleInputChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={handleInputChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Phone"
        name="phone"
        onChange={handleInputChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Role"
        name="role"
        onChange={handleInputChange}
      />
      <TextField
        className={styles.inputMaterial}
        label="Join Date"
        name="join_date"
        onChange={handleInputChange}
      />
      <br />
      <div align="right">
        <Button
          className="insert-button"
          color="primary"
          onClick={() => postData()}
        >
          Insertar
        </Button>
        <Button onClick={() => openCloseModal()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Edit Item</h3>
      <TextField
        className={styles.inputMaterial}
        label="Name"
        name="name"
        onChange={handleInputChange}
        value={itemSelect && itemSelect.name}
      />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => putData()}>
          Editar
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar el item{" "}
        <b>{itemSelect && itemSelect.name}</b>?
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteData()}>
          Sí
        </Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  );

  useEffect(() => {
    eventStartLoading(businessId);
    getData();
  }, []);

  return (
    <div style={{ maxWidth: "100%" }}>
      <hr />
      <div className="col-sm-5 d-flex justify-content-start">
        <button
          type="button"
          className="btn btn-dark my-4 mx-2"
          style={{ borderRadius: "12px" }}
          onClick={() => openCloseModal()}
        >
          Create Person
        </button>
        <button
          className="btn mt-1 pb-4"
          onClick={() => setTableView(!tableView)}
        >
          <i className="fas fa-vector-square fa-2x"></i>
        </button>
      </div>

      {tableView ? (
        <MaterialTable
          data={events}
          columns={columns}
          title="BusinessName"
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Item",
              onClick: (evento, rowData) => selectItem(rowData, "editar"),
            },
            {
              icon: "delete",
              tooltip: "Delete Item",
              onClick: (evento, rowData) => selectItem(rowData, "eliminar"),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      ) : (
        events.map((item) => (
          <div className="d-flex row-cols-1">
            <div className="row row-cols-1 row-cols-lg-2 g-3 g-lg-2 my-3">
              <div className="card col">
                <div className="p-3">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {item.role}
                    </h6>
                    <p className="card-text">{item.email}</p>
                    <p className="card-text">{item.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Modal open={modalInst} onClose={openCloseModal}>
        {bodyInsertar}
      </Modal>
      <Modal open={modalEdit} onClose={openCloseModalEdit}>
        {bodyEdit}
      </Modal>
      <Modal open={modalDelete} onClose={openCloseModalDelete}>
        {bodyEliminar}
      </Modal>
    </div>
  );
};
