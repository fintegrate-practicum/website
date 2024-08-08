import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const stepDescription = [
	'step 1 description',
	'step 2 description',
	'step 3 description',
	'step 4 description',
];

const BaseWizard = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [open, setOpen] = useState(false);

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			setOpen(false);
			setActiveStep(0); // Reset the stepper
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant='outlined' onClick={handleOpen}>
				Open Wizard
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='wizard-modal-title'
				aria-describedby='wizard-modal-description'
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 900,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stepper activeStep={activeStep} style={{ margin: '15px' }}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel> {step} </StepLabel>
							</Step>
						))}
					</Stepper>
					<Typography style={{ margin: '15px' }}>
						{' '}
						{stepDescription[activeStep]}{' '}
					</Typography>
					<Button
						onClick={handleBack}
						disabled={activeStep === 0}
						variant='text'
						style={{ textTransform: 'none', margin: '10px' }}
					>
						{' '}
						Back
					</Button>
					<Button
						onClick={handleNext}
						variant='text'
						style={{ textTransform: 'none' }}
					>
						{' '}
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default BaseWizard;
