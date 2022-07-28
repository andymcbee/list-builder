import dotenv from "dotenv";

dotenv.config();

//-----Get all sms requests-----
export const getSmsRequests = (req, res) => {
  res.status(200).json({ message: "Get all comm sends" });
};

//-----Get single sms request-----
export const getSmsRequest = (req, res) => {
  res
    .status(200)
    .json({ message: `Get single comm send id: ${req.params.id}` });
};

//-----Send sms request-----
export const sendSmsRequest = (req, res) => {
  res.status(200).json({ message: "Create a comm send" });
};

//-----Update sms request-----
export const updateSmsRequest = (req, res) => {
  res.status(200).json({ message: `Update comm sends id: ${req.params.id}` });
};

//-----Delete sms request-----
export const deleteSmsRequest = (req, res) => {
  res.status(200).json({ message: `Delete comm sends id: ${req.params.id}` });
};
