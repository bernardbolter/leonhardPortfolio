<?php
/**
 * The impressum template file
 * Template Name: Impressum 
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
<section class="impressum-container">
    <a href="/?link=true" class="imp-back">
        <svg viewBox="0 0 42 42">
            <circle class="back-circle" cx="21" cy="21" r="21" />
            <path d="M24 13L16 21L24 29" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
    <?php
    wp_reset_query(); // necessary to reset query
    while ( have_posts() ) : the_post();
    ?>
        <div class="imp-content">
            <?php the_content(); ?>
        </div>
    <?php
    endwhile; // End of the loop.
    ?>

</section>

<?php
get_footer();