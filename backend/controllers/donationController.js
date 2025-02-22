const Donation = require("../models/donationModel");
const factory = require("./controllerFactory");
const { Together } = require("together-ai");
const catchAsync = require("../utils/catchAsync");

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

exports.createDonation = catchAsync(async (req, res, next) => {
  const newDoc = await Donation.create(req.body);

  const system_prompt = `You are a middleman between a user which is donating
    money to charitable organisations working to prevent
    global warming. You will be provided with the sum that
    user has donated for now and your task is to write a 50
    word message praising him for helping save the planet
    and describing him what he had done with his money so far.
    If he had donated 50 dollars, tell him how many trees he 
    has "planted", how many yards of river path has he "cleaned"
    or how much ocean area he has "cleaned" from plastic.
    Your message should sound very rewarding and you should 
    imitate gamification, making user happy to donate again and
    to share his experience with his friends. In the future prompt
    you will only be given a complete donation sum for that user.
    Return the message inside a JSON object.`;

  const user_prompt = newDoc.amount;

  try {
    const apiResponse = await together.chat.completions.create({
      messages: [
        { role: "system", content: system_prompt },
        { role: "user", content: user_prompt },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.7,
    });

    const responseMessage = apiResponse.choices[0].message.content;

    const jsonMatch = responseMessage.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }

    const jsonString = jsonMatch[0];
    const responseInJson = JSON.parse(jsonString);

    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
        rewardMessage: responseInJson,
      },
    });
  } catch (error) {
    console.error("Error: ", error.responseMessage?.data || error.message);
    res.status(500).json({ error: "Failed to generate reward message" });
  }
});

exports.getAllDonations = factory.getAll(Donation);
exports.getDonation = factory.getOne(Donation);
