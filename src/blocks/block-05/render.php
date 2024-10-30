<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package block-developer-examples
 */

// Render 5 random posts.

$args = array(
	'post_type'      => 'post',
	'orderby'        => 'rand',
	'posts_per_page' => 5,
);

$the_query = new WP_Query( $args );

if ( $the_query->have_posts() ) {
	echo '<ul>';
	while ( $the_query->have_posts() ) {
		$the_query->the_post();
		echo '<li><a href="' . get_the_permalink() . '">' . get_the_title() . '</a></li>';
	}
	echo '</ul>';
} else {
	echo 'No posts found.';
}
