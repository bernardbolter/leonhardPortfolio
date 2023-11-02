<?php

function add_theme_scripts() {
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'wp-api-request' );
	wp_enqueue_style( 'style', get_stylesheet_uri() );
	wp_enqueue_script( 'script', get_template_directory_uri() . '/js/bundle.js', array( 'jquery' ), 1.1, true );
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );