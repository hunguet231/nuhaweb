import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../actions/userActions";
import "./UserDetails.css";

function UserDetails({ match }) {
  const dispatch = useDispatch();

  const id = match.params.id;

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [match, dispatch]);

  return (
    <div className="user-details-wrapper">
      <h4>Shop: </h4>
    </div>
  );
}

export default UserDetails;
