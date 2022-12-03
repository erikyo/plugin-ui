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

/**
 * Get the settings of the plugin in a filterable way
 *
 * @since 2.0.0
 * @return array
 */
function pi_get_settings() {
	return apply_filters( 'pi_get_settings', get_option( P_TEXTDOMAIN . '-settings', array() ) );
}


/**
 * It updates the plugin's settings
 *
 * @param array $options An array of options to update.
 *
 * @return array|bool the new options on success / false if failed
 */
function pi_update_settings( array $options ) {
	$old_options = pi_get_settings();

	if ( ! empty( $old_options ) )
		$new_options = array_merge( $old_options, $options );
	else
		$new_options = $options;

	update_option( P_TEXTDOMAIN . '-settings', $new_options ) ;
	return $new_options;
}

/**
 * A function to log a string / array to the "wp-content/debug.log".
 *
 * @param string|array $log_data - The string/array to log.
 *
 * @return void
 */
function pi_log( $log_data ) {
	if ( ! empty( $log_data && WP_DEBUG ) ) {
		// phpcs:disable WordPress.PHP.DevelopmentFunctions.error_log_error_log
		error_log(
			is_string( $log_data )
				? sprintf( "%s: %s", P_TEXTDOMAIN, $log_data )
				// phpcs:disable WordPress.PHP.DevelopmentFunctions.error_log_print_r
				: sprintf( "%s: %s", P_TEXTDOMAIN, print_r( $log_data, true ) )
		);
	}
}
