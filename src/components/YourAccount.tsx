import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";
import { IUser } from "../interfaces/user";

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

  // console.log(formData)

  // function handleChange(e: any) {
  //   const fieldName = e.target.name;
  //   const newFormData = structuredClone(formData);
  //   newFormData[fieldName as keyof typeof formData] = e.target.value;
  //   setFormData(newFormData);
  // }

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

  // console.log("formData is: ", formData);

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="has-text-success is-size-4 mb-6">Your account</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name={"username"}
                  // onChange={handleChange}
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
                  // onChange={handleChange}
                  value={formData?.email}
                  required
                  disabled
                />
              </div>
            </div>
            {/* <div className="field">
              <label className="label">Password (minimum 10 characters, including 1 uppercase letter)</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name={"password"}
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirm password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name={"password_confirmation"}
                  onChange={handleChange}
                  value={formData.password_confirmation}
                  required
                />
              </div>
            </div> */}
            <button className="button has-background-danger has-text-white">
              Delete Account
            </button>
            <p className="has-text-danger is-size-7 mt-2">
              WARNING: Deleting your account will also delete all of the groups
              associated with your account
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default YourAccount;
