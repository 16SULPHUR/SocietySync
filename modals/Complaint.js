const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
    complaintTitle: {
        type: String,
        required: true,
        enum: ['noise', 'maintenance', 'security', 'other'], // Add more complaint types as needed
      },
      complaintDetails: {
        type: String,
        required: true,
      },
      images: [
        {
          type: String, // Assuming you store image URLs; adjust as needed
        },
      ],
      status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending',
      },
      submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
