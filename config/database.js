import mongoose from 'mongoose';

const connectToDatabase = async () => {

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the environment');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    if (
      error.code === 18 ||
      error.code === 8000 ||
      /bad auth|authentication failed/i.test(error.message)
    ) {
      throw new Error(
        'MongoDB Atlas rejected authentication. Check that MONGODB_URI uses the correct Atlas database user credentials, and URL-encode any special characters in the password.',
        { cause: error },
      );
    }

    throw error;
  }

  console.log('Connected to MongoDB');
};

export default connectToDatabase;
