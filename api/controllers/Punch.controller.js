import Punch from "../models/Punch.model.js";
import { errorHandler } from "../utils/error.js";

export async function punchIn(req, res, next) {
  try {
    const { employeeId, punchInTrig: punchIn } = req.body;
    console.log("finaaal: ", employeeId, punchIn);
    const datePunch = new Date();

    const attendance = {
      date: datePunch,
      punchIn,
    };

    let existingPunch = await Punch.findOne({ employeeId });
    console.log("1# ", existingPunch);

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
        res.status(201).json(punchIn);
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

        res.status(200).json(punchOut);
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
  try {
    const { data: employeeId } = req.body;
    // console.log("punchget:", req.body);

    // console.log("punchget:", employeeId);

    let existingPunch = await Punch.findOne(
      { employeeId },
      { attendance: { $slice: -1 } }
    );

    console.log("existing: ", existingPunch);

    if (existingPunch) {
      const plainObject = existingPunch.attendance[0].toObject();
      const inFlag = Object.keys(plainObject).includes("punchIn");
      const outFlag = Object.keys(plainObject).includes("punchOut");

      if (inFlag && !outFlag) {
        return res.json(plainObject.punchIn);
      } else if (inFlag && outFlag) {
        const punches = {
          punchInTime: plainObject.punchIn,
          punchOutTime: plainObject.punchOut,
        };

        return res.json(punches);
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
