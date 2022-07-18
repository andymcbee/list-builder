import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    //handle custom token
    if (token) {
      //verify the token
      decodedData = jwt.verify(token, process.env.JWTSECRET);

      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    //this should return error to client
    return res.status(401).json({
      message: "Authorization denied. Log in to continue.",
      error: true,
    });
  }
};

export default auth;
