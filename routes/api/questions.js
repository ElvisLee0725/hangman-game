const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Question = require('../../models/Question');

// @route   GET api/questions/:difficulty
// @desc    Get a random question from database with according to its difficulty
// @access  Public
router.get('/:difficulty', async (req, res) => {
  const { difficulty } = req.params;

  try {
    const numOfQuestions = await Question.countDocuments({ difficulty });
    
    if(numOfQuestions === 0) {
      return res.status(404).json({ errors: [{ msg: 'Could not find a question with this difficulty' }]});
    }
    
    const random = Math.floor(Math.random() * numOfQuestions);
    // skip() The number of documents to skip. 
    const q = await Question.findOne({ difficulty }).skip(random);

    res.json(q); 
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/questions/
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
      question: question.toLowerCase(),
      difficulty
    });

    // Save question into MongoDB
    await q.save();

    res.json(q);
  } catch (error) {
    consoloe.error(error);
    res.status(500).send('Server error');
  }

});

module.exports = router;