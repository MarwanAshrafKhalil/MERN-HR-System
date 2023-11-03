import Punch from "../models/Punch.model.js";

export async function punchIn(req, res, next) {
  try {
    const { employeeId, punchIn, punchOut } = req.body;
    //   console.log(employeeId, punchIn, punchOut);

    const attendance = {
      date: new Date(),
      punchIn,
      punchOut,
    };

    let existingPunch = await Punch.findOne({ employeeId });
    // console.log(existingPunch);

    if (existingPunch) {
      // If an existing punch record is found, update the punch-in and punch-out fields
      //   existingPunch.attendance.punchIn = punchIn;
      //   existingPunch.attendance.punchOut = punchOut;

      //   existingPunch.attendance.put({ punchIn: punchIn, punchOut: punchOut });

      //   existingPunch.attendance.punchIn = punchIn;
      //   existingPunch.attendance.punchOut = punchOut;
      existingPunch.attendance.push(attendance);
      console.log(existingPunch);
    } else {
      const existingPunch = new Punch({
        employeeId,
        attendance: [attendance],
      });
    }
    await existingPunch
      .save()
      .then(() => {
        console.log("Punch record saved successfully");
        res.status(201).json({ message: "Employee created successfully." });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    // console.log(error.message);
  }
}
