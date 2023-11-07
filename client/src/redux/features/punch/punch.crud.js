export async function getPunch(data) {
  try {
    console.log("getPunch:", data);
    return await fetch("/api/punch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("didnt ", error);
  }
}

export async function punchInReq(data) {
  return await fetch("/api/punch/punchin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function punchOutReq(data) {
  return await fetch("/api/punch/punchout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
