/* global piSettings */
import apiFetch from '@wordpress/api-fetch';

import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { Field } from './SettingsFields';

import { updateOption } from '../utils/fetch';

export const SettingsForm = ({ fields, options, section, page }) => {
	const [wait, setWait] = useState(false);
	const formName = page + '-settings';
	const formEl = document.getElementById(formName);

	apiFetch.use(apiFetch.createNonceMiddleware(piSettings.nonce));

	fields.forEach((field) => {
		field.data = field.data || {};
		field.data.value = options[field.name] || field.data.default || '';
	});

	/**
	 * It takes the form data, merges it with the existing plugin options, and then sends it to the server to be saved
	 *
	 * @param {Object} formData - The data from the form.
	 */
	function storeOptions(formData) {
		setWait(true);
		console.log('saving', formData);

		const newSettings = { ...options, ...formData };

		updateOption(newSettings, piSettings.nonce)
			.then(() => {
				return setWait(false);
			})
			.catch((err) => console.log(err));
	}

	/**
	 * `handleSubmit` is a function that takes an event as an argument, prevents the default action of the event, creates an object from the form data,
	 * and then stores the object in local storage
	 *
	 * @param {Event} event - The event object that is passed to the event handler.
	 */
	function handleSubmit(event) {
		event.preventDefault();
		storeOptions(getFormData(event.target));
	}

	/**
	 * It takes a form element and returns an object with the form's data
	 *
	 * @param {HTMLElement} form - the form id
	 */
	const getFormData = (form) => Object.fromEntries(new window.FormData(form));

	/**
	 * If the user presses the `Ctrl` or `Cmd` key and the `s` key, then prevent the default action of the browser (which is to save the page),
	 * and instead save the form data to the browser's storage
	 *
	 * @param {Event} event - The event object that was triggered.
	 */
	function onkeydown(event) {
		const charCode = String.fromCharCode(event.which).toLowerCase();
		if ((event.ctrlKey || event.metaKey) && charCode === 's') {
			event.preventDefault();
			storeOptions(() => getFormData(formEl));
		}
	}

	return (
		<form
			method="post"
			action={'options.php'}
			id={formName}
			onSubmit={handleSubmit}
			className={'card'}
		>
			<h2>
				{page} - {section}
			</h2>
			<table
				className={section + '-table'}
				role="presentation"
				title={section}
				onKeyDown={onkeydown}
			>
				<tbody>
					{fields
						? fields.map((item, index) => (
								<Field key={index} {...item} />
						  ))
						: null}
				</tbody>
			</table>
			<Button type="submit" className="button button-primary">
				{wait ? '⏰ ' + __('Saving…') : __('Submit')}
			</Button>
		</form>
	);
};
