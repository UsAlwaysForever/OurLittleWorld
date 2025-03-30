interface QuizQuestion {
    question: string;
    hint: string;
    correctAnswer: string;
  }
  
  interface QuizConfig {
    questions: QuizQuestion[];
    loveMessagePrompt: string;
    correctLoveMessage: string;
    errorMessages: {
      wrongAnswer: string;
      wrongLoveMessage: string;
    };
  }
  
  const quizConfig: QuizConfig = {
    questions: [
      {
        question: 'My fave color?',
        hint: 'Think of my fave dress!',
        correctAnswer: 'test',
      },
      {
        question: 'My fave K-drama?',
        hint: 'We watched it together!',
        correctAnswer: 'test',
      },
    ],
    loveMessagePrompt: 'Now say something sweet!',
    correctLoveMessage: 'i love you',
    errorMessages: {
      wrongAnswer: 'Wrong answer, bby! Try again! 💖',
      wrongLoveMessage: 'Say "I Love You" first, bby! 😘',
    },
  };
  
  export default quizConfig;