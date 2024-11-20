import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectTagLine: {
      type: String,
      required: true,
    },
    content: {
      type: [String], 
      required: true,
    },
    image: { 
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
