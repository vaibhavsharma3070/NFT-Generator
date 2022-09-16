// import axios from "axios";
import axios from "../axiosConfig";
// 192.168.0.79
// 104.167.236.3
export const SignUpApi = (data) => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, data);
  }
  catch (error) {
    console.log("SignUpApi--error-->", error)
  }
}
export const LoginApi = (data) => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data);
  }
  catch (error) {
    console.log("LoginApi--error-->", error)
  }
}
export const ForgetPasswordApi = (data) => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/changepassword`, data);
  }
  catch (error) {
    console.log("ForgetPasswordApi--error-->", error)
  }
}

export const GenerateApi = () => {
  try {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/user/generate`);
  }
  catch (error) {
    console.log("GenerateApi--error-->", error)
  }
}

export const UploadImages = (data) => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/admin/storeImage`, data);
  }
  catch (error) {
    console.log("UploadImages--error-->", error)
  }
}

export const deleteLayer = (data) => {
  try {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/deletelayer/` + data);
  }
  catch (error) {
    console.log("deleteLayer--error-->", error)
  }
}

export const getUserList = (data) => {
  try {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/admin/userlist`, data);
  }
  catch (error) {
    console.log("getUserList--error-->", error)
  }
}

export const saveDirectoryName = (data) => {
  try {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/admin/savelayer`, data);
  }
  catch (error) {
    console.log("saveDirectoryName--error-->", error)
  }
}


export const getLayersOrder = (data) => {
  try {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/admin/layertypelist`, data);
  }
  catch (error) {
    console.log("getLayersOrder--error-->", error)
  }
}

export const saveLayersOrder = (data) => {
  try {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/admin/updatelayer`, data);
  }
  catch (error) {
    console.log("saveLayersOrder--error-->", error)
  }
}
export const saveImageLimit = (data) => {
  try {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/config/updateconfig`, data);
  }
  catch (error) {
    console.log("saveImageLimit--error-->", error)
  }
}
export const getImageLimit = (data) => {
  try {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/config/getConfig`, data);
  }
  catch (error) {
    console.log("getImageLimit--error-->")
  }
}
export const userStatus = (data, id) => {
  try {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/admin/delete/${id}`, data);
  }
  catch (error) {
    console.log("getImageLimit--error-->")
  }
}

/* return axios({ method: 'put', url:  `${process.env.REACT_APP_BASE_URL}/config/updateconfig` + `${process.env.REACT_APP_BASE_URL}/config/updateconfig`, headers: { 'Authorization': 'Bearer ' + accessToken, "content-type": "application/json",
          accept: "application/json", } },data) */


// export const ImageApi = (data) => {
//   console.log("data", data);

//   [...data].forEach((image) => {
//     console.log("image", image);
//     formData.append("uploaded_file", image);
//     console.log("formData--->", formData);
//   });
// };
