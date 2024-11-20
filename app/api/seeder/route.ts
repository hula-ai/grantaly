// scripts/portfolioseeder.ts
import mongoose from 'mongoose';
import Portfolio from '@/models/portfolio';
import { PortfolioData } from '@/constants/temp';
import { NextResponse } from 'next/server';


// MongoDB connection URI from your .env file
const MONGODB_URI = process.env.MONGODB_URI;

const seedPortfolio = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Just use the MONGODB_URI
    console.log('Connected to MongoDB');

    const collections = await Portfolio.find();
    if(collections.length === 0)
      await Portfolio.insertMany(PortfolioData);
    console.log('portfolio seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};



export const POST = async (req: Request, res: Response) => {

    try {
        await seedPortfolio();    
        return NextResponse.json({data:'Seeded'});
    } catch (error) {
        return NextResponse.error()
    }
}