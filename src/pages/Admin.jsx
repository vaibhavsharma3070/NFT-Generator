import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "./Admin.css";
import {
  getLayersOrder,
  ImageApi,
  saveDirectoryName,
  saveImageLimit,
  saveLayersOrder,
  UploadImages,
} from "../Api/api";
import MenuLayout from "../components/MenuLayout";

const Admin = () => {
  const token = localStorage.getItem("token");
  const [layerOrder, setLayerOrder] = React.useState()
  const [formError, setFormError] = useState({});
  const [formImageError, setFormImageError] = useState();
  const [fileData, setFileData] = useState([]);
  const [layerConfiguration, setLayerConfiguration] = useState({
    layersOrder: [],
    imageLimit: "",
    directoryName: ""
  });

  useEffect(() => {
    getLayersOrder(token)
      .then((res) => {
        setLayerOrder(res.data.data)
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  }, [])

  const selectedLayersOrder = (e) => {
    if (e.target.checked) {
      setLayerConfiguration({
        ...layerConfiguration,
        layersOrder: [
          ...layerConfiguration.layersOrder,
          parseInt(e.target.value),
        ],
      });
    } else {
      const temp = { ...layerConfiguration };
      const index = layerConfiguration.layersOrder.findIndex(
        (data) => data.name === e.target.name
      );
      temp.layersOrder.splice(index, 1);
      setLayerConfiguration({
        ...layerConfiguration,
        layersOrder: [...temp.layersOrder],
      });
    }
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
      saveDirectoryName(token, data)
        .then((res) => {
          console.log("directoryname", res);
        })
        .catch((error) => {
          console.log("error --> ", error);
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
      UploadImages(token, data)
        .then((res) => {
          console.log("Uploaded", res);
        })
        .catch((error) => {
          console.log("error --> ", error);
        });
    }
  };

  const saveLayerOrder = () => {
    const data = { status: true, id: layerConfiguration.layersOrder };
    let error = {};
    let isValidData = true;
    if (layerConfiguration.imageLimit.length === 0) {
      error = { layersOrder: `Please select layer order` };
      isValidData = false;
    }
    setFormImageError({})
    setFormError(error);
    if (isValidData) {
      saveLayersOrder(token, data)
        .then((res) => {
          console.log("layerOrder", res);
        })
        .catch((error) => {
          console.log("error --> ", error);
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
      saveImageLimit(token, data)
        .then((res) => {
          console.log("imagenumber", res);
        })
        .catch((error) => {
          console.log("error --> ", error);
        });
    }
  };

  return (
    <>
      <MenuLayout />
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
                  placeholder=" Name..."
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
              {layerOrder?.map((data) => (
                <>
                  {/* <Form.Label for={data.name}> {data.name}</Form.Label> */}
                  <Form.Check
                    label={data.layertype_name}
                    type="checkbox"
                    id={data.name}
                    name={data.layertype_name}
                    value={data.layertype_id}
                    onClick={(e) => selectedLayersOrder(e)}
                  />
                </>
              ))}
              {formError?.layersOrder && (
                <p className="text-danger">{formError?.layersOrder}</p>
              )}
              <Button className="my-2" onClick={() => saveLayerOrder()}>submit</Button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <Form.Label>Enter number of image length</Form.Label>
              <Form.Control
                type="text"
                name="imageLimit"
                placeholder="5"
                onChange={(e) => handleChange(e)}
              />
              {formError?.imageLimit && (
                <p className="text-danger">{formError?.imageLimit}</p>
              )}
              <Button className="my-2" onClick={() => SubmitImageNumber()}>submit</Button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default Admin;
