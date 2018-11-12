import React, {Component, Fragment} from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {
    Print,
    CloudDownload,
} from '@material-ui/icons';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import html2canvas from 'html2canvas'
import rasterizehtml from 'rasterizehtml';

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

    constructor(props) {
        super(props);
        this.componentToPrint = null;
    }

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
                        <div className="w-full pl-12 mb-4">
                            <Typography variant="caption">{item.description}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    render() {
        // const printResult = this.printResult.bind(this);
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
                            <div className="mt-8 px-32" ref={(e) => this.componentToPrint = e}>
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
                                <div className="my-12">
                                    <Typography variant="headline" align="right">
                                        Resultado final: {`${survey.average_value}%`}
                                    </Typography>
                                </div>
                            </div>
                            <div>

                                <div className="my-12 flex justify-center">
                                    <Button className="mx-8" onClick={goBack}>
                                        Volver al inicio
                                    </Button>
                                    <div className="mx-12">
                                        <ReactToPrint
                                            trigger={() => (
                                                <Button className="mx-8" variant="extendedFab">
                                                    Imprimir <Print className="ml-4"/>
                                                </Button>
                                            )}
                                            content={() => this.componentToPrint}
                                        />
                                    </div>
                                    <Button className="mx-12" variant="extendedFab" onClick={printResult}>
                                    Descargar <CloudDownload className="ml-4"/>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Resume);