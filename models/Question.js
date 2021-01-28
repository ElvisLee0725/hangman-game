const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  }
});

module.exports = Question = mongoose.model(QuestionSchema);