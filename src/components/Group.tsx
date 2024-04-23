import { Link } from "react-router-dom";
import { IGroup } from "../interfaces/group";

function Group({ id, name, image, brief_desc }: IGroup) {
  return (
    <Link to={`/groups/${id}`}>
      <div className="card">
        <div className="card-header">
          <div className="card-header-title is-centered">{name}</div>
        </div>
        <div className="card-image">
          <figure className="image image-is-1by1">
            <img src={image} alt={"Image to illustrate group's activity"} />
          </figure>
        </div>
        <div className="card-content has-text-centered">
          <p className="brief-desc has-text-weight-semibold">{brief_desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default Group;
