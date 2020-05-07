import React from 'react'
import {Button} from 'semantic-ui-react'
class Count extends React.Component{
    constructor(props){
        super(props)
        this.state={
            count: 0
        }
    }

    playAndIncrement = e => (
        this.props.playSound(),
        this.setState({count: this.state.count + 1})
    )

    render(){
        console.log(this.props)
        return(
            <div>
                <Button onClick={this.playAndIncrement}>Play (Count:{this.state.count})</Button>
            </div>
        )
    }
}

export default Count 