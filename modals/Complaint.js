const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    complaintTitle: {
        type: String,
        required: true,
      },
      complaintDetails: {
        type: String,
        required: true,
      },
      images: [
        {
          type: String,
        },
      ],
      status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending',
      },
      submittedBy: {
        type: Object,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("Complaint", complaintSchema);
