import React, {useState, useEffect, useCallback} from 'react';
import './assets/styles/style.css';
import defaultDataset from './dataset';
import {AnswersList, Chats} from './components/index';
import FormDialog from './components/Forms/FormDialog'

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState(defaultDataset);
  const [open, setOpen] = useState(false);

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case (nextQuestionId == 'init'):
        displayNextQuestion(nextQuestionId, dataset[nextQuestionId])
        break;

      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;

      case (nextQuestionId == 'contact'):
        handleClickOpen();
        break;
        
      default:    
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })
    
        setState({
          chats: chats
        })
        setTimeout(()=>displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500)
        break;
    }
  }

  const addChats = () => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })
    setAnswers(nextDataset.answers)
    setCurrentId(nextDataset.nextQuestionId)
  }

  useEffect( () => {
    const initAnswer = ''
    setAnswer(initAnswer, currentId)
  }, [])

  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  },)
 
  const handleClickClose = useCallback( () => {
      setOpen(false)
    },[setOpen],
  )

  const handleClickOpen = () => {
    setOpen(true)
  }
 
  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClickClose={handleClickClose} />
      </div>
    </section>
  )
}

export default App