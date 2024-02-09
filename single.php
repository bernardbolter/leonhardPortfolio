<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage LeonhardPortfolio
 */

 $window_width = "<script type='text/javascript'>document.write(window.innerWidth);</script>";
 
get_header(); ?>
 
    <div class="projects-wrapper">
    <input type="hidden" id="post_id" value="<?php the_ID() ?>">
        <div id="projects-container">
            <div class="project-container">
                <a href="/" class="logo-icon-loading">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/logo_still.png" alt ="Leonhard Logo" />
                </a>
                <div class="project-buttons-container">
                    <a href="/" id="project-title-loading" class="project-title-loading">
                        <h1>Loading<span id="loading-dots"></span></h1>
                    </a>
                </div>
            </div>
            <div class="loading-container">
                <?php if (have_posts()) : while (have_posts()) : the_post() ?>
                    <?php $load_landscape = get_field('loading_image_landscape') ?>
                    <?php $load_portrait = get_field('loading_image_portrait') ?>
                    <?php 
                        if ($window_width < 850) {
                            if ($load_landscape) {
                                $thumb_url = $load_landscape['sizes']['thumbnail'];
                            } else {
                                $thumb_url = 'https://www.tlbx.app/200-300.svg';
                            }
                        } else {
                            if ($load_portrait) {
                                $thumb_url = $load_portrait['sizes']['thumbnail'];
                            } else {
                                $thumb_url = 'https://www.tlbx.app/200-300.svg';
                            }
                        }
                    ?>
                        <img src="<?php echo $thumb_url ?>" alt="loading image for project"/>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </div>

<?php get_template_part("audio"); ?>
<?php get_footer(); ?>