import SexualOrientation from "../models/SexualOrientation";

export const getAllSexualOrientations = async (req, res) => {
  try {
    const sexualOrientations = await SexualOrientation.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(sexualOrientations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
