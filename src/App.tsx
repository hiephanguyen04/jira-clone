import { Drawers } from "components/Drawer";
import { DefaultLayout } from "components/Layouts/DefaultLayout";
import { ModalDetail } from "components/models/modal";
import { CreateProject } from "pages/CreateProject";
import { Home } from "pages/Home";
import { Login } from "pages/Login";
import { Profile } from "pages/Profile";
import { ProjectDetail } from "pages/ProjectDetail";
import { ProjectManagement } from "pages/ProjectManagement";
import { Register } from "pages/Register";
import React from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Drawers />
        <ModalDetail />
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Outlet />
              </DefaultLayout>
            }
          >
            <Route index element={<ProjectManagement />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="project-managers" element={<ProjectManagement />} />
            <Route path="home" element={<Home />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route
              path="project-detail/:idProject"
              element={<ProjectDetail />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
