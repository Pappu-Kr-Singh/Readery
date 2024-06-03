import mongoose from "mongoose";

import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Mongoose connection error`, error);
    process.exit(1);
  }
};

export default connectDB;

/***********************************TO INSERT THE DOCUMENT/DATA IN MONGODB ATLAS USE BELOW METHOD *******************************************************/

// import mongoose from "mongoose";
// import { DB_NAME } from "../../constants.js";
// import { BookStore } from "../models/book.model.js";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGO_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
//     );

//     // Array of documents to insert
//     const books = [
//       // Include all your book objects here...

//       {
//         name: "StoryBook",
//         title: "To Kill a Mockingbird",
//         price: 0,
//         category: "Fiction",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "1984",
//         price: 0,
//         category: "Dystopian",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Pride and Prejudice",
//         price: 0,
//         category: "Romance",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "The Great Gatsby",
//         price: 0,
//         category: "Fiction",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Moby Dick",
//         price: 0,
//         category: "Adventure",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "War and Peace",
//         price: 0,
//         category: "Historical Fiction",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "The Catcher in the Rye",
//         price: 0,
//         category: "Fiction",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "The Lord of the Rings",
//         price: 0,
//         category: "Fantasy",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Jane Eyre",
//         price: 0,
//         category: "Romance",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "The Hobbit",
//         price: 0,
//         category: "Fantasy",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Crime and Punishment",
//         price: 0,
//         category: "Psychological Fiction",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Wuthering Heights",
//         price: 0,
//         category: "Romance",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Anna Karenina",
//         price: 0,
//         category: "Romance",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//       {
//         name: "StoryBook",
//         title: "Brave New World",
//         price: 0,
//         category: "Dystopian",
//         image:
//           "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1715494725~exp=1715498325~hmac=48f9c14aea80e6ee6d40c169b93f54798971a288c91f4e3a2b88371aea4efb7e&w=740",
//       },
//     ];

//     // Insert the documents into the specified collection
//     // const Book = mongoose.model('Book', new mongoose.Schema({
//     //   name: String,
//     //   title: String,
//     //   price: Number,
//     //   category: String,
//     //   image: String
//     // }));

//     const result = await BookStore.insertMany(books);

//     // Log the result of the insertion
//     console.log(`${result.insertedCount} books inserted.`);
//   } catch (error) {
//     console.log(`Mongoose connection error`, error);
//     process.exit(1);
//   }
// };

// export default connectDB;
