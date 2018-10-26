import React, {Component} from 'react';
import {
    Grid,
    InputLabel,
    Button,
    FormControl,
    Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        textAlign: "center"
    },
    captureData : {
        justifyContent: "center",
        padding : "40px"
    },
    input : {
      marginTop : "20px"
    }
});

class CaptureData extends Component{
    render(){
        const {classes} = this.props;
        return(
            <div className="w-full">
                <Grid container spacing={24} className={classes.captureData}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                        <FormControl fullWidth required>
                            <InputLabel>Nombre completo</InputLabel>
                            <Input
                                type="email"
                                name="email"
                                // value={email}
                                // onChange={this.handleChange.bind(this)}
                                // onKeyDown={this.handleEnterKey.bind(this)}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl className={classes.input} fullWidth required>
                            <InputLabel>Email</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                // value={password}
                                // onChange={this.handleChange}
                                // onKeyDown={this.handleEnterKey.bind(this)}
                            />
                        </FormControl>
                        <FormControl className={classes.input} fullWidth required>
                            <InputLabel>Celular</InputLabel>
                            <Input
                                type="password"
                                name="password"
                                // value={password}
                                // onChange={this.handleChange}
                                // onKeyDown={this.handleEnterKey.bind(this)}
                            />
                        </FormControl>
                        <div className={`w-full ${classes.button}`}>
                            <Button variant="contained" color="primary" className={classes.button}>
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