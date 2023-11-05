import Punch from "../models/Punch.model.js";

export async function punchIn(req, res, next) {
  try {
    const { employeeId, punchIn, punchOut } = req.body;
    //   console.log(employeeId, punchIn, punchOut);

    const attendance = {
      date: new Date(),
      punchIn,
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

export async function punchOut(req, res, next) {
  try {
    const { employeeId, punchOut } = req.body;

    let existingPunch = await Punch.findOne(
      { employeeId },
      { attendance: { $slice: -1 } }
    );

    const plainObject = existingPunch.attendance[0].toObject();
    const attendanceObjID = plainObject._id.toString();

    console.log("1: ", plainObject);
    console.log(plainObject.punchIn);
    // console.log(plainObject._id.toString());
    // console.log("Plain-keys: ", Object.keys(plainObject));
    // console.log("punchInObj-keys: ", Object.keys(punchInObj));
    // console.log(Object.keys(plainObject).includes("punchIn"));

    const outFlag = Object.keys(plainObject).includes("punchOut");

    if (plainObject.punchIn && outFlag === false) {
      // const attendance ={
      //   punchOut
      // }
      console.log("inside");

      const newPunchInObj = { ...plainObject, punchOut: punchOut };
      console.log("final: ", newPunchInObj);

      const punchId = employeeId; // Replace with the actual document ID
      const attendanceIndex = -1; // Index of the third object in the attendance array (zero-based)

      console.log("id: ", punchId, " attIndex: ", attendanceIndex);
      try {
        const result = await Punch.updateOne(
          { employeeId: punchId, "attendance._id": attendanceObjID },
          {
            $set: {
              [`attendance.$.punchOut`]: punchOut,
            },
          }
        );

        res.status(200).json(result._doc);
      } catch (error) {
        console.log(error);
      }

      // const updatePunch = await Punch.findByIdAndUpdate(
      //   employeeId,
      //   {
      //     $set: newPunchInObj,
      //   },
      //   { new: true }
      // );

      // await existingPunch
      // .save()
      // .then(() => {
      //   console.log("Punch record saved successfully");
      //   res.status(201).json({ message: "Employee created successfully." });
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }

    // if (existingPunch) {
    //   // If an existing punch record is found, update the punch-in and punch-out fields
    //   //   existingPunch.attendance.punchIn = punchIn;
    //   //   existingPunch.attendance.punchOut = punchOut;

    //   //   existingPunch.attendance.put({ punchIn: punchIn, punchOut: punchOut });

    //   //   existingPunch.attendance.punchIn = punchIn;
    //   //   existingPunch.attendance.punchOut = punchOut;
    //   existingPunch.attendance.push(attendance);
    // } else {
    //   const existingPunch = new Punch({
    //     employeeId,
    //     attendance: [attendance],
    //   });
    // }
    // await existingPunch
    //   .save()
    //   .then(() => {
    //     console.log("Punch record saved successfully");
    //     res.status(201).json({ message: "Employee created successfully." });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  } catch (error) {
    // console.log(error.message);
  }
}
