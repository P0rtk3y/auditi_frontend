import React from 'react'
import {Icon, Label} from 'semantic-ui-react'
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
        return(
            <div>
               
                <Label className="count" circular size='large'>
                    {this.state.count}
                </Label>    
                <Icon 
                    onClick={this.playAndIncrement} 
                    name='play circle outline' 
                    style={{color: "#D8ECE8"}}
                    count={this.state.count}
                />
            </div>
        )
    }
}

export default Count 

