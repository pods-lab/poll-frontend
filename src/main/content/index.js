import React, {Component, Fragment} from 'react';
import MenuAppBar from "../appbar/MenuAppBar";
import CaptureData from "../capture-data/CaptureData";

class Content extends Component{

    state = {
        name  : "",
        email : "",
        phone : "",
        error : false,
    };

    onChangeValueFields({target}){
        if(target.name === 'email'){
            this.setState({
                [target.name] : target.value,
                 error        : target.value === ''
            });
        } else{
            this.setState({
                [target.name] : target.value
            })
        }
    };

    handleSave(){
        const {name, email, phone} = this.state;

        if(email === ''){
            this.setState({error : true});
        } else{
            this.setState({error : false});
        }
    }

    validateInputPhone(event){
        let key = document.all ? event.keyCode : event.which;
        if(key === 8) return true;
        let pattern  = /[0-9]/;
        let finalKey = String.fromCharCode(key);

        if(!pattern.test(finalKey)){
            event.preventDefault();
            return false;
        }
    }

    render(){
        const {name, email, phone, error} = this.state;

        return(
            <Fragment>
                <MenuAppBar/>
                <CaptureData
                    name                = {name}
                    email               = {email}
                    phone               = {phone}
                    error               = {error}
                    handleSave          = {() => this.handleSave()}
                    onChangeValueFields = {(e) => this.onChangeValueFields(e)}
                    validateInputPhone  = {(e) => this.validateInputPhone(e)}
                />
            </Fragment>
        );
    }
}

export default Content;