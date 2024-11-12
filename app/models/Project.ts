import { FormStep } from '@/types/enum';
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
  isCompeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  formStep: {
    type: Number,
    enum: Object.values(FormStep),
    default: FormStep.Step1,
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
