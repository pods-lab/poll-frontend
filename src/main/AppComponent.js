import React, { Component } from 'react';
import Content from "./content";

class AppComponent extends Component {
    state = {
        currentStep : 0,
        userData : {
            email: null,
            cellphone: null,
            fullName: null,
        }
    };

    setUserData({fullName=null, email=null, cellphone=null}) {
        this.setState({
            email,
            cellphone,
            fullName,
        });
    }

    changeStep(step) {

    }

    render() {
        return (
            <div className="App w-full h-full">
                <Content
                    setUserData={this.setUserData.bind(this)}
                    changeStep={this.changeStep.bind(this)}
                />
            </div>
        );
    }
}

export default AppComponent;
