import debug from 'debug';
import {Prompt} from 'react-router-dom';
import React, {useState, Children} from 'react';
import {Grid, Step as SemanticStep} from 'semantic-ui-react';
import {StepContext} from './stepContext';
import {FormStep} from './FormStep';
import {Step} from './Step';

const d = debug('thx.controls.StepProvider');

interface StepProviderProps {
	children: (JSX.Element | null | false)[];
	onSubmit: (values: any) => void;
	values?: any;
	warnOnReroute?: boolean;
	vertical?: boolean;
}

export function StepProvider(props: StepProviderProps) {
	const [state, setState] = useState(props.values || {});
	const [currentStep, setCurrentStep] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onNavigate = () => {
		if (currentStep !== 0) {
			setCurrentStep(currentStep - 1);
			return false;
		}
		return 'If you leave this page you will lose all the entered data.';
	};

	const titles: string[] = [];
	const children: JSX.Element[] = [];
	Children.forEach(props?.children, (child, index) => {
		if (!child) return;
		if (child?.type !== Step && child?.type !== FormStep)
			throw new Error(`Can not render '${child?.type}' as child of 'StepProvider'. Must be of type 'Step' or 'FormStep'`);
		titles.push(child?.props?.title || '');
		children.push(React.cloneElement(child, {step: index, key: child?.key || index.toString()}));
	});

	const handleSubmit = (values: any) => {
		if (currentStep + 1 === children?.length) {
			setState({...state, [currentStep]: values});
			setIsSubmitting(true);
			props.onSubmit({...state, [currentStep]: values});
		} else {
			setState({...state, [currentStep]: values});
			setCurrentStep(currentStep + 1);
		}
	};

	if (props.vertical) {
		return (
			<StepContext.Provider value={{state, handleSubmit}}>
				{props.warnOnReroute && <Prompt message={onNavigate} when={!isSubmitting} />}
				<Grid divided stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<SemanticStep.Group ordered size="mini" vertical={props.vertical} widths={1}>
								{titles?.map((title, index) => {
									return (
										<SemanticStep
											key={index.toString()}
											completed={index < Object.keys(state).length}
											active={currentStep === index}
											onClick={() => setCurrentStep(index)}
											disabled={index > Object.keys(state).length}
										>
											<SemanticStep.Content>
												<SemanticStep.Title>{title}</SemanticStep.Title>
											</SemanticStep.Content>
										</SemanticStep>
									);
								})}
							</SemanticStep.Group>
						</Grid.Column>
						<Grid.Column width={13}>{children?.[currentStep]}</Grid.Column>
					</Grid.Row>
				</Grid>
			</StepContext.Provider>
		);
	}

	return (
		<StepContext.Provider value={{state, handleSubmit}}>
			{props.warnOnReroute && <Prompt message={onNavigate} />}
			<SemanticStep.Group ordered size="mini">
				{titles?.map((title, index) => {
					return (
						<SemanticStep
							key={index.toString()}
							completed={index < Object.keys(state).length}
							active={currentStep === index}
							onClick={() => setCurrentStep(index)}
							disabled={index > Object.keys(state).length}
						>
							<SemanticStep.Content>
								<SemanticStep.Title>{title}</SemanticStep.Title>
							</SemanticStep.Content>
						</SemanticStep>
					);
				})}
			</SemanticStep.Group>
			{children?.[currentStep]}
		</StepContext.Provider>
	);
}
