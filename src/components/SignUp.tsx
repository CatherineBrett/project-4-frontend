import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  console.log(formData)

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const resp = await axios.post(`${baseUrl}/signup`, formData);
    console.log("resp.data is: ", resp.data);
    navigate("/login");
  }

  console.log("formData is: ", formData);

  return (
    <>
      <div className="section">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name={"username"}
                  onChange={handleChange}
                  value={formData.username}
                  required
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
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>
            <div className="field">
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
            </div>
            <button className="button has-background-success has-text-white">
              Sign up
            </button>
          </form>
          <p className="mt-4">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
