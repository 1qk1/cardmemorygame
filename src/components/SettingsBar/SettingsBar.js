import React from 'react';
import FontAwesome from 'react-fontawesome';
import './SettingsBar.css';
import { timeFormatter } from '../../utils';
import CSSTransition from 'react-transition-group/CSSTransition';

const settingsBar = ({pairNum, addPairs, removePairs, gameOn, start, stop, timer, top}) => {
  const minutes = Math.floor(timer / 1000 / 60);
  const seconds = Math.floor(timer / 1000) % 60;
  return (
    <CSSTransition in={top} timeout={100} classNames={{
      enterActive: 'Settings--Top',
      enterDone: 'Settings--Top Top'
    }}>
      <div className="Settings">
        <div className="Settings__Row">
          <div className="Settings__Section">
            <button onClick={removePairs} className='Button'><FontAwesome name='minus'/></button> 
            {pairNum} pairs 
            <button onClick={addPairs} className='Button'><FontAwesome name='plus' /></button>
          </div>
          <div className="Settings__Section">
            Time: {timeFormatter(minutes)}:{timeFormatter(seconds)}
          </div>
        </div>
        <div className="Settings__Row">
          <div className="Settings__Section">
            <button onClick={start} className={!gameOn ? 'Button Button--Green' : 'Button Button--Yellow'}>{!gameOn ? 'Start' : 'New Game'}</button>
          </div>
          <CSSTransition in={gameOn} timeout={75} classNames={{
            exitActive: 'Hidden',
            enter: 'Invisible',
            enterActive: 'Show'
          }}
          mountOnEnter
          unmountOnExit
          >
            <div className="Settings__Section">
              <button onClick={stop} className='Button Button--Red'>Stop Game</button>
            </div>
          </CSSTransition>
        </div>
      </div>
    </CSSTransition>
  )
}

export default settingsBar;

// Settings: 
// - Number of pairs
// - Restart