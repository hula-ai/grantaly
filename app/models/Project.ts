import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  fundingAgency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  endDate: {
    type: Date,
    required: false,
  },
  expectedTimeline: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
