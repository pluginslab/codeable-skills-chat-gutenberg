<?php
/**
 * Plugin Name:       Codeable Skills Chat Gutenberg
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       codeable-skills-chat-gutenberg
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_codeable_skills_chat_gutenberg_block_init() {
	// Get all block.json files within the src/blocks/**/block.json directory
	$block_json_files = glob( __DIR__ . '/build/blocks/*/block.json' );

	// Loop through each block.json file and register it
	foreach ( $block_json_files as $block_json_file ) {
		register_block_type( dirname( $block_json_file ) );
	}
}
add_action( 'init', 'create_block_codeable_skills_chat_gutenberg_block_init' );

/**
 * Create settings page.
 *
 * @return void
 */
function codeable_skills_chat_gutenberg_settings_page() {
	add_menu_page(
		'Codeable Skills Chat Gutenberg',
		'Codeable Skills Chat Gutenberg',
		'manage_options',
		'codeable-skills-chat-gutenberg',
		'codeable_skills_chat_gutenberg_settings_page_markup',
		'dashicons-admin-generic',
		100
	);
}
add_action( 'admin_menu', 'codeable_skills_chat_gutenberg_settings_page' );

/**
 * Settings page markup.
 *
 * @return void
 */
function codeable_skills_chat_gutenberg_settings_page_markup() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Codeable Skills Chat Gutenberg', 'codeable-skills-chat-gutenberg' ); ?></h1>
		<div id="codeable-skills-chat-gutenberg"></div>
	</div>
	<?php
}

// Load assets for the index component page from /build/index.js
function codeable_skills_chat_gutenberg_assets() {
	$assets = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'codeable-skills-chat-gutenberg',
		plugins_url( 'build/index.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);

	wp_enqueue_style( 'wp-block-editor' );
}
add_action( 'admin_enqueue_scripts', 'codeable_skills_chat_gutenberg_assets' );
