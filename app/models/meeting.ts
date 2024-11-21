import mongoose from 'mongoose';

// Define the schema for the meeting
const MeetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      bookedBy: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      projectTitle: {
        type: String,
        required: true,
      },
      aiNeeds: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Ensure the model is not recompiled on hot-reload or server restarts
const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema);

export default Meeting;
