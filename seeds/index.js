const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/Campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "63066b92d0fdb05b5971f76d",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente beatae corporis nostrum nulla hic? Rerum tempore laboriosam illum quidem pariatur, debitis fugit a consequatur sit, culpa maiores vel id provident.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/drub5vbxx/image/upload/v1661798823/YelpCamp/feaeb3afwec6wlhrgqtc.jpg",
          filename: "YelpCamp/feaeb3afwec6wlhrgqtc",
        },
        {
          url: "https://res.cloudinary.com/drub5vbxx/image/upload/v1661799730/YelpCamp/isgqar82gpcgmxzm6exl.jpg",
          filename: "YelpCamp/isgqar82gpcgmxzm6exl",
        },
        {
          url: "https://res.cloudinary.com/drub5vbxx/image/upload/v1661799733/YelpCamp/g9szvp24jil2cm78vzix.jpg",
          filename: "YelpCamp/g9szvp24jil2cm78vzix",
        },
      ],
    });
    await camp.save();
  }
};

seedDB();
