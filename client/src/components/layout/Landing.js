import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Difficulty from './Difficulty';
import Question from './Question';

const Landing = () => {
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await axios.get('/api/questions/easy');
        console.log(res.data);
        setOriginalQuestion(res.data.question.toUpperCase());
        processWord(res.data.question, new Set());
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestion();
  }, []);

  const [originalQuestion, setOriginalQuestion] = useState("");
  const [wordGuess, setWordGuess] = useState("");

  const processWord = (word, charGuessed) => {
    let tmp = "";
    for(let i = 0; i < word.length; i++) {
      if(charGuessed.has(word.charAt(i))) {
        tmp += word.charAt(i);
      }
      else if(word.charAt(i) === ' ') {
        tmp += ' ';
      }
      else {
        tmp += '*';
      }
    }
    setWordGuess(tmp);
  }

  return (
    <Container>
      <h1>Hello! Welcome to play this game!</h1>
      <Difficulty />
      <Question question={wordGuess}/>
    </Container>
  )
}

export default Landing;