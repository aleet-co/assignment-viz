export async function getAssignment(assignmentId) {
  return fetch(`http://localhost:8000/${assignmentId}`);
}

export async function getAssignmentIds() {
  return fetch("http://localhost:8000/");
}
