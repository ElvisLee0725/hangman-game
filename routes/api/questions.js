const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
  (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  };
  res.send('post a question!');
});

module.exports = router;