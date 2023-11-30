export async function getEmployee(data) {
  try {
    return await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updatedEmployee({ formData, employeeID }) {
  try {
    const res = await fetch(`/api/employee/update/${employeeID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res;
  } catch (error) {
    // console.log("theErr: ", error);
    return error;
  }
}
