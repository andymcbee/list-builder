//-----Get all comm sends-----
const getCommSends = (req, res) => {
  res.status(200).json({ message: "Get all comm sends" });
};

//-----Get single comm send-----
const getCommSend = (req, res) => {
  res
    .status(200)
    .json({ message: `Get single comm send id: ${req.params.id}` });
};

//-----Create comm send-----
const createCommSend = (req, res) => {
  res.status(200).json({ message: "Create a comm send" });
};

//-----Update comm send-----
const updateCommSend = (req, res) => {
  res.status(200).json({ message: `Update comm sends id: ${req.params.id}` });
};

//-----Delete comm send-----
const deleteCommSend = (req, res) => {
  res.status(200).json({ message: `Delete comm sends id: ${req.params.id}` });
};

//-----//
module.exports = {
  getCommSends,
  getCommSend,
  createCommSend,
  updateCommSend,
  deleteCommSend,
};
