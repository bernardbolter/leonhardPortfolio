<?php
/**
 * The template for displaying all single posts and attachments
 *
 * @package WordPress
 * @subpackage LeonhardPortfolio
 */
 
get_header(); ?>
 
    <div id="primary" class="content-area">
    <input type="hidden" id="post_id" value="<?php the_ID() ?>">
        <main id="main" class="site-main" role="main">
 
        <?php
        // Start the loop.
        while ( have_posts() ) : the_post();
        ?>
        <div class="project-nav">
            <div class="project-title-container">
                <a href="/" class="project-back">
                    <svg viewBox="0 0 42 42">
                        <circle cx="21" cy="21" r="21" fill="#D9D9D9"/>
                        <path d="M24 13L16 21L24 29" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <div id="project-title" class="project-title">
                    <h1><?php the_title() ?></h1>
                </div>
                <div class="project-info-close project-info-close-hide" id="project-info-close">
                    <svg  viewBox="0 0 24 24">
                        <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" />
                    </svg>
                </div>
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

        <?php endwhile; ?>

        <div class="project-container" id="project-container">
                <h1>Loading...</h1>
        </div>
        
 
        </main><!-- .site-main -->
    </div><!-- .content-area -->
 
<?php get_footer(); ?>