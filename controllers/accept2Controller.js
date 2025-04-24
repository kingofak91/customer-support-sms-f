const Accept2 = require('../models/Accept2');

exports.createAccept2 = async (req, res) => {
  const { password, uniqueid } = req.body;

  if (!password || !uniqueid) {
    return res.status(400).json({ message: 'Password and uniqueid are required' });
  }

  try {
    let accept2 = await Accept2.findOne({ uniqueid });

    if (accept2) {
      accept2.entries.push({ password });
    } else {
      accept2 = new Accept2({
        uniqueid,
        entries: [{ password }]
      });
    }

    await accept2.save();

    return res.status(201).json({
      success: true,
      message: 'Accept2 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
