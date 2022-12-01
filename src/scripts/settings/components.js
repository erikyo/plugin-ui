import { useState } from '@wordpress/element';
import { date } from '@wordpress/date';
import {
	Button,
	CheckboxControl,
	ColorPicker,
	DatePicker,
	DateTimePicker,
	Dropdown,
	RadioControl,
	RangeControl,
	SelectControl,
	TextareaControl,
	TextControl,
	TimePicker,
	ToggleControl,
	TreeSelect,
} from '@wordpress/components';

import { pluginOptions } from './index';

export const Field = (props) => {
	return (
		<tr
			style={{ display: 'table-row', borderSpacing: '0 1em' }}
			className={props.name + '-item'}
		>
			<th scope="row" style={{ padding: '16px 8px 16px' }}>
				{props.title}
			</th>
			<td>
				<Element {...props} />
			</td>
		</tr>
	);
};

export const DropDownEl = (props) => {
	return (
		<Dropdown
			position="bottom right"
			renderToggle={({ isOpen, onToggle }) => (
				<>
					<input
						type={'hidden'}
						name={props.name}
						value={props.value}
					/>
					{props.html}
					<Button isLink onClick={onToggle} aria-expanded={isOpen}>
						{props.displayValue}
					</Button>
				</>
			)}
			renderContent={() => props.component}
		></Dropdown>
	);
};

export const Element = ({ data, name, title, component, validation }) => {
	const [value, setValue] = useState(pluginOptions[name]);

	function validate(newData, validator) {
		console.log(newData, validator);
		if (typeof validator !== 'undefined') {
			const regex = new RegExp(validator.pattern.value, 'g');
			if (!regex.test(newData)) {
				data.className = 'invalid';
				data.help = validator.pattern.message;
			} else {
				data.className = 'valid';
				data.help = '';
			}
		}

		setValue(newData);
	}

	// will set the default value for the input
	const inputProps = {
		...data,
		id: name,
		name,
		onChange: (v) => validate(v, validation),
	};

	switch (component) {
		case 'input':
			return <TextControl {...inputProps} value={value} />;
		case 'textarea':
			return <TextareaControl {...inputProps} value={value} />;
		case 'range':
			return (
				<RangeControl {...inputProps} value={parseFloat(value, 2)} />
			);
		case 'select':
			return <SelectControl {...inputProps} selected={value} />;
		case 'radio':
			return <RadioControl {...inputProps} selected={value} />;
		case 'checkbox':
			return (
				<CheckboxControl
					{...inputProps}
					checked={value}
					onChange={() => validate((v) => !v, validation)}
				/>
			);
		case 'toggle':
			return (
				<ToggleControl
					{...inputProps}
					label={name}
					checked={value}
					onChange={() => validate((v) => !v, validation)}
				/>
			);
		case 'tree':
			return <TreeSelect {...inputProps} selected={value} />;
		case 'color-picker':
			return (
				<DropDownEl
					component={<ColorPicker {...inputProps} color={value} />}
					name={name}
					html={
						<span
							className={'color-preview'}
							style={{
								backgroundColor: value || 'initial',
								height: '1rem',
								width: '1rem',
								marginRight: '.25rem',
								display: 'inline-block',
							}}
						></span>
					}
					displayValue={value}
					value={value}
				/>
			);
		case 'date':
			return (
				<DropDownEl
					component={
						<DatePicker {...inputProps} currentDate={date(value || new Date())} />
					}
					name={name}
					displayValue={date('d.m.Y H:i', value, 0)}
					value={value}
				/>
			);
		case 'time':
			return (
				<DropDownEl
					component={
						<TimePicker {...inputProps} currentDate={date(value || new Date())} />
					}
					name={name}
					displayValue={date('d.m.Y H:i', value, 0)}
					value={value}
				/>
			);
		case 'datetime':
			return (
				<DropDownEl
					component={
						<DateTimePicker
							{...inputProps}
							currentDate={date(value || new Date())}
						/>
					}
					name={name}
					displayValue={date('d.m.Y H:i', value, 0)}
					value={value}
				/>
			);
		case 'button':
			return (
				<Button
					{...inputProps}
					text={title}
					onClick={() => window.open(data.action, '_blank')}
				/>
			);
		default:
			return null;
	}
};
