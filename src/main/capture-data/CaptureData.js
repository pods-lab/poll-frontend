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

class CaptureData extends PureComponent{
    render(){
        const {
            classes,
            name,
            email,
            phone,
            error,
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
                            {error && <Typography variant="caption">Debes completar este campo</Typography>}
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

export default withStyles(styles) (CaptureData);