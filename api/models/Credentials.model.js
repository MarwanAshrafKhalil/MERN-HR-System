import mongoose from "mongoose";

const credentialsSchema = new mongoose.Schema({
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  salary: {
    type: Number,
    required: true,
  },
  leaves: { type: Number, required: true },
  bonusePercentage: {
    type: Number,
    default: 0,
  },
});
