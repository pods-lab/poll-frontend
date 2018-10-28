import React, {Component, Fragment} from 'react';
import CaptureData from "../capture-data/CaptureData";

/**
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @description Componente de captura de datos del usuario
 */
class Content extends Component{

    state = {
        name          : "",
        email         : "",
        phone         : "",
        error         : false,
        validateEmail : false,
    };

    isValid() {
        const {email} = this.state;
        return email !== "" && email !== null && this.validateEmail(email);
    }

    /**
     * Control de cambios en el valor de los campos del formulario
     * @param target
     */
    onChangeValueFields({target}){
        if(target.name === 'email'){
            this.setState({
                [target.name]  : target.value,
                 error         : target.value === '' || !this.validateEmail(target.value),
                 validateEmail : !this.validateEmail(target.value)
            });
        } else{
            this.setState({
                [target.name] : target.value
            })
        }
    };

    /**
     * Guardar datos
     */
    handleSave(){
        const {email, name, phone} = this.state;
        const {
            setUserData,
        } = this.props;

        this.setState({error : email === ''});

        if(email !== '' && this.validateEmail(email)){
            //Request to the API
            setUserData({
                email,
                cellphone   : phone,
                fullName    : name,
            }, 1);

        } else if(email !== '' && !this.validateEmail(email)){
            this.setState({
                validateEmail : true,
                error         : true
            });
        }
    }
    /**
     * Validación del campo (Email)
     * @param email
     * @returns {boolean}
     */
    validateEmail(email)
    {
        const re = /\S+@\S+\.\S+/;
        if(email === '') return true;
        return re.test(email);
    }

    /**
     * Validación del campo (Celular)
     * @param event
     * @returns {boolean}
     */
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
        const {
            name,
            email,
            phone,
            error,
            validateEmail,
        } = this.state;

        return(
            <Fragment>
                <CaptureData
                    name                = {name}
                    email               = {email}
                    phone               = {phone}
                    error               = {error}
                    validateEmail       = {validateEmail}
                    handleSave          = {() => this.handleSave()}
                    onChangeValueFields = {(e) => this.onChangeValueFields(e)}
                    validateInputPhone  = {(e) => this.validateInputPhone(e)}
                    isValid             = {this.isValid()}
                />
            </Fragment>
        );
    }
}

export default Content;