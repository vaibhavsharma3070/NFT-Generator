import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
// Layout
import Layout from "./layout/Layout";
// pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admin from "./pages/Admin";
import { PublicRoute } from "./PublicRoute/PublicRoute";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import { ProtectedAdminRoute } from "./ProtectedRoute/ProtectedAdminRoute";
import { ProtectedUserRoute } from "./ProtectedRoute/ProtectedUserRoute";
import UserTable from "./pages/UserTable";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
  return (
    <Layout>
      <Container>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<ProtectedUserRoute />}>
              <Route path="/user/home" element={<Home />} />
            </Route>
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin/home" element={<Admin />} />
              <Route path="/change-password" element={<ForgetPassword />} />
              <Route path="/admin/usersData" element={<UserTable />} />
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route index path="/" element={<Login />} />
            {/* <Route index path="/" element={<SignUp />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </  Layout>
  );
};

export default App;