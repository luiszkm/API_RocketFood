const{ Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const ProductsController = require("../controllers/ProductsController")
const ImageProductController = require("../controllers/ImageProductController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const admAuthenticated = require("../middleware/admAuthenticated");

const productsRouter = Router() 
const upload = multer(uploadConfig.MULTER)

const productsController = new ProductsController()
const imageProductController = new ImageProductController()


productsRouter.post("/",admAuthenticated,upload.single("image"),productsController.create)
productsRouter.put("/:id",admAuthenticated,upload.single("image"),productsController.update)
productsRouter.delete("/:id",admAuthenticated,productsController.delete)
productsRouter.patch("/imageFile/:id",admAuthenticated, upload.single("image"),imageProductController.update)



productsRouter.get("/:id",ensureAuthenticated,productsController.show)
productsRouter.get("/",ensureAuthenticated,productsController.index)




module.exports = productsRouter;