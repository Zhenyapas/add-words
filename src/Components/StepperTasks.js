import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const funcSteps = (count,countSentences) => ([
  {
    label: (count<5) ? `Add ${5-count} or more words` : `Great, you've added ${count} words!`,
    description: `Just add five words or phrases for a day, to increase your vocabulary.`,
  },
  {
    label: 'Take a daily test.',
    description:
      'Сonsolidate your knowledge with a daily test',
  },
  {
    label:(countSentences<5) ? 'Make a ' + (5 - countSentences) + ' sentences' : `Cool, you've added ${countSentences} sentence`,
    description:
      'Make more than 5 sentences with new words or phrases to practice and use them in real life',
  },
]
);

export default function VerticalLinearStepper(props) {

  const [activeStep, setActiveStep] = React.useState(0);


  const isActiveStep = () => {

    const isStep1 = (props.countWords >= 5) ? true : false;
    const isStep2 = props.takenDailyTest;
    const isStep3 = (props.countSentences >= 5) ? true : false;
    const arrDepends = [isStep1,isStep2,isStep3];
    const index = arrDepends.findIndex((e) => e === false );
    console.log(isStep3);
    console.log(index);
    return (index !== -1) ? index: 3 ;

  }

  const index = isActiveStep();

  React.useEffect(() => {setActiveStep(index)},[index]);
  

const steps = funcSteps(props.countWords,props.countSentences);


  return (
    <Box sx={{ maxWidth: 400, mt:2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>

            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 0 }}>
          <Typography sx={{ml:'10px'}}>All steps completed - you're finished</Typography>
        </Paper>
      )}
    </Box>
  );
}
