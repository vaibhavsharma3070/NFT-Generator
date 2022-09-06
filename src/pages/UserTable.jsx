import React, { useEffect, useState } from 'react'
import { Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { getUserList } from '../Api/api';
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
                            <th scope="col">Active</th>
                        </tr>
                    </thead>
                    {userList?.map((data) => (<>
                        <tbody>
                            <tr>
                                <th scope="row">{data.user_id}</th>
                                <td>{data.user_firstname}</td>
                                <td>{data.user_lastname}</td>
                                <td>{data.user_email}</td>
                                <td>{data.user_roles}</td>
                                <td>{data?.user_is_active ? "true" : false}</td>
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