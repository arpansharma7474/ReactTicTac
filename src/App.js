import React from 'react'

const log = console.log

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
            </div>
        );
    }
}

export default Game
