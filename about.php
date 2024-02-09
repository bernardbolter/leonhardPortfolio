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
    <div class="services-container"><p><?php the_field('services', 104); ?></p></div>
    <p>Services</p>
    <h2 class="clock-container"><span id="clock"></span> CET</h2>
    <p>Current Time</p>
    <a class="about-email" href="mailto:Contact@leonhardlaupichler.com">Contact[at]leonhardlaupichler.com</a>
    <p>Email</p>
    <div class="clients-container"><p><?php the_field('clients', 104); ?></p></div>
    <p>Selected Clients</p>
    <a class="imprint" href="<?php echo home_url(); ?>/imprint">Imprint</a>
</div>