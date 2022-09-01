import axios from "axios";

// 192.168.0.79
// 104.167.236.3
export const SignUpApi = (data) =>
  axios.post(`http://104.167.236.3:3005/api/auth/signup`, data);
export const LoginApi = (data) =>
  axios.post(`http://104.167.236.3:3005/api/auth/login`, data);
export const GenerateApi = (token) =>
  axios.get(`http://104.167.236.3:3005/api/user/generate`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
      accept: "application/json",
    },
  });
export const UploadImages = (token, data) =>
  axios.get(
    `http://104.167.236.3:3005/api/user/storeImage`,
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
