// scripts/portfolioseeder.ts
import mongoose from 'mongoose';
import Portfolio from '@/models/portfolio';
import { PortfolioData } from '@/constants/ProjectConstantsSeeder';
import { NextResponse } from 'next/server';


// MongoDB connection URI from your .env file
const MONGODB_URI = process.env.MONGODB_URI;

const seedPortfolio = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Just use the MONGODB_URI
    console.log('Connected to MongoDB');

    const collections = await Portfolio.find();
    if(collections.length === 0){
      await Portfolio.insertMany(PortfolioData);
      return { success: true, message: 'Portfolio seeded successfully' };
    } 
    else {
      return { success: true, message: 'Portfolio already seeded' };
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
};

export const POST = async (req: Request, res: Response) => {

    try {
        const result = await seedPortfolio();    
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.error()
    }
}