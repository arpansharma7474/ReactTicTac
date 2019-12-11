import React from 'react'
import Peer from 'peerjs';

const log = console.log
class Game extends React.Component {

    componentDidMount() {
        this.peer = new Peer();
        this.peer.on('open', id => {
            this.setState({
                my_id: id
            })
        });

        this.peer.on('connection', conn => {
            this.handleConn(conn)
        });

    }
    state = {
        array: new Array(9).fill(" "),
        currentX: true,
        my_id: "",
        gameStarted: false,
        opponnent_id: ""
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
                <h2>Enter opponent id:  </h2>
                <input
                    type="email"
                    onChange={(evt) => {
                        this.setState({
                            opponnent_id: evt.target.value
                        })
                    }}
                    value={this.state.opponnent_id}
                    placeholder={"Opponent id"}
                    style={{ width: 200, height: 20 }}
                ></input>

                <button
                    onClick={() => {
                        this.connectPeer()
                    }}
                    style={{ margin: 10 }}>Submit</button>

                <button
                    onClick={() => {
                        this.setState({
                            array: new Array(9).fill(" "),
                        })
                    }}
                    style={{ margin: 10 }}>Reset</button>

                <div>
                    {this.makeSquares()}
                </div>
            </div>
        );
    }

    connectPeer = () => {
        if (this.state.opponnent_id.length == 0)
            return
        var conn = this.peer.connect(this.state.opponnent_id);
        this.handleConn(conn)
    }

    handleConn = conn => {
        conn.on('data', data => {
            console.log('Received', data);
        });
        conn.send('Hello!');
    }

    makeSquares = () => {
        let finalArray = []
        let rowArray = []
        for (let i = 0; i < 9; i++) {
            rowArray.push(
                <button
                    onClick={() => {
                        const array = this.state.array
                        if (array[i] !== " ")
                            return
                        array[i] = this.state.currentX ? "X" : "O"
                        this.setState({
                            array: array,
                            currentX: !this.state.currentX
                        })
                        this.checkWinner()
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
