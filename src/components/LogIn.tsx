import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";
import loginpeep from "../assets/loginpeep.png";

function LogIn({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorData, setErrorData] = useState("");

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    setErrorData("");
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", resp.data.token);
      console.log("resp.data is: ", resp.data);
      fetchUser();
      navigate("/groups");
    } catch (e: any) {
      console.log(e);
      setErrorData(e.response.data.message);
    }
  }

  console.log("formData is: ", formData);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column p-6">
              <h1 className="title has-text-success is-size-4 mb-6">Log in</h1>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name={"email"}
                      onChange={handleChange}
                      value={formData.email}
                      required
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
                      required
                    />
                  </div>
                  {errorData && (
                    <p className="has-text-danger mt-2 is-size-7">
                      {errorData}
                    </p>
                  )}
                </div>
                <button className="button has-background-success has-text-white mt-4">
                  Log in
                </button>
              </form>
              <p className="mt-4">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
            <div className="column is-flex is-justify-content-center">
              <img src={loginpeep} className="loginpeep mt-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
