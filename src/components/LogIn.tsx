import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";

function LogIn( { fetchUser }: {fetchUser: Function }) {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [errorMessage, setErrorMessage] = useState("")

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", resp.data.token);
      console.log("resp.data is: ", resp.data);
      fetchUser()
      navigate("/");
    } catch (e: any) {
      console.log(e)
      // setErrorMessage(e.response.data.message)
    }
  }

  console.log("formData is: ", formData);

  return (
    <>
      <div className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name={"email"}
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name={"password"}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              {/* {errorMessage && <small className="has-text-danger">{errorMessage}</small>} */}
            </div>
            <button className="button has-background-success has-text-white">
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
