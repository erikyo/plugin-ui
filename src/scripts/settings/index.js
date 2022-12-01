/* global piSettings */
import { Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Field } from './components';
import { updateOption } from '../utils/fetch';

export const pluginSettings = piSettings.settings;
export const pluginOptions = piSettings.saved ?? {};

export const SettingsForm = (props) => {
	const { fields, section, page } = props ?? {};
	const [wait, setWait] = useState(false);
	const formName = page + '-settings';

	/**
	 * It takes the form data, merges it with the existing plugin options, and then sends it to the server to be saved
	 *
	 * @param {Object} formData - The data from the form.
	 */
	function storeOptions(formData) {
		setWait(true);

		const newSettings = { ...pluginOptions, ...formData };

		updateOption(newSettings, piSettings.nonce)
			.then(() => {
				return setWait(false);
			})
			.catch((err) => console.log(err));
	}

	/**
	 * `handleSubmit` is a function that takes an event as an argument, prevents the default action of the event, creates an object from the form data, and then stores the object in local storage
	 *
	 * @param {Event} event - The event object that is passed to the event handler.
	 */
	function handleSubmit(event) {
		event.preventDefault();
		const formData = Object.fromEntries(new window.FormData(event.target));
		storeOptions(formData);
	}

	/**
	 * If the user presses the `Ctrl` or `Cmd` key and the `s` key, then prevent the default action of the browser (which is to save the page), and instead save the form data to the browser's storage
	 *
	 * @param {Event} event - The event object that was triggered.
	 */
	function onkeydown(event) {
		const charCode = String.fromCharCode(event.which).toLowerCase();
		if ((event.ctrlKey || event.metaKey) && charCode === 's') {
			event.preventDefault();
			const formData = Object.fromEntries(
				new window.FormData(document.getElementById(formName))
			);
			storeOptions(formData);
		}
	}

	return (
		<form
			method="post"
			action={'options.php'}
			id={formName}
			onKeyDown={onkeydown}
			onSubmit={handleSubmit}
			className={'card'}
		>
			<h2>{section}</h2>
			<table
				className={section + '-table'}
				role="presentation"
				title={section}
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

export const formWrap = document.getElementById('plugin-settings') ?? {};
wp.element.render(
	<SettingsForm fields={pluginSettings} section={'section'} page={'page'} />,
	formWrap
);
