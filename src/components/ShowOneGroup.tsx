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
              {group && <Group key={group.id} {...group} />}
              {group &&
                group.categories.map((category) => {
                  return (
                    <Category
                      key={category.category.id}
                      id={category.category.id}
                      name={category.category.name}
                    />
                  );
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
