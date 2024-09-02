import mongoose, { Schema, Model } from "mongoose";

export interface IVerificationToken {
  email: string;
  token: string;
  expires: Date;
}

const verificationTokenSchema: Schema<IVerificationToken> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  }
);

verificationTokenSchema.index({ email: 1, token: 1 }, { unique: true });

const VerificationToken: Model<IVerificationToken> = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationToken;
