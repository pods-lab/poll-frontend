import React, {Component} from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {
    Print,
} from '@material-ui/icons';

const styles = theme => ({
    groupTitle: {
        borderBottom: "1px dashed #eee",
        display: "flex",
    },
    nomenclature: {
        fontWeight: 700,
        display: "inline-block",
        width: "5%",
    },
    itemText: {
        display: "inline-block",
        width: "85%",
        textAlign: "justify",
    },
    value: {
        display: "inline-block",
        width: "10%",
        textAlign: "right",
    }
});

class Resume extends Component {

    renderGroup(group) {
        const {classes} = this.props;
        return (
            <div className="w-full md:pl-12">
                {group.items.map((item, key) => (
                    <div key={`group-items-list-element-${group.code}-${key}`}>
                        <div className="w-full md:w-4/5 lg:w-full flex items-start py-4   ">
                            <span className={classes.nomenclature}>
                                {item.nomenclature}.
                            </span>
                            <div className={classes.itemText}>
                                {item.title}
                            </div>
                            <div className={classes.value}>
                                <Typography variant="caption">
                                    {`${item.value}%`}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const {survey, classes, goBack, printResult} = this.props;
        const {groups} = survey;
        return (
            <Grid container justify="center">
                <Grid item xs={12} md={6} lg={8}>
                    <Card className="mt-12">
                        <CardContent>
                            <Typography variant="title">
                                Resultados
                            </Typography>
                            <Divider/>
                            <div className="mt-8">
                                {groups.map((group) => (
                                    <div key={group.title} className="mt-12">
                                        <div className={classes.groupTitle}>
                                            <Typography variant="subheading" >
                                                <strong>{group.title}</strong>
                                            </Typography>
                                            <span className="ml-auto">
                                                {`${group.average_value}%`}
                                            </span>
                                        </div>
                                        {this.renderGroup(group)}
                                    </div>
                                ))}
                            </div>
                            <div className="my-12">
                                <Typography variant="headline" align="right">
                                    Resultado final: {`${survey.average_value}%`}
                                </Typography>
                            </div>
                            <div className="my-12 flex justify-center">
                                <Button className="mr-8" onClick={goBack}>
                                    Volver
                                </Button>
                                <Button className="ml-8" variant="contained" onClick={printResult}>
                                    Imprimir <Print className="ml-4"/>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Resume);