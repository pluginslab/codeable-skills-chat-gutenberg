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
 * Register the rest route to get random posts.
 *
 * @since 1.0.0
 */
function myplugin_register_random_posts_route() {
	register_rest_route(
		'schmitzoide/v1',
		'/random-posts',
		array(
			'methods'             => 'GET',
			'callback'            => 'myplugin_get_random_posts',
			'permission_callback' => '__return_true',
		)
	);
}
add_action( 'rest_api_init', 'myplugin_register_random_posts_route' );

/**
 * Get random posts.
 *
 * @return WP_REST_Response
 * @since 1.0.0
 */
function myplugin_get_random_posts() {
	$args  = array(
		'post_type'      => 'post',
		'posts_per_page' => 5,
		'orderby'        => 'rand',
	);
	$query = new WP_Query( $args );

	$posts = array();
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			$posts[] = array(
				'id'    => get_the_ID(),
				'title' => array( 'rendered' => get_the_title() ),
				'link'  => get_permalink(),
			);
		}
	}
	wp_reset_postdata();

	return rest_ensure_response( $posts );
}
