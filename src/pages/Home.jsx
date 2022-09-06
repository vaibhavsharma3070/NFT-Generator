import React from "react";
import Header from "../components/Header";
import Meta from "../components/Meta";
import { GenerateApi } from "../Api/api";
import MenuLayout from "../components/MenuLayout";

const Home = () => {
  const token = localStorage.getItem("token");
  const pageTitle = "Home";

  const getImages = () => {
    GenerateApi().then((res) => {
      res.data.data.map((url) => download(url));
    });
  };

  const download = async (url) => {
    const originalImage = url;
    const image = await fetch(originalImage);

    //Split image name
    const nameSplit = originalImage.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  };

  return (<>
    <MenuLayout />
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
  </>
  );
};

export default Home;
