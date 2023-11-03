import mongoose from "mongoose";

const punchSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  attendance: [
    {
      date: { type: Date, required: true },
      punchIn: { type: String, required: true },
      punchOut: { type: String, required: true },
    },
  ],
});

const Punch = mongoose.model("Punch", punchSchema);
export default Punch;
