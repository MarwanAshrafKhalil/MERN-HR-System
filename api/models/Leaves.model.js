import mongoose from "mongoose";

const leavesSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  leaves: [
    {
      type: { type: String, required: true },

      fromDate: { type: Date, required: true },
      toDate: { type: Date, required: true },
      duration: {
        type: String,
        required: true,
        enum: ["Half Day", "Full Day"],
      },
      numberDays: {
        type: Number,
        required: function () {
          return this.duration === "Full Day";
        },
      },
      comment: { type: String },
      status: { type: String, required: true },
    },
  ],
});

const Leave = mongoose.model("Leave", leavesSchema);
export default Leave;
