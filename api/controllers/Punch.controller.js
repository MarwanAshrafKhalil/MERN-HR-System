import Punch from "../models/Punch.model.js";
import { errorHandler } from "../utils/error.js";

export async function punchIn(req, res, next) {
  try {
    const { employeeId, punchIn } = req.body;
    const datePunch = new Date();

    const attendance = {
      date: datePunch,
      punchIn,
    };

    let existingPunch = await Punch.findOne({ employeeId });

    if (existingPunch) {
      existingPunch.attendance.push(attendance);
      console.log(existingPunch);
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
        next(errorHandler("401", "cant save punchIn " + error));
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

export async function punchGet(req, res, next) {
  console.log("punchget: ");

  try {
    const { data: employeeId } = req.body;
    console.log("punchget:", req.body);

    console.log("punchget:", employeeId);

    let existingPunch = await Punch.findOne(
      { employeeId },
      { attendance: { $slice: -1 } }
    );

    console.log("existing: ", existingPunch);

    if (existingPunch) {
      const plainObject = existingPunch.attendance[0].toObject();
      const inFlag = Object.keys(plainObject).includes("punchIn");

      if (inFlag) {
        return res.json(plainObject.punchIn);
      } else {
        return res.json(false);
      }
    } else {
      return res.json(false);
    }
  } catch (error) {
    next(error);
  }
}
