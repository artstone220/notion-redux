import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserLoading,
} from "../../redux/slices/userSlice/userSelector";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const loading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.id || user === undefined) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default PrivateRoute;
