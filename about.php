<?php
/**
 * The template part for displaying the about information
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package WordPress
 * @subpackage LeanhardPortfolio
 */

?>

<div class="about-container about-no-show" id="about-section">
    <h2><?php the_field('description', 104); ?></h2>
    <p>About</p>
    <h2><?php the_field('services', 104); ?></h2>
    <p>Services</p>
    <h2>Current Time: </h2>
</div>