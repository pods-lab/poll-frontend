import React, {PureComponent} from 'react';
import {
    Grid,
    InputLabel,
    Button,
    FormControl,
    Input,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    button : {
        margin    : theme.spacing.unit,
        textAlign : "center"
    },
    captureData : {
        justifyContent : "center",
        padding        : "40px"
    },
    input : {
      marginTop : "20px"
    }
});

/**
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @description Formulario de captura de datos del usuario
 */
class CaptureData extends PureComponent{
    render(){
        const {
            classes,
            name,
            email,
            phone,
            error,
            validateEmail,
            onChangeValueFields,
            validateInputPhone,
            handleSave
        } = this.props;
        return(
            <div className="w-full">
                <Grid container spacing={24} className={classes.captureData}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel>Nombre completo</InputLabel>
                            <Input
                                name     = "name"
                                value    = {name}
                                onChange = {(e) => onChangeValueFields(e)}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl className={classes.input} fullWidth required>
                            <InputLabel>Email</InputLabel>
                            <Input
                                error    = {error}
                                type     = "email"
                                name     = "email"
                                value    = {email}
                                onChange = {(e) => onChangeValueFields(e)}
                            />
                            {error && !validateEmail && <Typography variant="caption">Debes completar este campo</Typography>}
                            {validateEmail && <Typography variant="caption">El email debe de ser válido</Typography>}
                        </FormControl>
                        <FormControl className={classes.input} fullWidth>
                            <InputLabel>Celular</InputLabel>
                            <Input
                                name       = "phone"
                                value      = {phone}
                                onChange   = {(e) => onChangeValueFields(e)}
                                onKeyPress = {(e) => validateInputPhone(e)}
                            />
                        </FormControl>
                        <div className={`w-full ${classes.button}`}>
                            <Button
                                variant   = "contained"
                                color     = "primary"
                                className = {classes.button}
                                onClick   = {() => handleSave()}
                            >
                                Enviar
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

CaptureData.propTypes = {
    classes             : PropTypes.object,
    email               : PropTypes.string.isRequired,
    phone               : PropTypes.string,
    error               : PropTypes.bool.isRequired,
    onChangeValueFields : PropTypes.func.isRequired,
    validateInputPhone  : PropTypes.func.isRequired,
    handleSave          : PropTypes.func.isRequired
};

export default withStyles(styles) (CaptureData);