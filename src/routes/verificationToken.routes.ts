import express, { Router } from "express";
const verificationRouter: Router = express.Router();
import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
} from "../controllers/verificationToken.controller";

verificationRouter.route("/").post(createVerificationToken);
verificationRouter.route("/email/:email").get(getVerificationTokenByEmail);
verificationRouter.route("/token/:token").get(getVerificationTokenByToken);
verificationRouter.route("/").delete(deleteVerificationToken);

export { verificationRouter };
