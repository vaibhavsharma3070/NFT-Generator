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
  GenerateApi,
  deleteLayer
} from "../Api/api";
import MenuLayout from "../components/MenuLayout";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

let count = 0

const Admin = () => {
  const token = localStorage.getItem("token");
  const [layerOrder, setLayerOrder] = React.useState([])
  const [formError, setFormError] = useState({});
  const [formImageError, setFormImageError] = useState();
  const [fileData, setFileData] = useState([]);
  const [generateLoader, setGenerateLoader] = useState(false);
  const [toast, setToast] = useState({ show: '', message: '', event: '' });
  const [layerConfiguration, setLayerConfiguration] = useState({
    layersOrder: [],
    imageLimit: "",
    directoryName: ""
  });
  const [dataItems, setDataItems] = useState([])

  useEffect(() => {
    getLayersOrder()
      .then((res) => {
        const temp1 = []
        const temp2 = []
        res.data.data.map((data) => {
          if (data?.layertype_selected === false) {
            temp1.push(data)
          }
          else if (data?.layertype_selected === true) {
            temp2.push(data)
          }
        })
        const tempData = {
          layers: {
            id: 'layers',
            list: temp1
          },
          selected: {
            id: 'selected',
            list: temp2
          }
        }
        setDataItems(tempData)
        // res.data.data.map((item) => {
        //     tempData[item.name] = res.data.data
        // })

        setLayerOrder(res.data.data)
        setLayerConfiguration({ ...layerConfiguration, layersOrder: res.data.data })
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
    getImageLimit()
      .then((res) => {
        setLayerConfiguration({ ...layerConfiguration, imageLimit: res.data.data[0].config_growEditionSizeTo })
      })
      .catch((error) => {
        console.log("error --> ", error);
      });
  }, [])

  // const selectedLayersOrder = (e, index) => {
  //   const temp = layerOrder;
  //   temp[index].layertype_selected = e.target.checked
  //   setLayerOrder(temp);
  // };

  const onImageChange = (e) => {
    setFileData(e.target.files)
  }

  const handleChange = (e) => {
    setLayerConfiguration({
      ...layerConfiguration,
      [e.target.name]: e.target.value,
    });
  };

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    // Set start and end variables
    const start = dataItems[source.droppableId]
    const end = dataItems[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_, idx) => idx !== source.index
      )

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      }

      // Update the state
      setDataItems(state => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_, idx) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      // Update the state
      setDataItems(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }))
      return null
    }
  }

  const createDirectory = () => {
    const data = { name: layerConfiguration.directoryName };
    let error = {};
    let isValidData = true;
    if (layerConfiguration.directoryName === "") {
      error = { directoryName: `Please enter Layer Type Name` };
      isValidData = false;
    }
    else {
      error = { directoryName: `` };
      isValidData = true;
    }
    setFormError({ ...error });
    if (isValidData && fileData.length !== 0) {
      saveDirectoryName(data)
        .then((res) => {
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
    else {
      error = { fileData: `` };
      isValidData = true;
    }
    setFormImageError({ ...formImageError, ...error });
    if (isValidData && layerConfiguration.directoryName !== "") {
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
    const temp = [...layerOrder]
    const index = temp.findIndex((data) => data.layertype_id === deleteData)
    temp.splice(index, 1)
    setLayerOrder(temp)
    deleteLayer(deleteData)
      .then((res) => {
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
    const data1 = dataItems?.layers?.list;
    const data2 = dataItems?.selected?.list;

    let temp1 = []
    for (let index = 0; index < data1.length; index++) {
      data1[index].layertype_selected = false
    }
    for (let index = 0; index < data2.length; index++) {
      data2[index].layertype_selected = true

    }
    temp1 = [...data2, ...data1]
    const data = temp1
    count = 0
    let error = {};
    let isValidData = true;
    let check = data.every(checkFalseValue)
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
    else {
      error = { layersOrder: `` };
      isValidData = true;
    }
    setFormImageError({})
    setFormError(error);
    if (isValidData) {
      saveLayersOrder(data)
        .then((res) => {
          setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
        })
        .catch((error) => {
          console.log("error --> ", error);
          setToast({ message: error.message, show: true, event: "danger", position: "top-end" });
        });
    }
  };

  const getImages = () => {
    setGenerateLoader(true)
    GenerateApi().then((res) => {
      setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
      res.data.data.map((url) => download(url));
      setGenerateLoader(false)
    })
    .catch((error) => {
        console.log("error --> ", error);
        setGenerateLoader(false)
        setToast({ message: error.message, show: true, event: "danger", position: "bottom-end" });
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


  const SubmitImageNumber = () => {
    const data = { number: parseInt(layerConfiguration.imageLimit) };
    let error = {};
    let isValidData = true;
    if (layerConfiguration.imageLimit.length === 0) {
      error = { imageLimit: `Image length is required` };
      isValidData = false;
    }
    else {
      error = { imageLimit: `` };
      isValidData = true;
    }
    setFormImageError({})
    setFormError(error);
    if (isValidData) {
      saveImageLimit(data)
        .then((res) => {
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
                <Form.Label style={{color:'white'}}>Layer type name</Form.Label>
                <Form.Control
                  type="text"
                  name="directoryName"
                  onChange={(e) => handleChange(e)}
                  placeholder=" Please enter name...."
                />
                {formError?.directoryName && (
                  <p className="text-danger" >{formError?.directoryName}</p>
                )}
              </div>
              <div style={{ marginTop: "25px" }}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label style={{color:'white'}}>Upload images</Form.Label>
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
                  <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                )
                : (
                  <>   {layerOrder?.map((data, index) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <span style={{color:'white'}}>{data.layertype_name}</span> 
                      </div>
                      {/* <Form.Check
                        label={data.layertype_name}
                        type="checkbox"
                        defaultChecked={data.layertype_selected}
                        id={data.name}
                        name={data.layertype_name}
                        value={data.name}
                        onClick={(e) => selectedLayersOrder(e, index)}
                      /> */}
                      <div style={{ cursor: "pointer", color: "red" }} onClick={() => deleteLayerInfo(data)}>
                        Delete
                      </div>
                    </div>
                  ))}
                  </>)}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <Form.Label style={{color:'white'}}>Enter number of image length</Form.Label>
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
          <div className="col-lg-4">
            <div className="nft-machine-box">
              <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "100px 0" }}
              >
                {generateLoader ? (<>
                  <Spinner animation="border" variant="primary" />
                </>) : (<>  <button
                  id="downloadImage"
                  className="btn btn-primary"
                  style={{ textAlign: "center" }}
                  onClick={getImages}
                >
                  Generate and Download Images
                </button></>)}

              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="nft-machine-box">
              {dataItems.length === 0 ? (<div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                <Spinner animation="border" variant="primary" />
              </div>) : (
                <><DragDropContext onDragEnd={onDragEnd}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {Object.values(dataItems)?.map((data, index) => (
                      <Droppable droppableId={data?.id}>
                        {(provided) => (
                          <div className="col-lg-5" style={{ marginRight: "25px", }} >
                            <h2 style={{color:'white'}}>{data?.id}</h2>
                            <div style={{ backgroundColor: "#ef88b3", minHeight: "180px", borderRadius: "8px", padding: "20px" }} {...provided.droppableProps} ref={provided.innerRef}>
                              {data.list.map((text, index) => (
                                <Draggable draggableId={text?.layertype_name} index={index} key={text?.layertype_name} >
                                  {provided => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div style={{ border: "2px solid black", marginTop: "10px", fontSize: "16px" ,borderRadius:"10px" }}>
                                       <span style={{color:'black',padding:"0px 20px"}}>{text?.layertype_name}</span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                </DragDropContext>
                  {formError?.layersOrder && (
                    <p className="text-danger">{formError?.layersOrder}</p>
                  )}
                  <Button className="my-2" onClick={saveLayerOrder}>Submit</Button></>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
