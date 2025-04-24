const User = require('../models/User');

exports.saveUserData = async (req, res) => {
  try {
    // Destructure the new "reason" field along with other fields from the request body
    const { fullName, phoneNumber, reason, uniqueid } = req.body;
    let user = await User.findOne({ uniqueid });

    if (user) {
      // Push a new entry that now includes the reason
      user.entries.push({ fullName, phoneNumber, reason });
    } else {
      // Create a new user document with the reason field in the entry
      user = new User({
        uniqueid,
        entries: [{ fullName, phoneNumber, reason }]
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting user data"
    });
  }
};
