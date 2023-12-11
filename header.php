<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage LeanhardPortfolio
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<script>
	// for bootstrapping page level code
	var LEOSITE = {
		"templateURI":'<?= get_template_directory_uri(); ?>',
	};
	</script>
	<?php wp_head(); ?>

</head>

<body>
    <div id="container">