import { useLoaderData } from "react-router-dom";

export default function Viz() {
  const assignment = useLoaderData();
  return (
    <div>
      <p>Viz</p>
      <code>{JSON.stringify(assignment)}</code>
    </div>
  );
}

export async function loader() {
  return { driverA: [{ lat: 52.14, lon: 26.1 }] };
}
