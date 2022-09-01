import React from "react";
import Header from "../components/Header";
import Meta from "../components/Meta";
import { GenerateApi } from "../Api/api";

const Home = () => {
  const token = localStorage.getItem("token");
  const pageTitle = "Home";

  const getImages = () => {
    GenerateApi(token).then((res) => {
      res.data.data.map((url) => download(url));
    });
  };

  const download = (url) => {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window?.URL.createObjectURL(new Blob([buffer]));
          const link = document?.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <button
          id="downloadImage"
          className="btn btn-primary"
          style={{ textAlign: "center" }}
          onClick={getImages}
        >
          Generate and Download Images
        </button>
      </div>
      <br />
      <span style={{ display: "flex", justifyContent: "center" }}>
        Try again if images are not downloaded automatically.
      </span>
    </div>
  );
};

export default Home;
