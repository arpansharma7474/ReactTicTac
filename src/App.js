import React from 'react'
class Game extends React.Component {

    state = {
        array: new Array(9).fill(" "),
        currentX: true,
        email: ""
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
                <h1>Welcome</h1>
                <input
                    type="email"
                    onChange={(evt) => {
                        this.setState({
                            email: evt.target.value
                        })
                    }}
                    value={this.state.email}
                    placeholder={"Please enter your email"}
                    style={{ width: 200, height: 20 }}
                ></input>
                <button style={{ margin: 10 }}>Submit</button>

                <div>
                    {this.makeSquares()}
                </div>
            </div>
        );
    }

    makeSquares = () => {

        let finalArray = []
        let rowArray = []
        for (let i = 0; i < 9; i++) {
            rowArray.push(
                <button
                    style={{
                        height: 50,
                        width: 50,
                        margin: 10
                    }}
                    className="square">
                    {i}
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

}

export default Game
