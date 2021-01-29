const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Question = require('../../models/Question');

// @route   GET api/questions
// @desc    Get a question from database
// @access  Public
router.get('/', (req, res) => {
  res.send('Get a question!');
});

// @route   POST api/questions
// @desc    Add a new question into database
// @access  Public
router.post('/', [
  check('question', 'Question is required').not().isEmpty(), 
  check('question', 'Question must has length over 10 characters').isLength({ min: 10 }), 
  check('difficulty', 'Please include the difficulty of this question').not().isEmpty()
], 
  async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  const { question, difficulty } = req.body;
  // Check if question already exists
  try {
    let q = await Question.findOne({ question });
    if(q) {
      return res.status(400).json({ errors: [{ msg: 'Question already exists' }]});
    }

    q = new Question({
      question,
      difficulty
    });

    // Save question into MongoDB
    await q.save();

    res.send('post a question!');
  } catch (error) {
    consoloe.error(error);
    res.status(500).send('Server error');
  }

});

module.exports = router;