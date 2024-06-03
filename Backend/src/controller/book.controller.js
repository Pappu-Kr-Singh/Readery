import { BookStore } from "../models/book.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getBook = asyncHandler(async (req, res) => {
  try {
    const book = await BookStore.find();
    res
      .status(200)
      .json(new ApiResponce(200, book, "book Has been fetched successfully"));
  } catch (error) {
    console.log(new ApiError(500, error.message || "Book was not fetched"));
  }
});
