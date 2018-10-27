import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root : {
        flexGrow : 1,

    },
    grow : {
        flexGrow : 1,
    },
    menuButton : {
        marginLeft  : -12,
        marginRight : 20,
    },
};

/**
 * @author Jhoan López <jhoanlt19@gmail.com>
 * @description Appbar
 */
class MenuAppBar extends PureComponent {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Electronic survey
                        </Typography>
                    </Toolbar>
                 </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
