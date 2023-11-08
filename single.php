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
            <div class="loading-container">
                <h1>LOADING PORTFOLIO...</h1>
            </div>
        </div>
    </div>

<?php get_footer(); ?>