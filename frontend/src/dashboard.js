import { Link, useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const assignments = useLoaderData();
  return (
    <div>
      <p>Found assignments</p>
      <ul>
        {assignments.map((x) => (
          <li key={x}>
            {" "}
            <Link to={`/${x}`}> {x}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  return ["abc", "def"];
}
