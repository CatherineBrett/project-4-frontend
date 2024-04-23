import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import { IUser } from "../interfaces/user";
import youraccountpeep from "../assets/youraccountpeep.png"

function YourAccount({
  user,
  setUser,
}: {
  user: null | IUser;
  setUser: Function;
}) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  const [formData, setFormData] = useState(user);

  async function deleteUser() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/users/` + user?.id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logOut();
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    deleteUser();
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column p-6">
              <h1 className="title has-text-success is-size-4 mb-6">
                Your account
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name={"username"}
                      value={formData?.username}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name={"email"}
                      value={formData?.email}
                      required
                      disabled
                    />
                  </div>
                </div>
                <button className="button has-background-danger has-text-white mt-4">
                  Delete
                </button>
                <p className="has-text-danger is-size-7 mt-3">
                  WARNING: Deleting your account will also delete all groups associated with your account
                </p>
              </form>
            </div>
            <div className="column is-flex is-justify-content-center">
              <img src={youraccountpeep} className="youraccountpeep mt-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default YourAccount;
