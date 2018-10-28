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
        "groups":[
            {
                "code":1,
                "title":"Group 1",
                "average_value":0,
                "items":[
                    {
                        "code":1,
                        "title":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto debitis nemo nesciunt. Debitis distinctio, expedita explicabo minima placeat quas quisquam quo repellat tempora tenetur! Accusamus aperiam dolorem expedita numquam ullam?",
                        "nomenclature":"A",
                        "value":0
                    },
                    {
                        "code":2,
                        "title":"Item",
                        "nomenclature":"B",
                        "value":0
                    },
                    {
                        "code":3,
                        "title":"Item",
                        "nomenclature":"C",
                        "value":0
                    },
                    {
                        "code":4,
                        "title":"Item",
                        "nomenclature":"D",
                        "value":0
                    }
                ]
            },
            {
                "code":2,
                "title":"Group 2",
                "average_value":0,
                "items":[
                    {
                        "code":1,
                        "title":"Item",
                        "nomenclature":"A",
                        "value":0
                    },
                    {
                        "code":2,
                        "title":"Item",
                        "nomenclature":"B",
                        "value":0
                    },
                    {
                        "code":3,
                        "title":"Item",
                        "nomenclature":"C",
                        "value":0
                    },
                    {
                        "code":4,
                        "title":"Item",
                        "nomenclature":"D",
                        "value":0
                    }
                ]
            }
        ]
};

class Survey extends Component {
    maxSteps = 0;
    state = {
        currentStep: 0,
        survey: {},
        displayResume: false,
    };

    constructor(props) {
        super(props);
        this.state.survey = [];
        this.maxSteps = data.groups? data.groups.length : 0;
    }

    componentDidMount() {
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
        const value = e.target.value;
        const {groups} = this.state.survey;
        let generalAverageSum = 0;
        groups.forEach(group => {
            let averageGroupSum = 0;
            group.items.forEach(item => {
                if(group.code === groupCode && item.code === itemCode) {
                    item.value = value;
                }
                if(isNaN(item.value) || item.value === "") {
                    averageGroupSum += 0;
                } else {
                    averageGroupSum += parseInt(item.value);
                }
            });
            group.average_value = averageGroupSum / group.items.length;
            generalAverageSum += group.average_value;
        });

        this.setState({
            survey: {
                average_value: generalAverageSum / (groups? groups.length : 0),
                groups: [
                    ...groups,
                ],
            }
        })
    }

    onFinish() {
        this.setState({
            displayResume: true,
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
        alert("about to print");
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

        return (
            <div className="w-full mt-8">
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6} lg={8} >
                        <Card>
                            <CardContent>
                                <Stepper orientation="vertical" activeStep={currentStep}>
                                    {groups.map((group) => (
                                        <Step key={group.title}>
                                            <StepLabel>
                                                <div className="w-full flex">
                                                    {group.title}: <span className="ml-auto"><strong>{Math.ceil(group.average_value)}%</strong></span>
                                                </div>
                                            </StepLabel>
                                            <StepContent className="w-full">
                                                    {this.renderItems(group)}
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </CardContent>
                            <CardContent>
                                <div className="text-right px-12">
                                    <Typography variant="title">
                                        <strong>Total:</strong> <span>{Math.ceil(survey.average_value)}</span>
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
                                            <Button onClick={this.onFinish.bind(this)} variant="contained">
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