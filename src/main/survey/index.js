import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    CircularProgress,
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    Stepper,
    StepLabel,
    StepContent,
    Step,
} from '@material-ui/core';
import {
    Send,
    ArrowBack,
    ArrowForward,
} from '@material-ui/icons';
import Group from './Group';
import Resume from "./Resume";
const styles = theme => ({
    item: {
        borderBottom: "1px dashed #EEE",
    },
    nomenclature: {
        width: "5%",
        display: "inline-block",
        fontWeight: 600,
    },
    itemText: {
        width: "95%",
        display: "inline-block",
    }
});
const data = {
        "average_value":0,
        "groups" : [],
};

class Survey extends Component {
    maxSteps = 0;
    state = {
        currentStep: 0,
        survey: {},
        displayResume: false,
        disableButton: false,
    };

    constructor(props) {
        super(props);
        this.state.survey = [];
        this.maxSteps = data.groups? data.groups.length : 0;
    }

    componentDidMount() {
        window.sendEmail = () => {
            console.log(this.state, this.props);
            this.onFinish();
        };
        const serverName = process.env.REACT_APP_API_SERVER;
        const listPath = process.env.REACT_APP_ENDPOINT_LIST;
        const endpoint = `${serverName}${listPath}`;
        fetch(endpoint, {})
            .then((response) => response.json())
            .then((response) => {
            if(response !== false) {
                this.setState({
                    survey: response,
                })
            }
        }).catch(() => {

        })
    }

    renderItems(group) {
        const {classes} = this.props;
        return (
            <Group
                group={group}
                classes={classes}
                onChangeInput={this.onChangeInput.bind(this)}
            />
        );
    }

    onChangeInput(e, groupCode, itemCode) {
        let value = e.target.value;
        const {groups} = this.state.survey;
        let generalAverageSum = 0;
        groups.forEach(group => {
            let averageGroupSum = 0;
            group.items.forEach(item => {
                if(group.code === groupCode && item.code === itemCode) {
                    if(parseInt(value) > 100) value = 100;
                    item.value = parseInt(value, 10);
                }
                if(isNaN(item.value) || item.value === "") {
                    averageGroupSum += 0;
                } else {
                    averageGroupSum += parseInt(item.value, 10);
                }
            });
            group.average_value = Math.ceil(averageGroupSum / group.items.length);
            generalAverageSum += group.average_value;
        });

        this.setState({
            survey: {
                average_value: Math.ceil(generalAverageSum / (groups? groups.length : 0)),
                groups: [
                    ...groups,
                ],
            }
        })
    }

    onFinish() {
        const serverName = process.env.REACT_APP_API_SERVER;
        const path = process.env.REACT_APP_ENDPOINT_SEND_EMAIL;
        const endpoint = `${serverName}${path}`;
        const {survey} = this.state;
        const {userData} = this.props;
        this.setState({
            disableButton: true,
        });
        fetch(endpoint, {
            method: 'POST',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                user_data: {
                    full_name: userData.fullName,
                    email: userData.email,
                    cellphone : userData.cellphone,
                },
                survey,
            }),
        }).then((response) => response.json())
            .then(response => {
                this.setState({
                    displayResume   : true,
                    disableButton   : false,
                });
            }).catch(response => {
                alert("Ocurrió un error al enviar la encuesta");
                this.setState({
                    disableButton : false,
                });
            });


    }

    nextStep() {
        const {currentStep, survey} = this.state;
        const totalGroups = survey.groups? survey.groups.length : 0;
        let nextStep = currentStep + 1;
        if(nextStep > totalGroups) {
            nextStep = totalGroups;
        }
        this.setState({
            currentStep: nextStep,
        });
    }

    prevStep() {
        const {currentStep} = this.state;
        let prevStep = currentStep - 1;
        if(prevStep < 0 ) {
            prevStep = 0;
        }
        this.setState({
            currentStep: prevStep,
        });
    }

    goBack() {
        window.location.reload();
    }

    printResult() {
        const serverName = process.env.REACT_APP_API_SERVER;
        const path = process.env.REACT_APP_ENDPOINT_PDF;
        const endpoint = `${serverName}${path}`;
        const {survey} = this.state;

        fetch(endpoint, {
            method: 'POST',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                survey
            }),
        }).then((response) => response.blob())
            .then(response => {
                if(response) {
                    const file = window.URL.createObjectURL(response);
                    const a = document.createElement("a");
                    a.href = file;
                    a.download = `Survey${new Date().getTime()}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => document.body.removeChild(a), 500);
                } else {
                    alert("Error al generar el arhivo pdf, contacte al administrador");
                }
            })
            .catch(response => {
                console.log(response);
            });
    }

    render() {
        const {currentStep, survey, displayResume} = this.state;
        const {groups} = survey;
        if(displayResume)
            return (
                <Resume
                    survey={survey}
                    goBack={this.goBack.bind(this)}
                    printResult={this.printResult.bind(this)}
                />
            );

        if(!groups) return (
            <div className="p-24 flex justify-center">
                <CircularProgress size={50}/>
            </div>
        );

        const [currentGroup] = groups.filter((item, k) => k === currentStep);

        return (
            <div className="w-full mt-8">
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6} lg={8} >
                        <Card>
                            <CardContent>
                                <Stepper orientation="horizontal" activeStep={currentStep} >
                                    {groups.map((group) => (
                                        <Step key={group.title} >
                                            <StepLabel>
                                                <span>&nbsp;</span>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div className="pt-16 px-12">
                                    <Typography variant="title" className="mb-24">
                                        {currentGroup.title}
                                    </Typography>
                                </div>
                                <div className="py-12 pt4 px-32 w-full">
                                    {this.renderItems(currentGroup)}
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="text-right px-12">
                                    <Typography variant="title">
                                        <strong>Total:</strong> <span>{`${Math.ceil(survey.average_value)}%`}</span>
                                    </Typography>
                                </div>
                                <div className="flex justify-around  mt-12 my-4">
                                    <div className="w-1/2 flex justify-start">
                                        {this.state.currentStep > 0 && (
                                            <Button onClick={this.prevStep.bind(this)} variant="contained">
                                                <ArrowBack className="mr-4"/> Anterior
                                            </Button>
                                        )}
                                    </div>
                                    <div className="w-1/2 flex justify-end">
                                        {currentStep < (groups.length - 1) && (
                                            <Button onClick={this.nextStep.bind(this)} variant="contained">
                                                Siguiente <ArrowForward className="ml-4"/>
                                            </Button>
                                        )}
                                        {currentStep === (groups.length - 1) && (
                                            <Button disabled={this.state.disableButton} onClick={this.onFinish.bind(this)} variant="contained">
                                                Enviar <Send className="ml-4"/>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Survey);