const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/Campground");

router
  .route("/")
  //Route of the GET request for the 'All Campgrounds' show page
  .get(catchAsync(campgrounds.index))
  //Route of the POST request for creating a new campground
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

//Route of the GET request for the 'New Campground' form
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  //Route of the GET request for the 'Campground' show page
  .get(catchAsync(campgrounds.showCampground))
  //Route of the PUT request for updating a campground's info
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  //Route of the DELETE request for deleting a campground
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//Route of the GET request for the 'Edit a Campground' form page
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
