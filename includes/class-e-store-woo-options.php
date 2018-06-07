<?php

/**
 * The plugin options class.
 *
 * This is used for options management.
 *
 *
 * @since      1.0.0
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/includes
 */
class E_Store_Woo_Options {

	public function registerOption( $optionName = '', $value = '' ) {

		if ( ! empty( $optionName ) && ! get_option( $optionName ) && ! empty( $value ) ) {
			return add_option( $optionName, $value );
		}
	}

	public function fetchFormData() {
		if ( strpos( $_SERVER['REQUEST_URI'], 'e-store-options' ) ) {
			$post = filter_input_array( INPUT_POST, FILTER_SANITIZE_STRING );
			if ( ! empty( $post ) ) {
				foreach ( $post as $optionName => $optionValue ) {
					if ( get_option( $optionName ) ) {
						update_option( $optionName, $optionValue );
					}
				}
				exit();
			}
			exit();
		}
	}

	public function pluginEnabled(){
		if(get_option('esw_enabled') == 'true'){
			return true;
		}
		return false;
	}

	public function oncePerDay(){
		if(get_option('once_per_day') == 'true'){
			return true;
		}
		return false;
	}
	public function ipBanAllowed(){
		if(get_option('ip_ban_allowed') == 'true'){
			return true;
		}
		return false;
	}
	public function uaBanAllowed(){
		if(get_option('ua_ban_allowed') == 'true'){
			return true;
		}
		return false;
	}

	public function generateLinksByWooCat(){
		$taxonomy     = 'product_cat';
		$orderby      = 'name';
		$show_count   = 0;      // 1 for yes, 0 for no
		$pad_counts   = 0;      // 1 for yes, 0 for no
		$hierarchical = 1;      // 1 for yes, 0 for no
		$title        = '';
		$empty        = 1;

		$args = array(
			'taxonomy'     => $taxonomy,
			'orderby'      => $orderby,
			'show_count'   => $show_count,
			'pad_counts'   => $pad_counts,
			'hierarchical' => $hierarchical,
			'title_li'     => $title,
			'hide_empty'   => $empty
		);
		$all_categories = get_categories( $args );
		echo '<script>';
		echo 'var tree = [';
		foreach ($all_categories as $cat) {
			if($cat->category_parent == 0) {
				echo '{';
				$category_id = $cat->term_id;

				echo 'text: "'.$cat->name .'",';
				echo 'href: "'. get_term_link($cat->slug, "product_cat").'/rand-cat", ';

				$args2 = array(
					'taxonomy'     => $taxonomy,
					'child_of'     => 0,
					'parent'       => $category_id,
					'orderby'      => $orderby,
					'show_count'   => $show_count,
					'pad_counts'   => $pad_counts,
					'hierarchical' => $hierarchical,
					'title_li'     => $title,
					'hide_empty'   => $empty
				);
				$sub_cats = get_categories( $args2 );
				if($sub_cats) {
					echo 'nodes:';
					foreach($sub_cats as $sub_category) {
						echo '[{';
						echo 'text: "'.$sub_category->name.'",';
						echo 'href: "'.get_term_link($sub_category->slug, "product_cat").'/rand-cat",';
						echo '}],';
					}
				}
				echo '},';
			}
		}
		echo '];</script>';
	}

}