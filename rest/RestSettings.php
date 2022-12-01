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

namespace pluginui\Rest;

use pluginui\Engine\Base;

/**
 * Example class for REST
 */
class RestSettings extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		parent::initialize();

		\add_action( 'rest_api_init', array( $this, 'add_settings_api' ) );
	}

	/**
	 * Examples
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function add_settings_api() {
		$this->add_settings_route();
	}

	public function add_settings_route() {
		\register_rest_route(
			'plugin/v1',
			'/settings/',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => array( $this, 'pi_store_settings' ),
				'args'                => array(
					'nonce' => array(
						'required' => true,
					),
				),
			)
		);
	}

	public function sanitize_options($options) {
		include_once P_PLUGIN_ROOT . 'backend/views/options.php';
		$settings_data = get_plugin_settings();
		$response = [];

		foreach ( $settings_data as $setting ) {
			if (isset($options[ $setting['name'] ])) {
				pi_log( $options[ $setting['name'] ] . ' found' );

				if (isset($setting['required'])) {
					$response['required'][] = $setting['name'];
				}

				if (isset($setting['validation'])) {
					$regex = $setting['validation']['pattern']['value'];
					if ( preg_match("/{$regex}/",$options[ $setting['name'] ])) {
						$response['valid'][] = $setting['name'];
					} else {
						$response['failed'][] =  $setting['name'];
					}
				}

				if (isset($setting['component']) && $setting['component'] === 'radio') {
					$this_value = $options[ $setting['name'] ];
					$found = false;
					foreach($options['date']['options'] as $option) {
						if ($this_value === $option) $found = true;
					}
					if (!$found) $response['value not found'][] = $setting['name'];;
				}

			} else {
				$response['not_found'][] =  $setting['name'];
				pi_log( 'Setting ' . $setting['name'] . ' not found' );
			}
		}

		return [
			'options' => $options,
			'validation' => $response
		];
	}


	/**
	 * Examples
	 *
	 * @since 2.0.0
	 * @param \WP_REST_Request $request Values.
	 * @return \WP_REST_Response|\WP_REST_Request
	 */
	public function pi_store_settings( \WP_REST_Request $request ) {

		// $request is an array with various parameters
		if ( !\wp_verify_nonce( \strval( $request['nonce'] ), P_TEXTDOMAIN ) ) {
			$response = \rest_ensure_response( 'Wrong nonce' );

			if ( \is_wp_error( $response ) ) {
				return $request;
			}

			$response->set_status( 500 );

			return $response;
		}

		$new_options = self::sanitize_options( $request->get_json_params()['options'] );

		if ( ! empty( pi_update_settings($new_options) ) ) {
			$response = \rest_ensure_response( $new_options );
			$response->set_status( 200 );
		} else {
			$response = \rest_ensure_response( 'Something wrong' );
			$response->set_status( 500 );
		}

		return $response;
	}

}
