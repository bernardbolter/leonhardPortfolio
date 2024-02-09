<?php

function add_theme_scripts() {
	wp_enqueue_script( 'wp-api' );
	wp_enqueue_script( 'wp-api-request' );
	wp_enqueue_style( 'main', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'custom', get_template_directory_uri() . '/custom3.css?v=1002' );
	wp_enqueue_script( 'script', get_template_directory_uri() . '/js/bundle.js', array( 'jquery' ), 1.1, true );
	wp_enqueue_script( 'a-frame', 'https://aframe.io/releases/1.5.0/aframe.min.js', false );
}
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

/* Disable WordPress Admin Bar for all users */
add_filter( 'show_admin_bar', '__return_false' );

function my_manage_columns( $columns ) {
	unset($columns['date']);
	unset($columns['author']);
	unset($columns['categories']);
	unset($columns['tags']);
	unset($columns['comments']);
	return $columns;
  }
  
  function my_column_init() {
	add_filter( 'manage_posts_columns' , 'my_manage_columns' );
  }
  add_action( 'admin_init' , 'my_column_init' );

  add_filter( 'quick_edit_show_taxonomy', function( $show, $taxonomy_name, $view ) {

    if ( 'category' == $taxonomy_name )
        return false;

	if ( 'tags' == $taxonomy_name )
		return false;

	if ( 'date' == $taxonomy_name )
		return false;

    return $show;
}, 10, 3 );