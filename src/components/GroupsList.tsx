import { useState, useEffect } from "react";
import Group from "./Group";
import { IGroup } from "../interfaces/group";

type Groups = null | Array<IGroup>;

function GroupsList() {
  const [groups, setGroups] = useState<Groups>(null);

  useEffect(() => {
    async function fetchGroups() {
      const resp = await fetch("/api/groups");
      const data = await resp.json();
      setGroups(data);
    }
    fetchGroups();
  }, []);

  console.log(groups);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {groups?.map((group) => {
            return <Group key={group.id} {...group} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default GroupsList;
