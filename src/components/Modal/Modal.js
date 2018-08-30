import React, {Fragment} from 'react';
import './Modal.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import { timeFormatter } from '../../utils';

const modal = ({ show, onClose, timer, startGame }) => {
  return (
    <Fragment>
      <div style={{display: show ? 'block' : 'none'}} className="Backdrop" onClick={onClose} />
      <CSSTransition 
        in={show} 
        timeout={{enter: 200, exit: 100}} 
        unmountOnExit 
        mountOnEnter
        classNames={{
          enter: 'Modal--Closed',
          enterActive: 'Modal--Open',
          enterDone: 'Modal--Open',
          exitActive: 'Modal--Closed',
          exitDone: 'Modal--Closed'
        }}
      >
        {state => (
          <div className="Modal">
            <h2>You won! Your time: {timeFormatter(Math.floor(timer / 1000 / 60)) + ':' + timeFormatter(Math.floor(timer / 1000) % 60)}</h2>
            <button onClick={startGame} className="Button Button--Green">New Game</button>
            <button onClick={onClose} className="Button Button--Yellow">Close</button>
          </div>
        )}
      </CSSTransition>
    </Fragment>
  );
}

export default modal;