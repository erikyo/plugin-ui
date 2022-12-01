<?php

/**
 * plugin
 *
 * @package   plugin
 * @author    Erik Golinelli <erik@codekraft.it>
 * @copyright 2022 Codekraft
 * @license   GPL 2.0+
 * @link      https://codekraft.it
 */

namespace pluginui\Backend;

use pluginui\Engine\Base;

/**
 * Create the settings page in the backend
 */
class Settings_Page extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		if ( !parent::initialize() ) {
			return;
		}

		// Add the options page and menu item.
		\add_action( 'admin_menu', array( $this, 'add_plugin_admin_menu' ) );

		$realpath        = (string) \realpath( \dirname( __FILE__ ) );
		$plugin_basename = \plugin_basename( \plugin_dir_path( $realpath ) . P_TEXTDOMAIN . '.php' );
		\add_filter( 'plugin_action_links_' . $plugin_basename, array( $this, 'add_action_links' ) );

		$plugin_name = 'pi-settings';
		add_filter( "sanitize_option_{$plugin_name}", array( $this, "sanitize_options_{$plugin_name}" ) );
	}

	/**
	 * Register the administration menu for this plugin into the WordPress Dashboard menu.
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function add_plugin_admin_menu() {
		/*
		 * Add a settings page for this plugin to the main menu
		 *
		 */
		\add_menu_page( \__( 'plugin Settings', P_TEXTDOMAIN ), P_NAME, 'manage_options', P_TEXTDOMAIN, array( $this, 'display_plugin_admin_page' ), 'dashicons-hammer', 50 );
	}

	/**
	 * Render the settings page for this plugin.
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function display_plugin_admin_page() {
		include_once P_PLUGIN_ROOT . 'backend/views/admin.php';
	}

	/**
	 * Add settings action link to the plugins page.
	 *
	 * @since 2.0.0
	 * @param array $links Array of links.
	 * @return array
	 */
	public function add_action_links( array $links ) {
		return \array_merge(
			array(
				'settings' => '<a href="' . \admin_url( 'options-general.php?page=' . P_TEXTDOMAIN ) . '">' . \__( 'Settings', P_TEXTDOMAIN ) . '</a>',
				),
			$links
		);
	}

}
