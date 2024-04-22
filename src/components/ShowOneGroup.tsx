import { useState, useEffect, SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IGroup } from "../interfaces/group";
import { ICategory } from "../interfaces/category";
import { IUser } from "../interfaces/user";
import Group from "./Group";
import Category from "./Category";
import axios from "axios";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

function ShowOneGroup({ user }: { user: null | IUser }) {
  const [group, setGroup] = useState<IGroup | null>(null);
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroup() {
      const resp = await fetch(`${baseUrl}/groups/${groupId}`);
      const groupData = await resp.json();
      setGroup(groupData);
    }
    fetchGroup();
  }, []);

  async function deleteGroup(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/groups/` + groupId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/groups");
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="p-6">
                {group && <Group key={group.id} {...group} />}
              </div>
            </div>
            <div className="column">
              <p>{group?.full_desc}</p>
              <p className="mt-4">
                <span className="has-text-weight-bold">Contact:</span>{" "}
                {group?.contact_name}
              </p>
              <p className="mt-2">
                <span className="has-text-weight-bold">Phone no:</span>{" "}
                {group?.contact_number}
              </p>
              <div className="mt-4">
                {group?.categories.map((category) => {
                  return (
                    <div className="mt-2">
                      <Category
                        key={category.category.id}
                        id={category.category.id}
                        name={category.category.name}
                      />
                    </div>
                  );
                })}
              </div>
              {group &&
                user &&
                (user.id === group.user_id ||
                  user.username === "adminuser") && (
                  <div className="mt-6">
                    {user.id === group.user_id && (
                      <Link
                        to={"/groups/edit-group/" + groupId}
                        className="button is-warning mr-5"
                      >
                        Update
                      </Link>
                    )}
                    <button onClick={deleteGroup} className="button is-danger">
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
      <section className="section"></section>
    </>
  );
}

export default ShowOneGroup;
