import React from 'react'
import { Icon, Button} from 'semantic-ui-react';

const Tags = (props) => {
    
    return(
        <Button 
            icon name='hashtag'
            color='teal'
            style={{margin:"10px 5px 0px 20x"}}
        >
            <Icon name='hashtag' />
            {props.tag}
        </Button>
    )
}

export default Tags; 