import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <p>Assignment visualizer</p>
      <Outlet />
    </div>
  );
}
