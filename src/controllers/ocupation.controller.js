import Occupation from "../models/Occupation";

export const getAllOcupations = async (req, res) => {
  try {
    const occupations = await Occupation.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(occupations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
