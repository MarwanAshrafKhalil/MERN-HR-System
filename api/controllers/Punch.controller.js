import Punch from "../models/Punch.model.js";
import { errorHandler } from "../utils/error.js";

export async function punchIn(req, res, next) {
  try {
    const { employeeId, punchIn, punchOut } = req.body;
    //   console.log(employeeId, punchIn, punchOut);
    const datePunch = new Date();

    const attendance = {
      date: datePunch,
      punchIn,
    };

    let existingPunch = await Punch.findOne({ employeeId });

    if (existingPunch) {
      existingPunch.attendance.push(attendance);
    } else {
      existingPunch = new Punch({
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
        next(errorHandler("401", "cant save punchIn" + error));
      });
  } catch (error) {
    next(error);
  }
}

export async function punchOut(req, res, next) {
  try {
    const { employeeId, punchOut } = req.body;

    let existingPunch = await Punch.findOne(
      { employeeId },
      { attendance: { $slice: -1 } }
    );

    const plainObject = existingPunch.attendance[0].toObject();
    const attendanceObjID = plainObject._id.toString();

    // console.log("1: ", plainObject);
    // console.log(plainObject.punchIn);
    // console.log(plainObject._id.toString());
    // console.log("Plain-keys: ", Object.keys(plainObject));
    // console.log("punchInObj-keys: ", Object.keys(punchInObj));
    // console.log(Object.keys(plainObject).includes("punchIn"));

    const outFlag = Object.keys(plainObject).includes("punchOut");

    if (plainObject.punchIn && outFlag === false) {
      try {
        const result = await Punch.updateOne(
          { employeeId, "attendance._id": attendanceObjID },
          {
            $set: {
              [`attendance.$.punchOut`]: punchOut,
            },
          }
        );

        res.status(200).json("punch Out successfully");
      } catch (error) {
        next(errorHandler(401, "Cant update attendance sheet"));
      }
    } else {
      return next(errorHandler(401, "Database error-punchOut already exists"));
    }
  } catch (error) {
    next(error);
  }
}
