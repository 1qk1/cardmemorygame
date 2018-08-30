import React from 'react';
import FontAwesome from 'react-fontawesome';
import './SettingsBar.css';
import { timeFormatter } from '../../utils';

const settingsBar = ({pairNum, addPairs, removePairs, gameOn, start, stop, timer}) => {
  const minutes = Math.floor(timer / 1000 / 60);
  const seconds = Math.floor(timer / 1000) % 60;
  return (
    <div className="Settings Settings--Center">
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
          {gameOn ? (<div className="Settings__Section">
            <button onClick={stop} className='Button Button--Red'>Stop Game</button>
          </div>)
          : null}
      </div>
    </div>
  )
}

export default settingsBar;

// Settings: 
// - Number of pairs
// - Restart