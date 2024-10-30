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

function codeable_skills_chat_gutenberg_register_post_meta() {
	register_post_meta(
		'',
		'codeable_skills_chat_gutenberg',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
		)
	);
}
add_action( 'init', 'codeable_skills_chat_gutenberg_register_post_meta' );
