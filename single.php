<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage LeonhardPortfolio
 */
 
get_header(); ?>
 
    <div class="projects-wrapper">
    <input type="hidden" id="post_id" value="<?php the_ID() ?>">
        <div id="projects-container">
            <div class="project-container">
                <div class="logo-icon">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/logo_still.png" alt ="Leonhard Logo" />
                </div>
                <div id="project-title-loading" class="project-title-loading">
                    <h1>loading...</h1>
                </div>
                <div id="project-thumbnails" class="project-thumbnails projetc-thumbs-loading">
                    <div class="project-thumb-loader"></div>
                    <div class="project-thumb-loader"> </div>
                    <div class="project-thumb-loader"> </div>
                </div>
            </div>
            <div class="loading-container">
                <?php if (have_posts()) : while (have_posts()) : the_post() ?>
                    <?php $check_image = get_field('portfolio_image_landscape_1') ?>
                    <?php 
                        if ($check_image) {
                        $thumb_url = $check_image['sizes']['thumbnail']
                    ?>
                        <img src="<?php echo $thumb_url ?>" alt="loading image for project"/>
                    <?php
                    }
                    ?>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </div>

<?php get_template_part("about"); ?>
<?php get_footer(); ?>