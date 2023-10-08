<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage LeonhardPortfolio
 * @since Twenty Twenty-One 1.0
 */

get_header(); 
?>

<?php get_template_part("nav"); ?>

<?php
    $the_query = new WP_Query( 
        array( 
            'post_type' => 'post',
            'orderby' => 'rand',
            'posts_per_page' => '-1' 
    ));

    // The Loop
    if ( $the_query->have_posts() ) {
        ?>
            <div class="posts-container">
        <?php

        while ( $the_query->have_posts() ) {
            $the_query->the_post();
            ?>
            <div class="post-container post-<?php echo $the_query->current_post + 1; ?>">
                <h1><?php echo get_the_title() ?></h1>
                <p><?php echo $the_query->current_post; ?></p>
            </div>
            <?php
        }
        /* Restore original Post Data */
        wp_reset_postdata();
        ?>
        </div>
        <?php
    } else {
        ?>
        <div class="no-posts-container">
            <h1>There are no posts</h1>
        </div>
        <?php
    }
?>

<?php
get_footer();