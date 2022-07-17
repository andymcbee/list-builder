import dotenv from "dotenv";

dotenv.config();

//-----Get all comm sends-----
export const getCommSends = (req, res) => {
  res.status(200).json({ message: "Get all comm sends" });
};

//-----Get single comm send-----
export const getCommSend = (req, res) => {
  res
    .status(200)
    .json({ message: `Get single comm send id: ${req.params.id}` });
};

//-----Create comm send-----
export const createCommSend = (req, res) => {
  res.status(200).json({ message: "Create a comm send" });
};

//-----Update comm send-----
export const updateCommSend = (req, res) => {
  res.status(200).json({ message: `Update comm sends id: ${req.params.id}` });
};

//-----Delete comm send-----
export const deleteCommSend = (req, res) => {
  res.status(200).json({ message: `Delete comm sends id: ${req.params.id}` });
};
