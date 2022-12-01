<?php

/**
 * @package   pluginui
 * @author    Erik Golinelli <erik@codekraft.it>
 * @copyright 2022 Codekraft
 * @license   GPL 2.0+
 * @link      https://codekraft.it
 *
 * Plugin Name:     pluginui
 * Plugin URI:      @TODO
 * Description:     @TODO
 * Version:         2.0.0
 * Author:          Erik Golinelli
 * Author URI:      https://codekraft.it
 * Text Domain:     pluginui
 * License:         GPL 2.0+
 * License URI:     http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:     /languages
 * Requires PHP:    7.4
 * WordPress-Plugin-Boilerplate-Powered: v3.3.0
 */

// If this file is called directly, abort.
if ( !defined( 'ABSPATH' ) ) {
	die( 'We\'re sorry, but you can not directly access this file.' );
}

define( 'P_VERSION', '2.0.0' );
define( 'P_TEXTDOMAIN', 'pluginui' );
define( 'P_NAME', 'pluginui' );
define( 'P_PLUGIN_ROOT', plugin_dir_path( __FILE__ ) );
define( 'P_PLUGIN_ABSOLUTE', __FILE__ );
define( 'P_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

define( 'P_MIN_PHP_VERSION', '7.3' );
define( 'P_WP_VERSION', '5.3' );


if ( version_compare( PHP_VERSION, P_MIN_PHP_VERSION, '<=' ) ) {
	add_action(
		'admin_init',
		static function() {
			deactivate_plugins( plugin_basename( __FILE__ ) );
		}
	);
	add_action(
		'admin_notices',
		static function() {
			echo wp_kses_post(
			sprintf(
				'<div class="notice notice-error"><p>%s</p></div>',
				__( '"plugin" requires PHP 7.3 or newer.', P_TEXTDOMAIN )
			)
			);
		}
	);

	// Return early to prevent loading the plugin.
	return;
}

$plugin_libraries = require P_PLUGIN_ROOT . 'vendor/autoload.php'; //phpcs:ignore

require_once P_PLUGIN_ROOT . 'functions/functions.php';

if ( ! wp_installing() ) {
	register_activation_hook( P_TEXTDOMAIN . '/' . P_TEXTDOMAIN . '.php', array( new \pluginui\Backend\ActDeact, 'activate' ) );
	register_deactivation_hook( P_TEXTDOMAIN . '/' . P_TEXTDOMAIN . '.php', array( new \pluginui\Backend\ActDeact, 'deactivate' ) );
	add_action(
		'plugins_loaded',
		static function () use ( $plugin_libraries ) {
			new \pluginui\Engine\Initialize( $plugin_libraries );
		}
	);
}
