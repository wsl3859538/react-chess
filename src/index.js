import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const squareRowLength = 15;  // 棋盘格子的行数
const squareColLength = 15  // 棋盘格子的列数
var winner = null;

function Square(props) {
  return (
    <button className={`square ${props.value.win ? 'winBtn' : ''} `}
      onClick={props.onClick}>
      {props.value.value}
    </button>
  );
}


function calculateWinner(data, next) {


  // 当下棋子变量值
  let curVar = next ? 'O' : 'X';

  // 记录当前坐标等初始数据
  let curX = data.x, curY = data.y, c_Squares = data.squares;

  // 返回获胜棋子的数组位置,用于高亮显示
  let winChess = [curY * 15 + curX];

  if (curX == -1) return

  // this.state.xIsNext ? 'X' : 'O'

  /** 
   *  根据坐标判断当下数组中,相同的X或O是否有5连
   *  分别需要判断横向、纵向、斜向
  */

  // 判断横向

  var checkByCross = function () {
    let count = 0;

    /** 
     *  
     *  根据当前坐标,判断左右两边相邻的五个点(不包含自身),再根据配置中的squareRowLength可以算出这五个点位于数组中的值
     *  因为数组下标
     *  如果与当前值一致,则累加
     *  
     *  
     * */
    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX - index,
        y: curY
      };

      if (point.x < 0) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }

    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX + index,
        y: curY
      };

      if (point.x > squareColLength) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }


    if (count >= 4) {
      return true
    } else {
      return false;
    }

  }


  // 判断纵向

  var checkByVertical = function () {
    let count = 0;

    /** 
     *  
     *  根据当前坐标,判断左右两边相邻的五个点,再根据配置中的squareRowLength可以算出这五个点位于数组中的值
     *  如果与当前值一致,则累加
     * 
     * */

    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX,
        y: curY - index
      };

      if (point.y < 0) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }

    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX,
        y: curY + index
      };

      if (point.y > squareRowLength) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }


    if (count >= 4) {
      return true
    } else {
      return false;
    }
  }

  // 判断斜向,四个方向

  var checkByBias = function () {
    let count = 0;

    /** 
     *  
     *  根据当前坐标,判断左右两边相邻的五个点,再根据配置中的squareRowLength可以算出这五个点位于数组中的值
     *  如果与当前值一致,则累加
     * 
     * */

    // 左上
    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX - index,
        y: curY - index
      };

      if (point.y < 0 || point.x < 0) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }

    // 右上
    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX + index,
        y: curY - index
      };

      if (point.y < 0 || point.x > squareRowLength) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }

    // 左下
    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX - index,
        y: curY + index
      };

      if (point.y > squareRowLength || point.x < 0) break


      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }

    // 右下
    for (let index = 1; index < 5; index++) {
      const point = {
        x: curX + index,
        y: curY + index
      };

      if (point.y > squareRowLength || point.x > squareColLength ) break

      const arrayLength = point.y * 15 + point.x;

      if (c_Squares[arrayLength].value != curVar) {
        break
      }
      winChess.push(arrayLength)
      count++
    }


    if (count >= 4) {
      return true
    } else {
      return false;
    }
  }


  if (checkByCross() || checkByVertical() || checkByBias()) {


    // 高亮
    winChess.forEach(item=>{
      // .includes('d')
      c_Squares[item].win = true
    })

    return true
  } else {
    return false
  }

}

// 计算坐标系
function calculateCoordinate() {


  let sClines = [];

  for (let index = 0; index < squareRowLength; index++) {

    for (let j = 0; j < squareColLength; j++) {
      let coordinateObj = {
        x: j,
        y: index
      };
      sClines.push(coordinateObj)
    }
  }

  return sClines


  // return sClines[i]
}

class Board extends React.Component {


  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {


    let n = 0;// 当前是第几个格子 
    let board = [];
    for (let index = 0; index < squareRowLength; index++) {
      var boardRow = [];
      for (let j = 0; j < squareColLength; j++, n++) {
        boardRow.push(this.renderSquare(n))
      }

      board.push(<div className="board-row" key={index}>{boardRow}</div>)
    }

    return (
      <div>{board}</div>
    );

  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: [],
        x: -1,
        y: -1
      }],
      coordinate: calculateCoordinate(),
      clickIndex: 0,
      stepNumber: 0,
      xIsNext: true,
    };

    // 使用fill创建obj会出现指向问题,所以只能用fill创建null值的数组
    for(let i=0;i<squareRowLength * squareColLength;i++){
      let obj = {
        value:null,
        win:false
      }

      this.state.history[0].squares.push(obj);
    }

  }

  async handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();


    if (winner || squares[i].value) {
      return;
    }


    this.state.xIsNext ? squares[i].value = 'X' : squares[i].value = 'O';



    // setState 
    await this.setState({
      history: history.concat([{
        squares: winner ? winner : squares,
        x: this.state.coordinate[i].x,
        y: this.state.coordinate[i].y,
      }]),
      clickIndex: i,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {


    const history = this.state.history;
    const current = history[this.state.stepNumber];

    winner = calculateWinner(current, this.state.xIsNext);


    const moves = history.map((step, move) => {

      let curFlag = false;
      if (step.y == current.y && step.x == current.x) {
        curFlag = true;
      }

      const desc = move ?
        'Go to move #' + move + `(x:${step.x},y:${step.y})` :
        'Go to game start';
      return (
        <li key={move} className={`${curFlag ? 'boldBtn' : ''} `}>
          <button className={`${curFlag ? 'boldBtn' : ''} `} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className="history">{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
