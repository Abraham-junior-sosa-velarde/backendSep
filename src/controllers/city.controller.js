import City from "../models/City";

export const getAllCities = async (req, res) => {
  try {
    const Cities = await City.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(Cities);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
