import React from 'react'
import Peer from 'peerjs';

const log = console.log
class Game extends React.Component {

    conn = undefined
    currentTurn = "X"

    componentDidMount() {
        this.peer = new Peer();
        this.peer.on('open', id => {
            this.setState({
                my_id: id
            })
        });

        this.peer.on('connection', conn => {
            this.conn = conn
            this.setState({
                gameStarted: true,
                mySign: "O"
            }, () => {
                this.handleConn()
            })

        });

    }
    state = {
        array: new Array(9).fill(" "),
        mySign: undefined,
        my_id: "",
        gameStarted: false,
        opponnent_id: ""
    }

    getTurnName = () => {
        if (this.currentTurn === this.state.mySign)
            return "My turn"
        else
            return "Opponents Turn"
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                className="game"
            >
                <h1>Welcome Your id is : </h1>
                <p>{this.state.my_id}</p>
                {this.state.gameStarted ? <h3>{this.getTurnName()}</h3> : null}
                {!this.state.gameStarted && <h2>Enter opponent id:  </h2>}
                {!this.state.gameStarted && <input
                    onChange={(evt) => {
                        this.setState({
                            opponnent_id: evt.target.value
                        })
                    }}
                    value={this.state.opponnent_id}
                    placeholder={"Opponent id"}
                    style={{ width: 200, height: 20 }}
                ></input>}

                {!this.state.gameStarted && <button
                    onClick={() => {
                        this.connectPeer()
                    }}
                    style={{ margin: 10 }}>Submit</button>
                }
                <div>
                    {this.makeSquares()}
                </div>
            </div>
        );
    }

    connectPeer = () => {
        if (this.state.opponnent_id.length == 0)
            return
        this.conn = this.peer.connect(this.state.opponnent_id);
        this.setState({
            gameStarted: true,
            mySign: "X"
        }, () => {
            this.handleConn()
        })

    }

    handleConn = _ => {
        alert("Game Started")
        this.conn.on('data', data => {
            log(data, "this is data")
            this.currentTurn = data.currentTurn
            this.setState({
                array: data.array,
            }, () => {
                this.calculateWinner()
            })
        });
    }

    makeSquares = () => {
        let finalArray = []
        let rowArray = []
        for (let i = 0; i < 9; i++) {
            rowArray.push(
                <button
                    onClick={() => {
                        this.onItemClicked(i)
                    }}
                    style={{
                        height: 50,
                        width: 50,
                        margin: 10
                    }}
                    className="square">
                    {this.state.array[i]}
                </button>)
            if (rowArray.length === 3) {
                finalArray.push(<div style={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                }}>
                    {rowArray}
                </div>)
                rowArray = []
            }
        }
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {finalArray}
            </div>)
    }

    onItemClicked = (i) => {
        if (this.currentTurn !== this.state.mySign)
            return
        const array = this.state.array
        if (array[i] !== " ")
            return
        array[i] = this.state.mySign
        this.currentTurn = this.state.mySign === "X" ? "O" : "X"
        this.setState({
            array: array,
        })
        this.conn.send({
            array: array,
            currentTurn: this.currentTurn
        })
        this.checkWinner()
    }

    checkWinner = () => {
        this.calculateWinner()
    }

    calculateWinner() {
        const squares = this.state.array

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] != " " && squares[a] === squares[b] && squares[a] === squares[c]) {
                alert(this.state.currentX ? "X has won" : "O has won")

                this.setState({
                    array: new Array(9).fill(" "),
                })
                break
            }
            if (squares.indexOf(" ") < 0) {
                alert("Game Over")
                this.setState({
                    array: new Array(9).fill(" "),
                })
                break
            }
        }

    }

}

export default Game
