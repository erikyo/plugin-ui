<?php
/**
 * Represents the view for the administration dashboard.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end user.
 *
 * @package   plugin
 * @author    Erik Golinelli <erik@codekraft.it>
 * @copyright 2022 Codekraft
 * @license   GPL 2.0+
 * @link      https://codekraft.it
 */

$sections = array(
				'dashboard' => array(
								'title' => __( 'Dashboard', P_TEXTDOMAIN )
				),
				'importer' => array(
								'title' => __( 'Importer', P_TEXTDOMAIN )
				),
				'manager' => array(
								'title' => __( 'Manager', P_TEXTDOMAIN )
				),
				'settings' => array(
								'title' => __( 'Settings', P_TEXTDOMAIN )
				),
);

/**
 * It generates a tabbed interface for the settings page
 *
 * @param array $sections An array of sections. Each section is an array with a title and a slug.
 * @param array $selected The slug of the section that should be displayed.
 */
function generate_tabs($sections, $selected) {
	if (is_array($sections)) {
		/* Add the tabs */
		echo '<nav class="nav-tab-wrapper">';
			foreach ($sections as $slug => $section) {
				printf(
					'<a class="nav-tab%s" href="?page=%s&tab=%s" data-section="%s">%s</a>',
					$selected === $slug ? ' nav-tab-active' : '',
					P_TEXTDOMAIN,
					esc_attr( $slug ),
					esc_attr( $slug ),
					esc_html( $section['title'] )
				);
			}
		echo '</nav>';

		/* then add the content for each tab */
		foreach ($sections as $slug => $section) {
			printf(
				'<div id="tab-%s" class="section wrap %s" data-section="%s">',
				$slug,
				$selected === $slug ? 'selected' : 'hide',
				$slug
			);
			require_once plugin_dir_path( __FILE__ ) . 'settings-'.esc_attr($slug).'.php';
			echo '</div>';
		}
	}
}

$selected = isset($_GET["tab"]) && array_key_exists($_GET["tab"], $sections) ? sanitize_title($_GET["tab"]) : array_keys($sections)[0];

?>
<div id="header">
	<div class="main"></div>
	<div class="sub"></div>
</div>
<div id="<?php echo P_TEXTDOMAIN ?>" class="wrap">

	<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>

	<?php generate_tabs($sections, $selected); ?>

	<div class="right-column-settings-page metabox-holder">
		<div class="postbox">

		</div>
	</div>

	<div class="footer-settings-page metabox-holder">
		<p class="aligncenter"><?php printf( "%s %s", esc_html__( 'plugin', P_TEXTDOMAIN ), gmdate( 'Y' ) ); ?></p>
	</div>
</div>
