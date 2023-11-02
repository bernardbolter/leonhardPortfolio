<?php
    $the_query = new WP_Query( 
        array( 
            'post_type' => 'post',
            'orderby' => 'rand',
            'posts_per_page' => '-1' 
    ));

    // The Loop
    if ( $the_query->have_posts() ) {
        ?>
            <div class="posts-container">
        <?php

        while ( $the_query->have_posts() ) {
            $the_query->the_post();
            ?>
            <a class="post-container" href="<?php the_permalink() ?>">

            <?php 

            $image = wp_get_attachment_image_src(get_field('square_thumbnail'), 'large');
            $image = $image[0];
            $ext = pathinfo($image, PATHINFO_EXTENSION);

            if( $ext == 'gif' )
            {
                $image = wp_get_attachment_image_src(get_field('square_thumbnail'), 'full');
                $image = $image[0];
            }

            ?>
            <img src="<?php echo $image; ?>" alt="" />

            <!-- <?php 
                $attachment_id = get_field('square_thumbnail');
                $img_src = wp_get_attachment_image_url( $attachment_id, 'full' );
                $img_srcset = wp_get_attachment_image_srcset( $attachment_id, 'medium' );
                ?>
                <img src="<?php echo esc_url( $img_src ); ?>"
                    srcset="<?php echo esc_attr( $img_srcset ); ?>"
                    sizes="(max-width: 50em) 87vw, 680px" alt="A rad wolf"
                > -->
            </a>
            <?php
        }
        /* Restore original Post Data */
        wp_reset_postdata();
        ?>
        </div>
        <?php
    } else {
        ?>
        <div class="no-posts-container">
            <h1>There are no posts</h1>
        </div>
        <?php
    }
?>