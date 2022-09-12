import React, { useEffect, useState } from 'react'
import { Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { getUserList, userStatus } from '../Api/api';
import MenuLayout from '../components/MenuLayout';

const UserTable = () => {
    const [userList, setUserList] = useState([])
    const [toast, setToast] = useState({ show: '', message: '', event: '' });

    useEffect(() => {
        getUserList()
            .then((res) => {
                console.log("UserList", res.data.data);
                setUserList(res.data.data)
            })
            .catch((error) => {
                console.log("error --> ", error);
                setToast({ message: error.message, show: true, event: "danger", position: "top-center" });
            });
    }, [])

    const updateUserStatus = (id, status_Info, index) => {
        const data = { status: status_Info }
        console.log("updateUserStatus", id, data)
        userStatus(data, id)
            .then((res) => {
                console.log("updateUserStatus", res.data.data);
                const temp = [...userList]
                setToast({ message: res.data.message, show: true, event: "success", position: "top-center" });
                temp[index].user_is_active = res.data.data
                console.log("temp", temp);
                setUserList(temp)
            })
            .catch((error) => {
                console.log("error --> ", error);
                setToast({ message: error.message, show: true, event: "danger", position: "top-center" });
            });
    }
    return (
        <>
            <MenuLayout admin="usertable" />
            <ToastContainer className="p-3" position={toast?.position}>
                <Toast onClose={() => setToast({ ...toast, show: false })} show={toast?.show} bg={toast?.event} autohide>
                    <Toast.Body className='text-white'>
                        {toast.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            {userList?.length !== 0 ? (
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {userList?.map((data, index) => (<>
                        <tbody>
                            <tr>
                                <th scope="row">{data.user_id}</th>
                                <td>{data.user_firstname}</td>
                                <td>{data.user_lastname}</td>
                                <td>{data.user_email}</td>
                                <td>{data.user_roles}</td>
                                <td>{data?.user_is_active ? "Active" : "Deactive"}</td>
                                <td><span>
                                    {data?.user_is_active ? <Button className="my-2" onClick={() => updateUserStatus(data.user_id, false, index)} >Deactive</Button> : <Button className="my-2" onClick={() => updateUserStatus(data.user_id, true, index)} >Active</Button>}
                                </span></td>
                            </tr>
                        </tbody>
                    </>))}
                </table>) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}


        </>
    )
}

export default UserTable