import React from 'react'
import {Search,Grid} from 'semantic-ui-react'


class SearchBar extends React.Component{
    render(){
        return(
            <div>
            <Grid>
            <Grid.Column >
            <Search  style={{float:'right' , marginRight:'15px'}}/>
            </Grid.Column>
            </Grid>
            </div>
        )
    }
}


export default SearchBar