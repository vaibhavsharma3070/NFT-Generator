import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageApi, UploadImages } from "../Api/api";

const Admin = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
  });
  console.log("acceptedFiles", acceptedFiles);
  const [fileData, setFileData] = useState({});

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

  return (
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
  );
};
export default Admin;
