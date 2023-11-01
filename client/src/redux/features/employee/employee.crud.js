export async function getEmployee(data) {
  console.log("Dta: ", data);
  return await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
