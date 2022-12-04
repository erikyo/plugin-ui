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
	const [val, setVal] = useState(data.value ?? '');

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

		setVal(newData);
	}

	// will set the default value for the input
	const inputProps = {
		...data,
		id: name,
		name,
		value: val,
		onChange: (v) => validate(v, validation),
	};

	switch (component) {
		case 'input':
			return <TextControl {...inputProps} />;
		case 'textarea':
			return <TextareaControl {...inputProps} />;
		case 'range':
			return <RangeControl {...inputProps} value={parseFloat(val, 2)} />;
		case 'select':
			return <SelectControl {...inputProps} />;
		case 'radio':
			return <RadioControl {...inputProps} selected={val} />;
		case 'checkbox':
			return (
				<CheckboxControl
					{...inputProps}
					checked={val}
					onChange={(v) => validate(!v, validation)}
				/>
			);
		case 'toggle':
			return (
				<ToggleControl
					{...inputProps}
					label={name}
					checked={val}
					onChange={() => validate((v) => !v, validation)}
				/>
			);
		case 'tree':
			return <TreeSelect {...inputProps} selected={val} />;
		case 'color-picker':
			return (
				<DropDownEl
					component={<ColorPicker {...inputProps} color={val} />}
					name={name}
					html={
						<span
							className={'color-preview'}
							style={{
								backgroundColor: val || '#000',
								height: '1rem',
								width: '1rem',
								marginRight: '.25rem',
								display: 'inline-block',
							}}
						></span>
					}
					displayValue={val || 'Choose a color'}
					value={val}
				/>
			);
		case 'date':
			return (
				<DropDownEl
					component={
						<DatePicker
							{...inputProps}
							currentDate={val || new Date()}
						/>
					}
					name={name}
					displayValue={date('d.m.Y H:i', val, 0)}
					value={val}
				/>
			);
		case 'time':
			return (
				<DropDownEl
					component={
						<TimePicker
							{...inputProps}
							currentDate={val || new Date()}
						/>
					}
					name={name}
					displayValue={date('d.m.Y H:i', val, 0)}
					value={val}
				/>
			);
		case 'datetime':
			return (
				<DropDownEl
					component={
						<DateTimePicker
							{...inputProps}
							currentDate={val || new Date()}
						/>
					}
					name={name}
					displayValue={date('d.m.Y H:i', val, 0)}
					value={val}
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
