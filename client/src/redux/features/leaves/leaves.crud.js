async function makeApiRequest(endpoint, data, errorMessage) {
  try {
    return await fetch(`/api/leaves/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(`${errorMessage}, `, error);
  }
}

export async function getLeaves(data) {
  return makeApiRequest(
    "get",
    data,
    "cannot find leaves data for this employee"
  );
}

export async function applyLeaves(data) {
  return makeApiRequest("apply", data, "cannot apply for a leave now");
}

export async function approveLeaves(data) {
  return makeApiRequest("approve", data, "cannot find the corresponding leave");
}

export async function deleteLeaves(data) {
  return makeApiRequest(
    "delete",
    data,
    "cannot delete the corresponding leave"
  );
}
