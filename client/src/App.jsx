import styles from './styles/App.module.css';
import LeftPart from './components/LeftPart';
import Calendar from './components/Calendar';
import Exercises from './components/Exercises';
import {useState, useEffect} from 'react';
import AIAssistant from './components/AIAssistant'


function App() {
  return (
    <div className={styles.mainContainer}>
      <LeftPart/>
      <Calendar/>
    </div>
  )
}

export default App
