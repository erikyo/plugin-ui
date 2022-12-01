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
 * This class contain the Enqueue stuff for the backend
 */
class Enqueue extends Base {


	/**
	 * Initialize the class.
	 */
	public function initialize() {
		if ( ! parent::initialize() ) {
			return;
		}

		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_settings_styles' ) );
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_settings_scripts' ) );

		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
	}


	public function enqueue_admin_styles() {
		$asset = include P_PLUGIN_ROOT . 'build/plugin-admin.asset.php';
		\wp_enqueue_style( P_TEXTDOMAIN . '-admin-style', P_PLUGIN_URL . 'build/plugin-admin.css', array(), $asset['version'] );
	}

	public function enqueue_admin_scripts() {
		$asset = include P_PLUGIN_ROOT . 'build/plugin-settings.asset.php';
		\wp_enqueue_script( P_TEXTDOMAIN . '-admin-script', P_PLUGIN_URL . 'build/plugin-admin.js', $asset['dependencies'], $asset['version'], true );
	}

	/**
	 * Register and enqueue admin-settings style sheet.
	 *
	 * @since 0.0.1
	 */
	public function enqueue_settings_styles() {
		$admin_page = \get_current_screen();
		$styles     = array();

		if ( ! \is_null( $admin_page ) && false !== strpos( $admin_page->id, 'plugin' ) ) {
			$asset = include P_PLUGIN_ROOT . 'build/plugin-settings.asset.php';
			\wp_enqueue_style( P_TEXTDOMAIN . '-settings-style', P_PLUGIN_URL . 'build/plugin-settings.css', array(), $asset['version'] );
		}

		wp_enqueue_style(
			'wp-components',
			'/wp-includes/css/dist/components/style.css',
			array()
		);
	}

	/**
	 * Register and enqueue admin-settings JavaScript.
	 *
	 * @since 0.0.1
	 */
	public function enqueue_settings_scripts() {
		$admin_page = \get_current_screen();
		$scripts    = array();

		if ( ! \is_null( $admin_page ) && false !== strpos( $admin_page->id, 'plugin' ) ) {

			include_once P_PLUGIN_ROOT . 'backend/views/options.php';

			$asset = include P_PLUGIN_ROOT . 'build/plugin-settings.asset.php';
			\wp_enqueue_script( P_TEXTDOMAIN . '-settings-script', P_PLUGIN_URL . 'build/plugin-settings.js', $asset['dependencies'], $asset['version'], true );

			\wp_localize_script(
				P_TEXTDOMAIN . '-settings-script',
				'piSettings',
				array(
					'nonce' => wp_create_nonce( P_TEXTDOMAIN ),
					'saved' => $this->settings,
					'settings' => get_plugin_settings()
				)
			);
		}
	}

}
