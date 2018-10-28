import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    Stepper,
    StepLabel,
    StepContent,
    Step,
    TextField,
    Divider,
} from '@material-ui/core';
const styles = theme => ({
    item: {
        borderBottom: "1px dashed #EEE",
    },
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
    };

    constructor(props) {
        super(props);
        this.state.survey = data;
        this.maxSteps = data.groups? data.groups.length : 0;
    }

    renderItems(group) {
        const {classes} = this.props;
        const {currentStep} = this.state;
        const {groups} = this.state.survey;
        return (
            <div className="w-full">
                {group.items.map((item, key) => (
                    <div className={`w-full flex items-center ${classes.item}`} key={`group-items-list-element-${group.code}-${key}`}>
                        <div className="w-4/5">
                            <Typography variant="subheading">
                                <span className="mx-4">{item.nomenclature}.</span>
                                {item.title}
                            </Typography>
                        </div>
                        <div className="1/5">
                            <TextField
                                value={item.value}
                                type={"number"}
                                onChange={(e) => this.onChangeInput(e, group.code, item.code)}
                            />
                        </div>
                        <Divider />
                    </div>
                ))}
                <div className="flex justify-center mt-12 my-4">
                    {this.state.currentStep > 0 && (<Button onClick={this.prevStep.bind(this)} variant="raised">Anterior</Button>)}
                    {currentStep < (groups.length - 1) && (<Button onClick={this.nextStep.bind(this)} variant="raised">Siguiente</Button>)}
                </div>
                <div className="flex justify-center my-4">
                    {currentStep === (groups.length - 1) && (<Button onClick={this.onFinish.bind(this)} variant="raised">Enviar</Button>)}
                </div>
            </div>
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
        alert("done!");
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

    render() {
        const {currentStep, survey} = this.state;
        const {groups} = survey;
        return (
            <div className="w-full mt-8">
                <Grid container justify="center">
                    <Grid item xs={12} sm={8} md={6} >
                        <Card>
                            <CardContent>
                                <Stepper orientation="vertical" activeStep={currentStep}>
                                    {groups.map((group) => (
                                        <Step key={group.title}>
                                            <StepLabel>
                                                {group.title}: <strong>{group.average_value}</strong>
                                            </StepLabel>
                                            <StepContent>
                                                <div >
                                                    {this.renderItems(group)}
                                                </div>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </CardContent>
                            <CardContent>
                                <div className="text-right">
                                    <Typography variant="title">Total: <span>{survey.average_value}</span></Typography>
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