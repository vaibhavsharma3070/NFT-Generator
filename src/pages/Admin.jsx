import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./Admin.css";
import {
  getImageLimit,
  getLayersOrder,
  saveDirectoryName,
  saveImageLimit,
  saveLayersOrder,
  UploadImages,
  deleteLayer
} from "../Api/api";
import MenuLayout from "../components/MenuLayout";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
let count = 0
const Admin = () => {
  const token = localStorage.getItem("token");
  const [layerOrder, setLayerOrder] = React.useState([])
  const [formError, setFormError] = useState({});
  const [formImageError, setFormImageError] = useState();
  const [fileData, setFileData] = useState([]);
  const [toast, setToast] = useState({ show: '', message: '', event: '' });
  const [layerConfiguration, setLayerConfiguration] = useState({
    layersOrder: [],
    imageLimit: "",
    directoryName: ""
  });

  useEffect(() => {
    getLayersOrder()
      .then((res) => {
        setLayerOrder(res.data.data)
        setLayerConfiguration({ ...layerConfiguration, layersOrder: res.data.data })
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
    getImageLimit()
      .then((res) => {
        setLayerConfiguration({ ...layerConfiguration, imageLimit: res.data.data[0].Config_growEditionSizeTo })
        console.log("getImageLimit --> ", res.data.data[0].Config_growEditionSizeTo);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  }, [])

  const selectedLayersOrder = (e, index) => {
    const temp = layerOrder;
    temp[index].layertype_selected = e.target.checked
    setLayerOrder(temp);
  };

  const onImageChange = (e) => {
    setFileData(e.target.files)
  }

  const handleChange = (e) => {
    setLayerConfiguration({
      ...layerConfiguration,
      [e.target.name]: e.target.value,
    });
  };

  const createDirectory = () => {
    const data = { name: layerConfiguration.directoryName };
    let error = {};
    let isValidData = true;
    if (layerConfiguration.directoryName === "") {
      error = { directoryName: `Please enter Layer Type Name` };
      isValidData = false;
    }
    setFormError({ ...error });
    if (isValidData) {
      saveDirectoryName(data)
        .then((res) => {
          console.log("directoryname", res.data.data);
          setLayerOrder([...layerOrder, { layertype_id: res.data.data.id, layertype_name: res.data.data.name, layertype_selected: res.data.data.selected }])
          setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
        })
        .catch((error) => {
          console.log("error --> ", error);
          setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
        });
    }
  };

  const uploadImage = () => {
    let error = {};
    let isValidData = true;
    if (fileData.length === 0) {
      error = { fileData: `Please select atleast 1 image` };
      isValidData = false;
    }
    setFormImageError({ ...formImageError, ...error });
    if (isValidData) {
      setFormImageError({})
      let formData = new FormData();
      [...fileData].forEach((image) => {
        formData.append("uploaded_file", image);
      });
      const data = formData;
      UploadImages(data)
        .then((res) => {
          console.log("Uploaded", res);
          setToast({
            message: res.data.message, show: true, event: "success", position: "top-center"
          });
        })
        .catch((error) => {
          console.log("error --> ", error);
          setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
        });
    }
  };

  const deleteLayerInfo = (data) => {
    const deleteData = data.layertype_id
    console.log("deleteLayer", deleteData)
    deleteLayer(deleteData)
      .then((res) => {
        const temp = [...layerOrder]
        const index = temp.findIndex((data) => data.layertype_id === deleteData)
        temp.splice(index, 1)
        console.log("temp", temp, index)
        setLayerOrder(temp)
        setToast({
          message: res.data.message, show: true, event: "success", position: "top-center"
        });
      })
      .catch((error) => {
        console.log("error --> ", error);
        setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
      });
  };

  function checkFalseValue(el, index, arrData) {
    return el.layertype_selected === false
  }

  const saveLayerOrder = () => {
    count = 0
    const data = layerOrder;
    let error = {};
    let isValidData = true;
    let check = data.every(checkFalseValue)
    console.log("data", data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].layertype_selected === true) {
        count++
      }
    }
    if (check) {
      error = { layersOrder: `Please select layer order` };
      isValidData = false;
    }
    else if (count < 5) {
      error = { layersOrder: `Please select atleast 5 layer order` };
      isValidData = false;
    }
    setFormImageError({})
    setFormError(error);
    if (isValidData) {
      saveLayersOrder(data)
        .then((res) => {
          console.log("layerOrder", res);
          setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
        })
        .catch((error) => {
          console.log("error --> ", error);
          setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
        });
    }
  };

  const SubmitImageNumber = () => {
    const data = { number: parseInt(layerConfiguration.imageLimit) };
    let error = {};
    let isValidData = true;
    if (layerConfiguration.imageLimit.length === 0) {
      error = { imageLimit: `Image length is required` };
      isValidData = false;
    }
    setFormImageError({})
    setFormError(error);
    if (isValidData) {
      saveImageLimit(data)
        .then((res) => {
          console.log("imagenumber", res);
          setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
        })
        .catch((error) => {
          console.log("error --> ", error.message);
          setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
        });
    }
  };

  return (
    <>
      <MenuLayout admin="admin" />
      <ToastContainer className="p-3" position={toast?.position}>
        <Toast onClose={() => setToast({ ...toast, show: false })} show={toast?.show} bg={toast?.event} autohide>
          <Toast.Body className='text-white'>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <div>
                <Form.Label>Layer type name</Form.Label>
                <Form.Control
                  type="text"
                  name="directoryName"
                  onChange={(e) => handleChange(e)}
                  placeholder=" Please enter name...."
                />
                {formError?.directoryName && (
                  <p className="text-danger">{formError?.directoryName}</p>
                )}
              </div>
              <div style={{ marginTop: "25px" }}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Upload images</Form.Label>
                  <Form.Control type="file" multiple onChange={(e) => onImageChange(e)} />
                </Form.Group>
                {formImageError && (
                  <p className="text-danger">{formImageError?.fileData}</p>
                )}
                <Button className="upload-image my-2" onClick={() => { uploadImage(); createDirectory(); }}>
                  Create & Upload
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              {layerOrder.length === 0 ?
                (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                )
                : (
                  <>   {layerOrder?.map((data, index) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Form.Check
                        label={data.layertype_name}
                        type="checkbox"
                        defaultChecked={data.layertype_selected}
                        id={data.name}
                        name={data.layertype_name}
                        value={data.name}
                        onClick={(e) => selectedLayersOrder(e, index)}
                      />
                      <div style={{ cursor: "pointer", color: "red" }} onClick={() => deleteLayerInfo(data)}>
                        Delete
                      </div>
                    </div>
                  ))}
                    {formError?.layersOrder && (
                      <p className="text-danger">{formError?.layersOrder}</p>
                    )}
                    <Button className="my-2" onClick={saveLayerOrder}>Submit</Button></>)}

            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <Form.Label>Enter number of image length</Form.Label>
              <Form.Control
                type="text"
                name="imageLimit"
                placeholder="Please enter image length...."
                value={layerConfiguration?.imageLimit}
                onChange={(e) => handleChange(e)}
              />
              {formError?.imageLimit && (
                <p className="text-danger">{formError?.imageLimit}</p>
              )}
              <Button className="my-2" onClick={() => SubmitImageNumber()}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
