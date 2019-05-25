import React from 'react'
class About extends React.Component {
    render() {
        console.log(this.props.history)
        return (
            <div>
                <h1>I am About</h1>
            </div>
        )
    }
}

export default About