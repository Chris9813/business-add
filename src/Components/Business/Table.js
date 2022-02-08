import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  businessStartDelete,
  businessStartLoading,
  businessStartUpdate,
  eventStartAddNew,
} from "../../actions/business";
import { BusinessCard } from "./BusinessCard";

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
    borderRadius: "12px",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

export const Table = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { business } = useSelector((state) => state.businessScreen);
  console.log(business);
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  const styles = useStyles();

  const [modalInst, setModalInst] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tableView, setTableView] = useState(true);

  const [itemSelect, setItemSelect] = useState({
    name: "",
    businessId: 0,
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

  const postData = async () => {
    dispatch(eventStartAddNew({ name: itemSelect.name }));
    openCloseModal();
  };

  const putData = async () => {
    dispatch(
      businessStartUpdate(itemSelect.businessId, {
        name: itemSelect.name,
      })
    );
    openCloseModalEdit();
  };

  const deleteData = async () => {
    dispatch(businessStartDelete(itemSelect.businessId));
    openCloseModalDelete();
  };

  const selectItem = (item, cas) => {
    setItemSelect(item);
    cas === "editar" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const handleInfo = (item) => {
    history.push(`/business/${item.businessId}`);
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Item</h3>
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Title"
        name="name"
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

      <br />
      <TextField
        className={styles.inputMaterial}
        label="Title"
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
    dispatch(businessStartLoading());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <div className="d-flex justify-content-start">
        <h2>Business</h2>
        <div className="col-10 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-dark my-2 mx-2"
            style={{ borderRadius: "12px" }}
            onClick={() => openCloseModal()}
          >
            Create Business
          </button>
          <button className="btn" onClick={() => setTableView(!tableView)}>
            <i className="fas fa-vector-square fa-2x"></i>
          </button>
        </div>
      </div>
      <hr />
      {tableView ? (
        <MaterialTable
          data={business}
          columns={columns}
          title="Business"
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
            {
              icon: "search",
              tooltip: "Info",
              onClick: (evento, rowData) => handleInfo(rowData),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      ) : (
        business.map((item, i) => <BusinessCard item={item} key={i} />)
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
