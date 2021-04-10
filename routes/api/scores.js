const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Score = require('../../models/Score');

// @route   POST api/scores/
// @desc    Create a new score with user name and date
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(), 
  check('score', 'Score is required').not().isEmpty(),
  check('score', 'Score must be greater than zero').isInt({ min: 0, max: 1000000 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, score } = req.body;

    try {
      const newScore = new Score({
        name,
        score
      });

      await newScore.save();

      res.json(newScore);
    } catch(error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

// @route   GET api/scores/
// @desc    Get the highest 10 scores sorted from high to low
// @access  Public
router.get('/', async (req, res) => {
  try{
    const topTenScores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(topTenScores);
  }catch(error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;