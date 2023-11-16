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

<?php 
if (isset($_GET['link']) && $_GET['link'] == true) {
    echo '';
} else {
?>
    <div class="splash-container">
        <h1>Leonhard Laupichler</h1>
    </div>
<?php
} 
?>

<?php $window_width = "<script type='text/javascript'>document.write(window.innerWidth);</script>"; ?>

<?php get_template_part("nav"); ?>

<?php get_template_part("about"); ?>

<div id="posts">
    <div class="loading-container">
    </div>
</div>

<?php
get_footer();