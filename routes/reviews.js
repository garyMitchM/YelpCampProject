const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/Campground");
const Review = require("../models/review");
const reviews = require("../controllers/reviews");

//Route of the POST request for creating a review
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

//Route of the DELETE request for deleting a review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
