import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "./Admin.css";
import {
  ImageApi,
  saveDirectoryName,
  saveImageLimit,
  saveLayersOrder,
  UploadImages,
} from "../Api/api";

const Admin = () => {
  const token = localStorage.getItem("token");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
  });
  const [fileData, setFileData] = useState({});
  const [layerConfiguration, setLayerConfiguration] = useState({
    layersOrder: [],
    imageLimit: "",
  });

  useEffect(() => {
    setFileData(acceptedFiles);
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const selectedLayersOrder = (e) => {
    if (e.target.checked) {
      setLayerConfiguration({
        ...layerConfiguration,
        layersOrder: [
          ...layerConfiguration.layersOrder,
          { name: e.target.name },
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

  const layerOrder = [
    { name: "Background" },
    { name: "Eyeball" },
    { name: "Eye color" },
    { name: "Iris" },
    { name: "Shine" },
    { name: "Bottom lid" },
    { name: "Top lid" },
  ];

  const uploadImage = () => {
    let formData = new FormData();
    [...fileData].forEach((image) => {
      formData.append("uploaded_file", image);
    });
    const data = fileData;

    UploadImages(token, data)
      .then((res) => {
        console.log("Uploaded", res);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  };

  const handleChange = (e) => {
    setLayerConfiguration({
      ...layerConfiguration,
      [e.target.name]: e.target.value,
    });
  };

  const createDirectory = () => {
    const data = { directoryName: layerConfiguration.directoryName };
    console.log("createDirectory", data);
    saveDirectoryName(token, data)
      .then((res) => {
        console.log("directoryname", res);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  };

  const saveLayerOrder = () => {
    const data = { layersOrder: layerConfiguration.layersOrder };
    console.log("saveLayerOrder", data);
    saveLayersOrder(token, data)
      .then((res) => {
        console.log("layerOrder", res);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  };

  const SubmitImageNumber = () => {
    const data = { imageLimit: layerConfiguration.imageLimit };
    console.log("SubmitImageNumber", data);
    saveImageLimit(token, data)
      .then((res) => {
        console.log("imagenumber", res);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <Form.Label>Layer type name</Form.Label>
              <Form.Control
                type="text"
                name="directoryName"
                onChange={(e) => handleChange(e)}
                placeholder=" Name..."
              />
              <Button className="nft-btn my-2" onClick={() => createDirectory()}>
                create
              </Button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <div
                {...getRootProps({ className: "dropzone" })}
                style={{ cursor: "pointer" }}
              >
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>

              <Button className="upload-image my-2" onClick={uploadImage}>
                Upload
                <input
                  type="file"
                  {...getInputProps()}
                  style={{ display: "block" }}
                />
              </Button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              {layerOrder.map((data) => (
                <>
                  {/* <Form.Label for={data.name}> {data.name}</Form.Label> */}
                  <Form.Check
                    label={data.name}
                    type="checkbox"
                    id={data.name}
                    name={data.name}
                    value={data.name}
                    onClick={(e) => selectedLayersOrder(e)}
                  />
                </>
              ))}
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

              <Button className="my-2" onClick={() => SubmitImageNumber()}>submit</Button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default Admin;
