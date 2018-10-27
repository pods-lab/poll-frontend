import React, {Component, Fragment} from 'react';
import MenuAppBar from "../appbar/MenuAppBar";
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
        const {name, email, phone, error} = this.state;
        this.setState({error : email === ''});

        if(email !== '' && this.validateEmail(email)){
            //Request to the API
            alert("Guardar Información");
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
            validateEmail
        } = this.state;

        return(
            <Fragment>
                <MenuAppBar/>
                <CaptureData
                    name                = {name}
                    email               = {email}
                    phone               = {phone}
                    error               = {error}
                    validateEmail       = {validateEmail}
                    handleSave          = {() => this.handleSave()}
                    onChangeValueFields = {(e) => this.onChangeValueFields(e)}
                    validateInputPhone  = {(e) => this.validateInputPhone(e)}
                />
            </Fragment>
        );
    }
}

export default Content;