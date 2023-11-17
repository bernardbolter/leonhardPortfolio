<?php

function add_theme_scripts() {
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'wp-api-request' );
	wp_enqueue_style( 'style', get_stylesheet_uri(), array(), '202311v2');
	wp_enqueue_script( 'script', get_template_directory_uri() . '/js/bundle-min.js', array( 'jquery' ), 1.1, true );
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

/* Disable WordPress Admin Bar for all users */
add_filter( 'show_admin_bar', '__return_false' );