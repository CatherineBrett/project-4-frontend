import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../config";

function AddGroup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brief_desc: "",
    full_desc: "",
    contact_name: "",
    contact_number: "",
    // categories: []
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.post(`${baseUrl}/groups`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/groups");
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Group name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"name"}
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Image URL</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"image"}
                onChange={handleChange}
                value={formData.image}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Please give a brief description of your group
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"brief_desc"}
                maxLength={30}
                onChange={handleChange}
                value={formData.brief_desc}
              />
            </div>
          </div>
          {/* TO-DO: A user should be able to select up to 3 options. Also need to make changes on the backend 
          so that this question can be submitted along with the other data on the form (the group model doesn't 
          know about categories, which are part of a different many-to-many relationship.) */}
          {/* <div className="mb-5">
            <label className="label">
              Please select up to three categories which best describe your
              group's activities
            </label>
            <div className="select">
              <select defaultValue={""} onChange={handleChange} name={"category"}>
                <option value="" disabled>--Select--</option>
                <option value="arts-and-crafts">Arts & Crafts</option>
                <option value="culture">Culture</option>
                <option value="education">Education</option>
                <option value="excursions">Excursions</option>
                <option value="fitness">Fitness</option>
                <option value="outdoors">Outdoors</option>
                <option value="reading">Reading</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div> */}
          <div className="field">
            <label className="label">
              Tell us a bit more about the group, including when you meet and
              how often
            </label>
            <div className="control">
              <textarea
                className="textarea"
                rows={2}
                name={"full_desc"}
                maxLength={200}
                onChange={handleChange}
                value={formData.full_desc}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contact name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"contact_name"}
                onChange={handleChange}
                value={formData.contact_name}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Contact number</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"contact_number"}
                onChange={handleChange}
                value={formData.contact_number}
              />
            </div>
          </div>
          <button className="button has-background-success has-text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGroup;
