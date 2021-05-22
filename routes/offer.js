const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const Offer = require("../models/Offer");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Create an announcement

router.post("/offer/publish", isAuthenticated, async (req, res) => {
  console.log("route: /offer/publish");
  console.log("body: ", req.fields);
  console.log("files: ", req.files);
  try {
    const { title, description, price, condition, city, brand, size, color } =
      req.fields;
    if (price && description && title) {
      const newOffer = new Offer({
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          {
            MARQUE: brand,
          },
          {
            TAILLE: size,
          },
          {
            ÉTAT: condition,
          },
          {
            COULEUR: color,
          },
          {
            EMPLACEMENT: city,
          },
        ],
        owner: req.user,
      });
      const fileKeys = Object.keys(req.files);
      if (fileKeys.length !== 0) {
        const promises = fileKeys.map(async (fileKey) => {
          try {
            const file = req.files[fileKey];
            const result = await cloudinary.uploader.upload(file.path, {
              folder: `/vinted/offers/${newOffer._id}`,
            });
            return result;
          } catch (error) {
            return res.status(400).json({ message: error.message });
          }
        });
        const pix = await Promise.all(promises);
        newOffer.product_image = pix;
      }
      await newOffer.save();
      res.status(200).json(newOffer);
    } else {
      res.status(400).json({
        message: "You must specify a title, a description and a price",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an announcement

router.put("/offer/update", isAuthenticated, async (req, res) => {
  console.log("route: offer/update");
  console.log("fields: ", req.fields);
  console.log("files: ", req.files);
  try {
    const offer = await Offer.findById(req.fields.id);
    const keys = Object.keys(req.fields);
    const regex = new RegExp("picture-to-delete");
    let picturesToDelete = [].concat(
      keys
        .filter((element) => regex.test(element))
        .map((element) => req.fields[element])
    );
    if (picturesToDelete.length !== 0) {
      await cloudinary.api.delete_resources(picturesToDelete); // delete the pictures whose body parameter is of type "picture-to-delete"
    }
    const newPictures = [].concat(
      offer.product_image
        .reduce((arr, element, index) => {
          if (picturesToDelete.indexOf(element.public_id) === -1) {
            arr.push(index);
          }
          return arr;
        }, [])
        .map((element) => offer.product_image[element])
    ); // create a new array of the pictures that are not deleted
    const offerUpdated = keys.reduce((obj, element) => {
      switch (element) {
        case "title":
          obj.product_name = req.fields.title;
          break;
        case "description":
          obj.product_description = req.fields.description;
          break;
        case "price":
          obj.product_price = req.fields.price;
          break;
        case "condition":
          obj.product_details[2].ÉTAT = req.fields.condition;
          break;
        case "city":
          obj.product_details[4].EMPLACEMENT = req.fields.city;
          break;
        case "brand":
          obj.product_details[0].MARQUE = req.fields.brand;
          break;
        case "size":
          obj.product_details[1].TAILLE = req.fields.size;
          break;
        case "color":
          obj.product_details[3].COULEUR = req.fields.color;
          break;
      }
      return obj;
    }, offer);
    offerUpdated.markModified("product_details"); // update the array in the DBS
    const filesKeys = Object.keys(req.files);
    if (filesKeys.length !== 0) {
      const promises = filesKeys.map(async (fileKey) => {
        try {
          const file = req.files[fileKey];
          const result = await cloudinary.uploader.upload(file.path, {
            folder: `/vinted/offers/${offer._id}`,
          });
          return result;
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });
      const pix = await Promise.all(promises);
      newPictures.push(...pix);
    }
    offerUpdated.product_image = newPictures; // update cloudinary and the DB with the new pictures given in parameters
    await offerUpdated.save();
    res.status(200).json({ message: "Offer successfully updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete an announcement

router.delete("/offer/delete", isAuthenticated, async (req, res) => {
  console.log("route: /offer/delte");
  console.log(req.fields);
  try {
    const offer = await Offer.findByIdAndDelete(req.fields.id);
    await cloudinary.api.delete_resources_by_prefix([
      `vinted/offers/${req.fields.id}`,
    ]);
    await cloudinary.api.delete_folder(`/vinted/offers/${req.fields.id}`);
    res.status(200).json({ message: "Offer successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// filter an announcement

router.get("/offers", async (req, res) => {
  console.log("route: /offers");
  console.log(req.query);
  try {
    let { title, priceMin, priceMax, sort, page, limit } = req.query;
    const filter = {};
    if (title) {
      filter.product_name = new RegExp(title, "i");
    }
    if (priceMax) {
      filter.product_price = { $lte: Number(priceMax) };
    }
    if (priceMin) {
      if (filter.product_price) {
        filter.product_price.$gte = Number(priceMin);
      } else {
        filter.product_price = { $gte: Number(priceMin) };
      }
    }
    const sortFilter = {};
    if (sort === "price-desc") {
      sortFilter.product_price = -1;
    } else if (sort === "price-asc") {
      sortFilter.product_price = 1;
    }
    if (!page) {
      page = 1;
    } else if (page < 1) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    const offers = await Offer.find(filter)
      .sort(sortFilter)
      .limit(limit)
      .skip((Number(page) - 1) * limit)
      .populate("owner", "account");
    // .select("product_name product_price");
    const count = await Offer.countDocuments(filter);
    res.status(200).json({
      count: count,
      offers: offers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get one announcement

router.get("/offer/:id", async (req, res) => {
  console.log("route: /offer/:id");
  console.log(req.params);
  try {
    const offer = await Offer.findById(req.params.id).populate(
      "owner",
      "account"
    );
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all announcements

router.get("/offer", async (req, res) => {
  console.log("route: /offer");
  console.log(req.params);
  try {
    const offer = await Offer.find().populate("owner", "account");
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
