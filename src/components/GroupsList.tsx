import { useState, useEffect } from "react";
import Group from "./Group";
import { IGroup } from "../interfaces/group";
import { baseUrl } from "../config";

type Groups = null | Array<IGroup>;

function GroupsList() {
  const [groups, setGroups] = useState<Groups>(null);

  useEffect(() => {
    async function fetchGroups() {
      const resp = await fetch(`${baseUrl}/groups`);
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
            return (
              <div className="column is-one-quarter-desktop is-one-third-tablet">
                <Group key={group.id} {...group} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GroupsList;
