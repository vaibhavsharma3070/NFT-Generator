import axios from "axios";

// 192.168.0.79
// 104.167.236.3
export const SignUpApi = (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, data);
export const LoginApi = (data) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data);
export const GenerateApi = (token) =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/user/generate`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      accept: "application/json",
    },
  });

export const UploadImages = (token, data) =>
  axios.get(
    `${process.env.REACT_APP_BASE_URL}/user/storeImage`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    },
    data
  );

export const saveDirectoryName = (token, data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/directoryName`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    },
    data
  );

export const saveLayersOrder = (token, data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/layersOrder`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    },
    data
  );
export const saveImageLimit = (token, data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/imageLimit`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    },
    data
  );


// export const ImageApi = (data) => {
//   console.log("data", data);

//   [...data].forEach((image) => {
//     console.log("image", image);
//     formData.append("uploaded_file", image);
//     console.log("formData--->", formData);
//   });
// };
