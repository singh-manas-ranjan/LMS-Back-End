import express, { Router } from "express";
const verificationRouter: Router = express.Router();
import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationToken,
} from "../controllers/verificationToken.controller";

verificationRouter.route("/").post(createVerificationToken);
verificationRouter.route("/email/:email").get(getVerificationToken);
verificationRouter.route("/").delete(deleteVerificationToken);

export { verificationRouter };
