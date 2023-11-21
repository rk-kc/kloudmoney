import { View } from 'react-native';
import {
	Box,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	FormControlHelper,
	FormControlHelperText,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	Input,
	InputField,
	AlertCircleIcon,
	InputIcon,
} from '@gluestack-ui/themed'; // TODO: Add the missing components
import React from 'react';

interface CustomFormControlProps {
	controlLabel: string;
	controlLabelHelper: string;
	inputType: any;
	inputPlaceholder: string;
	inputDefaultValue?: string;
	errorText?: string;
	isFormDisabled?: boolean;
	isFormInvalid?: boolean;
	isFormReadOnly?: boolean;
	isFormRequired?: boolean;
	inputKeyboardType: any;
}

const CustomFormControl = (props: CustomFormControlProps) => {
	return (
		<FormControl
			size="lg"
			isDisabled={props.isFormDisabled}
			isInvalid={props.isFormInvalid}
			isReadOnly={props.isFormReadOnly}
			isRequired={props.isFormRequired}
		>
			<FormControlLabel mb="$1">
				<FormControlLabelText>{props.controlLabel}</FormControlLabelText>
			</FormControlLabel>
			<Input variant="underlined">
				<InputField
					keyboardType={props.inputKeyboardType}
					type={props.inputType}
					defaultValue={props.inputDefaultValue}
					placeholder={props.inputPlaceholder}
				/>
			</Input>
			<FormControlHelper>
				<FormControlHelperText>
					{props.controlLabelHelper}
				</FormControlHelperText>
			</FormControlHelper>
			<FormControlError>
				<FormControlErrorIcon as={AlertCircleIcon} />
				<FormControlErrorText>{props.errorText}</FormControlErrorText>
			</FormControlError>
		</FormControl>
	);
};

export default CustomFormControl;
