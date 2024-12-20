import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/home/Home";
import Notes from "./components/note/Notes";
import CreateNote from "./components/note/CreateNote";
import EditNote from "./components/note/EditNote";
import ViewNote from "./components/note/viewNote/ViewNote";
import Registration from "./components/Registration/Registration";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import NotFound from "./components/notFound/NotFound";
import Header from "./components/wrapper/header/Header";
import Footer from "./components/wrapper/footer/Footer";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { Provider } from "react-redux";
import store from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <HeaderWrapper />
          <Routes>
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route
              path="/notes"
              element={<PrivateRoute element={<Notes />} />}
            />
            <Route
              path="/create-note"
              element={<PrivateRoute element={<CreateNote />} />}
            />
            <Route
              path="/edit-note/:id"
              element={<PrivateRoute element={<EditNote />} />}
            />
            <Route
              path="/notes/:id"
              element={<PrivateRoute element={<ViewNote />} />}
            />
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  // Показываем Header только на защищенных маршрутах
  const showHeader =
    location.pathname !== "/login" && location.pathname !== "/";

  return showHeader ? <Header /> : null;
};

export default App;
