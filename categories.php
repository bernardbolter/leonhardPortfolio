<?php
/**
 * The template part for displaying the category links
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package WordPress
 * @subpackage LeanhardPortfolio
 */

?>

<div class="cat-container cat-no-show" id="cat-section">
    <h1>CATEGORIES</h1>
    <div class="category">
        <a href="<?php get_template_directory_uri() ?>">all</a>
    </div>
    <?php
    $categories = get_categories(['hide_empty' => false]);
        foreach($categories as $category) {
                if ($category->name !== 'Uncategorized') {
                echo '<div class="category"><a href="' . get_category_link($category->term_id) . '">' . $category->name . '</a></div>';
            }
        }
    ?>
</div>