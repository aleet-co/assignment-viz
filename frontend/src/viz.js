import { useLoaderData } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Map, { Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";

import { getAssignment } from "./api";

const MapViz = ({ data }) => {
  const CENTER = { lat: 52.23, lon: 21.03 };
  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        latitude: CENTER.lat,
        longitude: CENTER.lon,
        zoom: 12,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      {data.map(({ lon, lat, color }, i) => (
        <Marker key={i} longitude={lon} latitude={lat} color={color} />
      ))}
    </Map>
  );
};

export default function Viz() {
  const assignment = useLoaderData();

  const colors = ["red", "green", "blue", "yellow", "pink", "cyan"];
  const driverToColor = Object.fromEntries(
    Object.keys(assignment).map((driverId, i) => [
      driverId,
      colors[i % colors.length],
    ])
  );

  const data = Object.entries(assignment)
    .map(([driverId, tasks]) =>
      tasks.map((task) => ({ color: driverToColor[driverId], ...task }))
    )
    .flat();

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 1200,
        }}
      >
        <MapViz data={data} />
      </Paper>
    </div>
  );
}

export async function loader({ params }) {
  return getAssignment(params.id);
}
