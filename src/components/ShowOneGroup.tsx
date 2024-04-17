import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IGroup } from "../interfaces/group";
import { ICategory } from "../interfaces/category";
import Group from "./Group";
import Category from "./Category";

function ShowOneGroup() {
  const [group, setGroup] = useState<IGroup | null>(null);
  const { groupId } = useParams();

  useEffect(() => {
    async function fetchGroup() {
      const resp = await fetch(`/api/groups/${groupId}`);
      const groupData = await resp.json();
      setGroup(groupData);
    }
    fetchGroup();
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="p-6">{group && <Group key={group.id} {...group} />}</div>
              
            </div>
            <div className="column">
              <p className="p-6">{group?.full_desc}</p>
              <p className="pl-6"><span className="has-text-weight-bold">Contact:</span> {group?.contact_name}</p>
              <p className="pl-6 mt-3 mb-6"><span className="has-text-weight-bold">Phone no:</span> {group?.contact_number}</p>
              {group?.categories.map((category) => {
                  return <div className="pl-6">
                    <Category
                      key={category.category.id}
                      id={category.category.id}
                      name={category.category.name}
                    />
                  </div>
                })}
            </div>
          </div>
        </div>
      </section>
      <section className="section"></section>
    </>
  );
}

export default ShowOneGroup;
