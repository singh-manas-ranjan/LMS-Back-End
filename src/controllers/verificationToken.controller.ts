import { Request, Response } from "express";
import VerificationToken from "../models/verificationToken.models";
import { v4 as uuidv4 } from "uuid";

export type TPasswordResetToken = {
  id?: string;
  email: string;
  token: string;
  expires: Date;
};

const createVerificationToken = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  console.log(email);

  try {
    const verificationToken = await VerificationToken.create({
      email,
      token: token,
      expires: expires,
    });
    res.status(201).json({
      success: true,
      message: "Verification Token Created Successfully",
      body: verificationToken,
    });
  } catch (error) {
    console.log(`ERROR!! createVerificationToken: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getVerificationTokenByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const verificationToken = await VerificationToken.findOne({ email });

    if (!verificationToken) {
      return res.status(404).json({
        success: false,
        message: "Verification Token Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification Token Found",
      body: verificationToken,
    });
  } catch (error) {
    console.log(`ERROR!! getVerificationTokenByEmail: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const getVerificationTokenByToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const verificationToken = await VerificationToken.findOne({ token });

    if (!verificationToken) {
      return res.status(404).json({
        success: false,
        message: "Verification Token Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification Token Found",
      body: verificationToken,
    });
  } catch (error) {
    console.log(`ERROR!! getVerificationTokenByToken: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteVerificationToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const verificationToken = await VerificationToken.findOne({ token });
    if (!verificationToken) {
      res.status(404).json({
        success: false,
        message: "Verification Token Not Found",
      });
    }
    await verificationToken?.deleteOne({ token });
    res.status(200).json({
      success: true,
      message: "Verification Token Deleted",
    });
  } catch (error) {
    console.log(`ERROR!! deleteVerificationToken: ${error}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createVerificationToken,
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  deleteVerificationToken,
};
