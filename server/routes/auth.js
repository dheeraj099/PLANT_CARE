
import express from "express";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  requireSignin,
  uploadImage,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "API Plant Care",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-image", requireSignin, uploadImage)
export default router;
