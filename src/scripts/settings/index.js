/* global piSettings */
export const pluginSettings = piSettings.settings;
export const pluginOptions = piSettings.saved ?? {};

import { SettingsForm } from '../components/SettingsForm';

const formWrap = document.getElementById('plugin-settings');
if (formWrap) {
	wp.element.render(
		<SettingsForm
			fields={pluginSettings}
			options={pluginOptions}
			section={'section'}
			page={'page'}
		/>,
		formWrap
	);
}
