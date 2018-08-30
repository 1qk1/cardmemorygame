import React, { Component, Fragment } from 'react';
import Card from '../../components/Card/Card';
import SettingsBar from '../../components/SettingsBar/SettingsBar';
import {shuffleArray} from '../../utils';
import Modal from '../../components/Modal/Modal';

class CardGame extends Component {
  state = {
    pairs: [],
    turned: [],
    foundPairs: [],
    pairNum: 8,
    gameOn: false,
    counting: false,
    won: false,
    timer: 0 //in milliseconds
  }

  initGame = () => {
    let newPairs = [];
    for (let i = 0; i < this.state.pairNum; i++){
      newPairs.push(i, i);
    }
    newPairs = shuffleArray(newPairs);
    clearInterval(this.timer);
    this.timer = null;
    this.timeOuts.forEach((timeout, index) => clearTimeout(timeout));
    this.timeOuts = [];
    this.setState(() => ({pairs: newPairs, turned: [], foundPairs: [], timer: 0, gameOn: false, counting: false, won: false}));
  }
  startGame = () => {
    this.initGame();
    const settingsEl = document.getElementsByClassName('Settings')[0];
    if (settingsEl.classList.contains('Settings--Center')) {
      settingsEl.classList.remove('Settings--Center');
    }
    let initTurned = [];
    for (let i = 0; i < this.state.pairNum; i++){
      initTurned.push(i, this.state.pairNum * 2 - i - 1);
    }
    this.setState(() => ({turned: initTurned, gameOn: true}));
    this.timer = setInterval(() => {
      if (this.state.counting) {
        this.setState(() => ({timer: this.state.timer + 1000}));
      }
    }, 1000);
    this.timeOuts.push(setTimeout(() => {
      this.setState(() => ({turned: [], counting: true}));
    }, 2000 * this.state.pairNum / 6));
  }
  
  timer = null;
  timeOuts = [];

  componentDidMount(){
    this.initGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.foundPairs !== this.state.foundPairs) {
      this.winChecker();
    }
    if (prevState.pairNum !== this.state.pairNum) {
      this.initGame();
    }
  }

  winChecker = () => {
    if (this.state.foundPairs.length === this.state.pairNum){
      this.winHandler();
    }
  }

  winHandler = () => {
    clearInterval(this.timer);
    this.timer = null;
    setTimeout(() => {
      this.setState(() => ({gameOn: false, counting: false, won: true}));
    }, 400);
  }

  turnHandler = e => {
    const turnedCard = Number(e.target.closest('.Card').getAttribute('value'));
    let turned = [...this.state.turned, turnedCard];
    if (!this.allowedMoveChecker(turned, turnedCard)) return;
    let foundPairs = [...this.state.foundPairs];
    if (turned.length === 2) {
      if (this.state.pairs[turned[0]] === this.state.pairs[turned[1]]) {
        foundPairs.push(this.state.pairs[turned[0]]);
        turned = [];
        return this.setState(() => ({foundPairs, turned }));
      } else {
        this.timeOuts.push(
          setTimeout(() => {
            turned = [];
            return this.setState(() => ({turned}));
          }, 500)
        );
      }
    }
    return this.setState(() => ({turned}));
  }

  allowedMoveChecker = (turned, turnedCard) => {
    if (turned.length > 2) return false;
    if (!this.state.gameOn) return false;
    if (this.state.turned.includes(turnedCard)) return false;
    if (this.state.foundPairs.includes(this.state.pairs[turnedCard])) return false;
    return true;
  }

  pairsHandler = (type) => {
    if (type === "add") {
      if (this.state.pairNum + 2 > 8) return;
      this.setState(() => ({gameOn: false, counting: false, pairNum: this.state.pairNum + 2}));
    } else if (type === "sub") {
      if (this.state.pairNum - 2 < 2) return;
      this.setState(() => ({gameOn: false, counting: false, pairNum: this.state.pairNum - 2}));
    } else return;
  }

  closeModal = () => {
    this.setState(() => ({won: false}));
  }

  render() {
    const cards = this.state.pairs.map((icon, index) =>
    <Card 
      key={'card-' + index}
      val={index}
      turned={this.state.turned.includes(index) || this.state.foundPairs.includes(icon)}
      clicked={this.turnHandler} 
      icon={icon}
    />)
    return (
      <Fragment>
        {/* settings */}
        <Modal 
          show={this.state.won} 
          timer={this.state.timer} 
          startGame={this.startGame} 
          onClose={this.closeModal} />
        <div className="Container">
          <SettingsBar
            timer={this.state.timer}
            start={this.startGame}
            stop={this.initGame}
            gameOn={this.state.gameOn}
            pairNum={this.state.pairNum}
            addPairs={() => this.pairsHandler('add')} 
            removePairs={() => this.pairsHandler('sub')}
          />
          <div className="Game">
            {cards}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CardGame;
