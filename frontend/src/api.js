export async function getAssignment(assignmentId) {
  return {
    driverA: [
      { lat: 52.23, lon: 21.03 },
      { lat: 52.21, lon: 21.06 },
    ],
    driverB: [
      { lat: 52.15, lon: 21.03 },
      { lat: 52.22, lon: 21.02 },
    ],
  };
}

export async function getAssignmentIds() {
  return ["abc", "def"];
}
