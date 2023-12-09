import Leave from "../models/Leaves.model.js";

import { errorHandler } from "../utils/error.js";

export async function applyLeave(req, res, next) {
  try {
    const {
      employeeId,
      type,
      fromDate,
      toDate,
      duration,
      comment,
      numberDays,
    } = req.body;

    const status = "Pending";

    const leaveReq = {
      type,
      fromDate,
      toDate,
      duration,
      comment,
      numberDays,
      status,
    };

    let existingLeaves = await Leave.findOne({ employeeId });

    if (existingLeaves) {
      existingLeaves.leaves.push(leaveReq);
      // console.log(existingPunch);
    } else {
      existingLeaves = new Leave({
        employeeId,
        leaves: [leaveReq],
      });
    }

    await existingLeaves
      .save()
      .then(() => {
        res.status(201).json(leaveReq);
      })
      .catch((error) => {
        next(
          errorHandler("401", "cant submit the leave request now: " + error)
        );
      });
  } catch (error) {
    next(error);
  }
}

export async function getLeave(req, res, next) {
  try {
    const { employeeId } = req.body;

    let existingLeave = await Leave.findOne(
      { employeeId }
      // { leaves: { $slice: -1 } }
    );

    if (existingLeave) {
      const lastLeave = existingLeave.leaves;
      return res.json(lastLeave);
    } else {
      return res.json(false);
    }
  } catch (error) {
    next(error);
  }
}

export async function approveLeave(req, res, next) {
  try {
    const { employeeId, leaveId, status } = req.body;

    let existingLeave = await Leave.updateOne(
      {
        employeeId,
        "leaves._id": leaveId,
      },
      {
        $set: {
          "leaves.$.status": status,
        },
      }
    );

    if (existingLeave.modifiedCount > 0) {
      return res.json(existingLeave);
    } else {
      return res.json("cannot find a crosponding leave.");
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteLeave(req, res, next) {
  try {
    const { employeeId, leaveId } = req.body;

    let existingLeave = await Leave.updateOne(
      {
        employeeId,
      },
      {
        $pull: {
          leaves: { _id: leaveId },
        },
      }
    );

    if (existingLeave) {
      return res.json(existingLeave);
    } else {
      return res.json("cannot find a crosponding leave.");
    }
  } catch (error) {
    next(error);
  }
}
