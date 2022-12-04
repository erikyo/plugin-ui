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
use WP_Query;

/**
 * Example class for REST
 */
class RestAdmin extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		parent::initialize();

		\add_action( 'rest_api_init', array( $this, 'pi_api' ) );
	}

	/**
	 * Examples
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function pi_api() {
		$this->add_manager_route();
	}


	public function add_manager_route() {
		\register_rest_route(
			'plugin/v1',
			'/manager/query/',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => array( $this, 'pi_manager_query' ),
				'args'                => array(
					'nonce' => array(
						'required' => true,
					),
				),
			)
		);
		\register_rest_route(
			'plugin/v1',
			'/manager/data/',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => array( $this, 'pi_manager_get_data' ),
				'args'                => array(
					'nonce' => array(
						'required' => true,
					),
				),
			)
		);
	}

	public function pi_manager_get_data(\WP_REST_Request $request) {

		// $request is an array with various parameters
		if ( !\wp_verify_nonce( \strval( $request['nonce'] ), P_TEXTDOMAIN ) ) {
			$response = \rest_ensure_response( 'Wrong nonce' );

			if ( \is_wp_error( $response ) ) {
				return $request;
			}

			$response->set_status( 500 );

			return $response;
		}

		$datatype = $request->get_json_params()['datatype'];

		if ($datatype === 'categories') {
			$categories = get_terms( array( 'taxonomy' => 'product_cat' ) );
			if ( ! empty( $categories ) ) {
				$response = \rest_ensure_response( $categories );
				$response->set_status( 200 );
			}
		} elseif ($datatype === 'authors') {
			$authors = get_users(array( 'fields' => array( 'ID', 'display_name' ) ));
			if ( ! empty( $authors ) ) {
				$response = \rest_ensure_response( $authors );
				$response->set_status( 200 );
			}
		} else {
			$response = \rest_ensure_response( array("error"=>'no data for requested datatype') );
			$response->set_status( 500 );
		}

		return $response;
	}

	public function pi_manager_query(\WP_REST_Request $request) {

		// $request is an array with various parameters
		if ( !\wp_verify_nonce( \strval( $request['nonce'] ), P_TEXTDOMAIN ) ) {
			$response = \rest_ensure_response( 'Wrong nonce' );

			if ( \is_wp_error( $response ) ) {
				return $request;
			}

			$response->set_status( 500 );

			return $response;
		}

		$query_params = $request->get_json_params()['args'];

		if (!empty($query_params)) {
			$query = new WP_Query( $query_params );
			if ( $query->have_posts() ) {
				$posts = $query->posts;
				$response = \rest_ensure_response( $posts );
				$response->set_status( 200 );
			} else {
				if (is_wp_error($query)) {
					$response = \rest_ensure_response( array("error"=>'query_error') );
					$response->set_status( 500 );
				} else {
					$response = \rest_ensure_response( 'end' );
					$response->set_status( 200 );
				}
			}

		} else {
			$response = \rest_ensure_response( array("error"=>'query_params is empty') );
			$response->set_status( 500 );
		}

		return $response;
	}
}
