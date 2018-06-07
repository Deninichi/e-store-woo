<?php

/**
 * The admin-specific functionality of the plugin.
 *

 * @since      1.0.0
 *
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/admin
 */
class E_Store_Woo_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $E_Store_Woo    The ID of this plugin.
	 */
	private $E_Store_Woo;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $E_Store_Woo       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $E_Store_Woo, $version ) {

		$this->E_Store_Woo = $E_Store_Woo;
		$this->version = $version;
		add_action('admin_menu', array( &$this , 'createAdminOptions'));

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in E_Store_Woo_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The E_Store_Woo_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->E_Store_Woo, plugin_dir_url( __FILE__ ) . 'css/e-store-woo-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in E_Store_Woo_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The E_Store_Woo_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->E_Store_Woo, plugin_dir_url( __FILE__ ) . 'js/e-store-woo-admin.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->E_Store_Woo, plugin_dir_url( __FILE__ ) . 'js/notify.min.js', array( 'jquery' ), $this->version, true );

	}

	/**
	 * Creating the admin area of plugin
	 *
	 * @since 1.0.0
	 */

	public function createAdminOptions() {

		add_menu_page(
			'E-Store Woo',
			'E-Store Woo',
			'manage_options',
			'esw-options',
			array( &$this, 'includeOptionsPage' ),
			plugin_dir_url( __FILE__ ) . '/images/amz-16.png',
			20
		);


	}


	public function includeOptionsPage() {
		require_once plugin_dir_path( __FILE__ ) . 'partials/e-store-woo-admin-display.php';
	}

}
