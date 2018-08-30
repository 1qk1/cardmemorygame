import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Card.css';
import {numToIcon} from '../../utils';
import CSSTransition from 'react-transition-group/CSSTransition';


const card = ({ icon, clicked, val, turned }) => {
  return (
    <CSSTransition in={turned} timeout={150} classNames={{
      enterActive: 'Card--Turned',
      enterDone: 'Card--Turned'
    }} >
      <div value={val} onClick={clicked} className={'Card'}>
        <div className='Card__Side Card__Side--Front'></div>
        <div className="Card__Side Card__Side--Back">
          <FontAwesome name={numToIcon[icon]} />
        </div>
      </div>
    </CSSTransition>
  )
}

export default card;