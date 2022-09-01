import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageApi, UploadImages } from "../Api/api";

const Admin = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
  });
  console.log("acceptedFiles", acceptedFiles);
  const [fileData, setFileData] = useState({});
  const [layerConfiguration, setLayerConfiguration] = useState({ layersOrder: [] })
  useEffect(() => {
    setFileData(acceptedFiles);
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => {
    // console.log("file", file);
    // setFileData(file);
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });

  const selectedLayersOrder = (e) => {
    if (e.target.checked) {
      setLayerConfiguration({ ...layerConfiguration, layersOrder: [...layerConfiguration.layersOrder, { name: e.target.name }] })
    }
    else {
      const temp = { ...layerConfiguration }
      const index = layerConfiguration.layersOrder.findIndex((data) => data.name === e.target.name)
      temp.layersOrder.splice(index, 1)
      // setLayerConfiguration({ ...layerConfiguration, [layerConfiguration.layersOrder: temp })
    }
  }

  const layerOrder = [
    { name: "Background" },
    { name: "Eyeball" },
    { name: "Eye color" },
    { name: "Iris" },
    { name: "Shine" },
    { name: "Bottom lid" },
    { name: "Top lid" },
  ]

  const uploadImage = () => {
    let formData = new FormData();

    [...fileData].forEach((image) => {
      formData.append("uploaded_file", image);
    })
    const token = localStorage.getItem("token");
    const data = fileData;

    UploadImages(token, data)
      .then((res) => {
        console.log("Uploaded", res);
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
    // ImageApi(fileData).then((res) => console.log("res->", res));
  };
  console.log("fileData", fileData);

  return (<>
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input type="file" {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <button onClick={uploadImage}>Upload</button>
    </section>
    <section>
      {layerOrder.map((data) => (<>
        <input type="checkbox" id={data.name} name={data.name} value={data.name} onClick={(e) => selectedLayersOrder(e)} />
        <label for={data.name}> {data.name}</label><br />
      </>))}
      <input type="submit"
        // onClick={() => saveLayersOrder()}
        value="Submit" />
    </section>
  </>
  );
};
export default Admin;
