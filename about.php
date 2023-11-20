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
    <div class="services-container"><?php the_field('services', 104); ?></div>
    <p>Services</p>
    <h2 class="clock-container">Current Time: <span id="clock"></span> CET</h2>
    <h2 class="office-times">Monday-Friday: 09:00-18:00</h2>
    <p>Office Hours</p>
    <h2>contact@leonhardlaupichler.com</h2>
    <p>Email</p>
    <div class="clients-container"><?php the_field('clients', 104); ?></div>
    <a href="<?php echo home_url(); ?>/imprint">Imprint</a>
</div>