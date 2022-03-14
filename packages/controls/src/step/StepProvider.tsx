/* eslint-disable react/no-array-index-key */
import debug from 'debug';
import {cloneElement, Children, useMemo, useState} from 'react';
import {Prompt} from 'react-router-dom';
import {Grid, Step as SemanticStep} from 'semantic-ui-react';
import {FormStep} from './FormStep';
import {Step} from './Step';
import {StepContext} from './stepContext';

const d = debug('thx.controls.step.StepProvider');

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

	const titles: string[] = [];
	const children: JSX.Element[] = [];

	Children.forEach(props?.children, (child, index) => {
		if (!child) return;
		if (child?.type !== Step && child?.type !== FormStep) {
			throw new Error(`Can not render '${child?.type}' as child of 'StepProvider'. Must be of type 'Step' or 'FormStep'`);
		}
		if (child.props.hidden) {
			if (typeof child.props.hidden === 'function' && !child.props.hidden(state, index)) {
				titles.push(child?.props?.title || '');
				children.push(cloneElement(child, {step: index, key: child?.key || index.toString()}));
			}
		} else {
			titles.push(child?.props?.title || '');
			children.push(cloneElement(child, {step: index, key: child?.key || index.toString()}));
		}
	});

	const onNavigate = () => 'Are you sure you want to end this process? All the entered data will be lost!';

	const valueProps = useMemo(() => {
		return {
			state,
			handleSubmit: (values: any, stepKey: string) => {
				if (currentStep + 1 === children?.length) {
					setState({...state, [stepKey]: values});
					setIsSubmitting(true);
					props.onSubmit({...state, [stepKey]: values});
				} else {
					setState({...state, [stepKey]: values});
					setCurrentStep(currentStep + 1);
				}
			},
		};
	}, [children?.length, currentStep, props, state]);

	if (props.vertical) {
		return (
			<StepContext.Provider value={valueProps}>
				{props.warnOnReroute && <Prompt message={onNavigate} when={!isSubmitting} />}
				<Grid divided stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<SemanticStep.Group ordered size="mini" vertical widths={1}>
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
		<StepContext.Provider value={valueProps}>
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
