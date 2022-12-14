import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Login from "./pages/Login";
import ProjectsPage from "./pages/Projects";
import Register from "./pages/Register";
import TeamsPage from "./pages/Teams";


function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication...</div>
  ) : (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <PrivateRoute>
                <TeamsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
