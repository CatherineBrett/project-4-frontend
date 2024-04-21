import { useEffect, useState, SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../config";
import axios from "axios";

interface IFormState {
  name: string;
  image: string;
  brief_desc: string;
  full_desc: string;
  contact_name: string;
  contact_number: string;
  categories: Array<string>;
}

function EditGroup() {
  const { groupId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormState>({
    name: "",
    image: "",
    brief_desc: "",
    full_desc: "",
    contact_name: "",
    contact_number: "",
    categories: [],
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  function handleCheckboxChange(e: any) {
    const newFormData = structuredClone(formData);
    const categoriesArray = newFormData["categories"];
    if (e.target.checked) {
      newFormData["categories"] = [...categoriesArray, e.target.value];
    } else {
      newFormData["categories"] = categoriesArray.filter((category) => {
        return category !== e.target.value;
      });
    }
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (formData.categories.length < 1) {
      return;
    }
    const token = localStorage.getItem("token");
    const resp = await axios.put(`${baseUrl}/groups/${groupId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate(`/groups/${groupId}`);
  }

  useEffect(() => {
    async function fetchGroup() {
      const resp = await fetch(`${baseUrl}/groups/${groupId}`);
      const groupData = await resp.json();
      const groupToEdit = {
        name: groupData.name,
        image: groupData.image,
        brief_desc: groupData.brief_desc,
        full_desc: groupData.full_desc,
        contact_name: groupData.contact_name,
        contact_number: groupData.contact_number,
        categories: groupData.categories.map((item: any) => {
          return item.category.name;
        }),
      };
      setFormData(groupToEdit);
    }
    fetchGroup();
  }, []);

  console.log(formData);

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">
              Group name
            </label>
            <div className="control">
              <input
                className="input"
                id="name"
                type="text"
                name={"name"}
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="image" className="label">
              Image URL
            </label>
            <div className="control">
              <input
                className="input"
                id="image"
                type="text"
                name={"image"}
                onChange={handleChange}
                value={formData.image}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="brief_desc" className="label">
              Please give a brief description of your group
            </label>
            <div className="control">
              <input
                className="input"
                id="brief_desc"
                type="text"
                name={"brief_desc"}
                maxLength={30}
                onChange={handleChange}
                value={formData.brief_desc}
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <p className="label">
              Please the categories that best describe your
              group's activities
            </p>
            <div>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Arts & Crafts"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Arts & Crafts")}
                />
                Arts & Crafts
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Culture"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Culture")}
                />
                Culture
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Education"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Education")}
                />
                Education
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Excursions"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Excursions")}
                />
                Excursions
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Fitness"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Fitness")}
                />
                Fitness
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Outdoors"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Outdoors")}
                />
                Outdoors
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Reading"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Reading")}
                />
                Reading
              </label>
              <label className="checkbox mr-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  value="Social"
                  onChange={handleCheckboxChange}
                  checked={formData["categories"].includes("Social")}
                />
                Social
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="full_desc" className="label">
              Tell us a bit more about the group, including when you meet and
              how often
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id="full_desc"
                rows={2}
                name={"full_desc"}
                maxLength={200}
                onChange={handleChange}
                value={formData.full_desc}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact_name" className="label">
              Contact name
            </label>
            <div className="control">
              <input
                className="input"
                id="contact_name"
                type="text"
                name={"contact_name"}
                onChange={handleChange}
                value={formData.contact_name}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="contact_number" className="label">
              Contact number
            </label>
            <div className="control">
              <input
                className="input"
                id="contact_number"
                type="text"
                name={"contact_number"}
                onChange={handleChange}
                value={formData.contact_number}
                required
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

export default EditGroup;
