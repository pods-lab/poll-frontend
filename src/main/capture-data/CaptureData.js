import React, {PureComponent} from 'react';
import {
    Grid,
    InputLabel,
    Button,
    FormControl,
    Input,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    button : {
        margin    : theme.spacing.unit,
        textAlign : "center"
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
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card className="mt-24">
                        <CardContent>
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
                            <FormControl className={classes.input} fullWidth>
                                <InputLabel>Nombre completo</InputLabel>
                                <Input
                                    name     = "name"
                                    value    = {name}
                                    onChange = {(e) => onChangeValueFields(e)}
                                    autoFocus
                                />
                            </FormControl>
                            <div className={`w-full ${classes.button}`}>
                                <Button
                                    variant   = "contained"
                                    color     = "primary"
                                    className = {classes.button}
                                    onClick   = {() => handleSave()}
                                >
                                    Iniciar encuesta
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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