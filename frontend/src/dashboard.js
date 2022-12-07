import { Link, useLoaderData } from "react-router-dom";

import { getAssignmentIds } from "./api";

export default function Dashboard() {
  const assignments = useLoaderData();
  return (
    <div>
      <p>Found assignments</p>
      <ul>
        {assignments.map((x) => (
          <li key={x}>
            {" "}
            <Link to={`/${encodeURIComponent(x)}`}>{x}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  return getAssignmentIds();
}
