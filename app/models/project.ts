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
    default: 1,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  // New fields for client and admin docs
  clientDocs: [{
    name: { type: String, required: false },
    key: { type: String, required: false },
    url: { type: String, required: false },
  }],
  adminDocs: [{
    name: { type: String, required: false },
    key: { type: String, required: false },
    url: { type: String, required: false },
  }],
  dataUploadDeadline: {
    type: Date,
    required: false,
  },
  resultUploadDeadline: {
    type: Date,
    required: false,
  },
  dataUploadContent: [{
    url: {type: String, required: false},
    description: {type: String, required: false},
  }],
  resultContent: [{
    url: {type: String, required: false},
    description: {type: String, required: false},
  }],
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
