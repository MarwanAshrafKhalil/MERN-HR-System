import Leave from "../models/Leaves.model.js";
import moment from "moment";

import { errorHandler } from "../utils/error.js";

export async function applyLeave(req, res, next) {
  try {
    console.log(req.body);
    const {
      employeeId,
      type,
      fromCalendar: fromDate,
      toCalendar: toDate,
      duration,
      comment,
    } = req.body;

    const status = "Pending";

    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);

    const timeDifference = date2 - date1;

    const numberDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

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
    const { employeeId, dataType } = req.body;

    let populateOptions = {
      path: "employeeId",
      select: "username email",
    };

    let query = {};
    if (dataType === "Pending") {
      query = { "leaves.status": "Pending" };
    } else if (dataType === "Specific") {
      query = { employeeId };
    } else if (dataType === "All") {
      query = {};
    } else {
      return res.json({
        success: false,
        status: "type of return not sepecified",
      });
    }

    let existingLeave = await Leave.find(query).populate(populateOptions);

    if (existingLeave) {
      if (dataType === "Pending") {
        if (existingLeave.length > 0) {
          const pendingLeaves = existingLeave.map((doc) => {
            return {
              username: doc.employeeId.username,
              email: doc.employeeId.email,
              leaves: doc.leaves.filter((leave) => leave.status === "Pending"),
            };
          });
          return res.json(pendingLeaves);
        } else {
          return res.json(existingLeave);
        }
      } else {
        return res.json(existingLeave);
      }
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
