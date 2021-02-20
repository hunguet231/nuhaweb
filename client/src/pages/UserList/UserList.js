import { Alert } from "@material-ui/lab";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Confirm } from "react-st-modal";
import { deleteUser, listUsers } from "../../actions/userActions";
import Spinner from "../../components/Spinner/Spinner";
import UserListTable from "../../components/UserListTable/UserListTable";

function UserList({ history }) {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.userList);

  const { success: successDelete } = useSelector((state) => state.userDelete);

  // user info
  const userLogin = useSelector((state) => state.userLogin);
  const googleLogin = useSelector((state) => state.googleLogin);

  const userInfo = googleLogin.userInfo
    ? googleLogin.userInfo
    : userLogin.userInfo;

  useEffect(() => {
    if (userInfo && userInfo.user.role === "admin") {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const getIds = async (ids) => {
    const isConfirm = await Confirm(
      "Bạn có chắc chắn muốn xoá những user này?"
    );
    if (isConfirm) {
      ids.forEach((id) => {
        dispatch(deleteUser(id));
      });
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <UserListTable users={users} ids={getIds} />
      )}
    </div>
  );
}

export default UserList;
