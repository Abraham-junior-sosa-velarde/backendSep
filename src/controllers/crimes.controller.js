import Crimes from "../models/Crimes";

export const getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crimes.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(crimes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
