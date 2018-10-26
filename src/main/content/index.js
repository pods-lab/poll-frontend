import React, {Component, Fragment} from 'react';
import MenuAppBar from "../appbar/MenuAppBar";
import CaptureData from "../capture-data/CaptureData";

class Content extends Component{
    render(){
        return(
            <Fragment>
                <MenuAppBar/>
                <CaptureData/>
            </Fragment>
        );
    }
}

export default Content;