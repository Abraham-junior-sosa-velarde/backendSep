import InstructionDegree from "../models/InstructionDegree";

export const getAllInstructionDegree = async (req, res) => {
  try {
    const instructionDegree = await InstructionDegree.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(instructionDegree);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
