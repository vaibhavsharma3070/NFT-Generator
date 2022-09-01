import { Container } from "react-bootstrap";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// Layout
import Layout from "./layout/Layout";
// pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admin from "./pages/Admin";

const App = () => {
  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/Login" />;
  };

  return (
    <Layout>
      <Container>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} exact />
            <Route path="/Admin" element={<Admin />} exact />
          </Route>
          {/* <Route element={<PublicRoute />}> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<SignUp />} />

          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Layout>
  );
};

export default App;
