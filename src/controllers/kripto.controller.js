const axios = require('axios');
const Kripto = require('../models/kripto.models');

exports.predict = async (req, res) => {
  const { data, scaled } = req.body;

  try {
    const response = await axios.post(
      'http://localhost:5000/predict_with_data',
      { data }
    );

    // Simpan ke database MongoDB
    const kriptoData = new Kripto({
      data: response.data,
      scaled,
    });

    await kriptoData.save();

    res.status(200).json({
      message: 'Prediction received and saved to database',
      result: response.data,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to get prediction from Flask server or save to DB',
      detail: err.message,
    });
  }
};
