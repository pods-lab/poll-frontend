import React, {Component, Fragment} from 'react';
import Content from "./content";
import Survey from "./survey";
import MenuAppBar from "./appbar/MenuAppBar";

class AppComponent extends Component {
    state = {
        currentStep : 1,
        userData : {
            email: null,
            cellphone: null,
            fullName: null,
        }
    };

    setUserData({fullName=null, email=null, cellphone=null}, step=0,) {
        this.setState({
            email,
            cellphone,
            fullName,
            currentStep: step,
        });
    }

    render() {
        const {currentStep, userData} = this.state;

        return (
            <div className="App w-full h-full">
                <MenuAppBar/>
                {currentStep === 0 && (
                    <Content
                        setUserData={this.setUserData.bind(this)}
                    />
                )}
                {currentStep === 1 && (
                    <Survey userData={userData} />
                )}
            </div>
        );
    }
}

export default AppComponent;
