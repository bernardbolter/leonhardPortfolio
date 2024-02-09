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
<div class="imp-background"></div>
<section class="impressum-container">
    <div class="imp-nav">
        <a href="/" class="logo-icon-loading">
            <img src="<?php echo get_template_directory_uri(); ?>/img/logo_still.png" alt ="Leonhard Logo" />
        </a>
        <div class="project-buttons-container">
            <a href="/" class="imp-close">
                <img src="<?php echo get_template_directory_uri(); ?>/img/cross.png" alt="back button" />
            </a>
            <!-- <h1 class="project-name project-name-loading">Leanhard Laupichler</h1> -->
        </div>
    </div>

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