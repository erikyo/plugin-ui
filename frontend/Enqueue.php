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

namespace pluginui\Frontend;

use pluginui\Engine\Base;

/**
 * Enqueue stuff on the frontend
 */
class Enqueue extends Base {

	/**
	 * Initialize the class.
	 *
	 * @return void|bool
	 */
	public function initialize() {
		parent::initialize();

	}


	/**
	 * Register and enqueue public-facing style sheet.
	 *
	 * @since 2.0.0
	 * @return array
	 */
	public function enqueue_styles() {
		$styles = array();

		return $styles;
	}


	/**
	 * Register and enqueues public-facing JavaScript files.
	 *
	 * @since 2.0.0
	 * @return array
	 */
	public static function enqueue_scripts() {
		$scripts = array();

		return $scripts;
	}


}
