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
                <a href="/?link=true" class="project-back">
                    <svg viewBox="0 0 42 42">
                        <circle class="back-circle" cx="21" cy="21" r="21" />
                        <path d="M24 13L16 21L24 29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <div id="project-title" class="project-title">
                    <h1>loading...</h1>
                </div>
                <div id="project-thumbnails" class="project-thumbnails projetc-thumbs-loading">
                    <div class="project-thumb-loader"></div>
                    <div class="project-thumb-loader"> </div>
                    <div class="project-thumb-loader"> </div>
                </div>
            </div>
            <div class="loading-container">
               
            </div>
        </div>
    </div>

<?php get_footer(); ?>