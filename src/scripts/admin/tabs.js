import { getFromQueryString } from '../utils/helpers';

/**
 *  It takes an array of tabs and an array of sections, and when a tab is clicked, it removes the active class from all tabs,
 *  adds the active class to the clicked tab, hides all sections, and shows the section that matches the clicked tab
 */
class tabSelector {
	constructor({ tabs, sections }) {
		this.tabs = tabs;
		this.sections = sections;
		this.currentTab = undefined;
	}

	/* Returning the first tab in the tabs object. */
	defaultTab = () => {
		return this.tabs[Object.keys(this.tabs)[0]].dataset.section;
	};

	validateTabs() {
		const tabsEntries = Object.values(this.tabs);
		const sectionsEntries = Object.values(this.sections);
		if (tabsEntries.length !== sectionsEntries.length) {
			throw new Error(
				'Tabs and sections must be the same number of items'
			);
		}

		const validTabs = tabsEntries
			.map((tab) =>
				sectionsEntries.filter(
					(section) => section.dataset.section === tab.dataset.section
				)
			)
			.filter((item) => item.length > 0);

		return validTabs.length === tabsEntries.length;
	}

	/**
	 * When a tab is clicked, remove the active class from all tabs, add the active class to the clicked tab,
	 * hide all sections, and show the section that matches the clicked tab.
	 *
	 * @param {string} selected - The section that was selected.
	 */
	selectSection(selected) {
		/* remove the active class from all tabs, add the active class to the clicked tab */
		this.tabs.forEach((tab) => {
			if (selected === tab.dataset.section) {
				tab.classList.add('nav-tab-active');
			} else {
				tab.classList.remove('nav-tab-active');
			}
		});
		/* hide all sections, and show the section that matches the clicked tab */
		this.sections.forEach((section) => {
			if (selected !== section.dataset.section) {
				section.classList.add('hide');
			} else {
				section.classList.remove('hide');
			}
		});
		// set the current tab
		return (this.currentTab = selected);
	}

	/**
	 * It changes the tab by changing the query string and dispatching a custom event
	 *
	 * @param {string} nextTab - the next tab to display
	 */
	changeTab(nextTab) {
		const url = new URLSearchParams(window.location.search);

		// set the query string
		url.set('tab', nextTab);
		const nextPath = window.location.pathname + '?' + url.toString();

		// add the current query string to history
		window.history.pushState(null, '', nextPath);

		// display changes
		this.selectSection(nextTab);
	}

	/**
	 * It takes an event, prevents the default action, gets the target tab from the event, creates a new URL,
	 * sets the tab parameter to the target tab, pushes the new URL to the history, and dispatches a custom event
	 *
	 * @param {Event[target]} e - the event object
	 */
	showTab(e) {
		e.preventDefault();
		this.changeTab(e.target.dataset.section);
	}

	/**
	 * It gets the current tab from the query string and then calls the selectSection function with the current tab as the argument
	 *
	 * @param {PopStateEvent} e - the history change event
	 */
	onLocationChange(e) {
		this.currentTab =
			getFromQueryString(e.target.location.search, 'tab') ??
			this.defaultTab;
		this.selectSection(this.currentTab);
	}

	/**
	 * It sets the current tab to the tab specified in the query string, or the default tab if no tab is specified in the query string
	 */
	init() {
		// Enable only if tabs are found inside pluginui container
		if (Object.keys(this.tabs).length === 0) {
			console.log('no tabs found!');
			return true;
		}
		// Check tabs congruency
		else if (!this.validateTabs()) {
			throw new Error('tabs validation check failed!');
		}

		this.currentTab =
			getFromQueryString(window.location.search, 'tab') ??
			this.defaultTab;

		for (const tab of this.tabs) {
			tab.addEventListener('click', (e) => this.showTab(e));
		}

		window.addEventListener('popstate', (e) => this.onLocationChange(e));
	}
}

const pluginui = document.querySelector('#pluginui');
if (pluginui) {
	const tabControl = new tabSelector({
		tabs: pluginui.querySelectorAll('.nav-tab'),
		sections: pluginui.querySelectorAll('.nav-section'),
	});

	/* Initialize tabControl */
	tabControl.init();

	/* Making the tabControl object available to the global window object. */
	if (typeof window.pluginUI === 'undefined') window.pluginUI = {};
	window.pluginUI.tabs = tabControl;
}
