import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export const Table = ({ item }) => {
  const columns = [
    {
      title: "Name",
      field: "name",
    },
  ];

  const styles = useStyles();

  const [data, setData] = useState([]);
  const [modalInst, setModalInst] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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

  const getData = async () => {
    await axios
      .get(
        "https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business",
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(res.data.businesses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postData = async () => {
    await axios
      .post(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business`,
        {
          name: itemSelect.name,
        },
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(data.concat(res.data));
        getData();
        openCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const putData = async () => {
    await axios
      .put(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${itemSelect.businessId}`,
        {
          name: itemSelect.name,
        },
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        },
        itemSelect
      )
      .then((res) => {
        let dataNew = data;
        dataNew.map((item) => {
          if (item.businessId === itemSelect.businessId) {
            item.name = itemSelect.name;
          }
        });
        setData(dataNew);
        openCloseModalEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteData = async () => {
    console.log(itemSelect.businessId);
    await axios
      .delete(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${itemSelect.businessId}`,
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(
          data.filter((item) => item.businessId !== itemSelect.businessId)
        );
        openCloseModalDelete();
      })
      .catch((error) => {
        console.error(error);
      });
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
        Estás seguro que deseas eliminar el item
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
    getData();
  }, [setModalEdit]);

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
          Create Business
        </button>
        <button className="btn mt-1">
          <i className="fas fa-vector-square fa-2x"></i>
        </button>
      </div>
      <MaterialTable
        data={data}
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
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
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
