import React from "react";
import { Drawers } from "components/Drawer";
import { DefaultLayout } from "components/Layouts/DefaultLayout";
import { CreateProject } from "pages/CreateProject";
import { Login } from "pages/Login";
import { Profile } from "pages/Profile";
import { ProjectDetail } from "pages/ProjectDetail";
import { ProjectManagement } from "pages/ProjectManagement";
import { Register } from "pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ModalDetail } from "components/models/modal";

function App() {
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
}

export default App;
