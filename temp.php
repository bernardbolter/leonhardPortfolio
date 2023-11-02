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
            <div class="project-title-container">
                <a href="/" class="project-back">
                    <svg viewBox="0 0 42 42">
                        <circle class="back-circle" cx="21" cy="21" r="21" />
                        <path d="M24 13L16 21L24 29" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <div id="project-title" class="project-title">
                    <h1>loading project...</h1>
                </div>
                <div id="project-thumbnails" class="project-thumbnails">
                    <div class="project-thumb-loader">
                        <img src="<?php bloginfo('template_directory'); ?>/img/loading.gif" alt="loading gif" />
                    </div>
                    <div class="project-thumb-loader">
                        <img src="<?php bloginfo('template_directory'); ?>/img/loading.gif" alt="loading gif" />
                    </div>
                    <div class="project-thumb-loader">
                        <img src="<?php bloginfo('template_directory'); ?>/img/loading.gif" alt="loading gif" />
                    </div>
                </div>
            </div>
            <div class="project-loading-content">
                <div class="loading-container">
                    <h1>LOADING PORTFOLIO...</h1>
                </div>
            </div>
        </div>
    </div>

<?php get_footer(); ?>


<div id="project-info-container" class="project-info-container project-info-container-hide">
            <?php if ( get_field("project_summary", $post->ID) ): ?>
                <h1><?php the_field("project_summary", $post->ID); ?></h1>
            <?php endif; ?>
            <?php if ( get_field("client", $post->ID) ): ?>
                <h2><?php the_field("client", $post->ID); ?></h2>
                <p>Client</p>
            <?php endif; ?>
            <?php if ( get_field("agency", $post->ID) ): ?>
                <h2><?php the_field("angency", $post->ID); ?></h2>
                <p>Agency</p>
            <?php endif; ?>
            <?php if ( get_field("creative_direction", $post->ID) ): ?>
                <h2><?php the_field("creative_direction", $post->ID); ?></h2>
                <p>Creative Direction</p>
            <?php endif; ?>
            <?php if ( get_field("art_direction", $post->ID) ): ?>
                <h2><?php the_field("art_direction", $post->ID); ?></h2>
                <p>Art Direction</p>
            <?php endif; ?>
            <?php if ( get_field("concept_and_strategy", $post->ID) ): ?>
                <h2><?php the_field("concept_and_strategy", $post->ID); ?></h2>
                <p>Concept and Strategy</p>
            <?php endif; ?>
            <?php if ( get_field("video_editing", $post->ID) ): ?>
                <h2><?php the_field("video_editing", $post->ID); ?></h2>
                <p>Video Editing</p>
            <?php endif; ?>
            <?php if ( get_field("video", $post->ID) ): ?>
                <h2><?php the_field("video", $post->ID); ?></h2>
                <p>Video</p>
            <?php endif; ?>
            <?php if ( get_field("photography", $post->ID) ): ?>
                <h2><?php the_field("photography", $post->ID); ?></h2>
                <p>Photography</p>
            <?php endif; ?>
            <?php if ( get_field("graphic_design", $post->ID) ): ?>
                <h2><?php the_field("graphic_design", $post->ID); ?></h2>
                <p>Graphic Design</p>
            <?php endif; ?>
            <?php if ( get_field("logo_design", $post->ID) ): ?>
                <h2><?php the_field("logo_design", $post->ID); ?></h2>
                <p>Logo Design</p>
            <?php endif; ?>
            <?php if ( get_field("type_design", $post->ID) ): ?>
                <h2><?php the_field("type_design", $post->ID); ?></h2>
                <p>Type Design</p>
            <?php endif; ?>
            <?php if ( get_field("model", $post->ID) ): ?>
                <h2><?php the_field("model", $post->ID); ?></h2>
                <p>Model</p>
            <?php endif; ?>
            <?php if ( get_field("handle", $post->ID) ): ?>
                <h2><?php the_field("handle", $post->ID); ?></h2>
            <?php endif; ?>
        </div>