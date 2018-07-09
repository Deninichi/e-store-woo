<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @since      1.0.0
 *
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/includes
 */
class E_Store_Woo {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      E_Store_Woo_Loader $loader Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string $E_Store_Woo The string used to uniquely identify this plugin.
	 */
	protected $E_Store_Woo;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string $version The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'E_Store_Woo_VERSION' ) ) {
			$this->version = E_Store_Woo_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->E_Store_Woo = 'e-store-woo';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->get_options();
		$this->set_options();
		$this->fetchRedirects();
		$this->createUserLogTable();
		$this->createIpBanTable();
		$this->createUABanTable();
		$this->addBanActions();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - E_Store_Woo_Loader. Orchestrates the hooks of the plugin.
	 * - E_Store_Woo_i18n. Defines internationalization functionality.
	 * - E_Store_Woo_Admin. Defines all hooks for the admin area.
	 * - E_Store_Woo_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-e-store-woo-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-e-store-woo-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-e-store-woo-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-e-store-woo-public.php';

		/**
		 * The class responsible for defining all options.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-e-store-woo-options.php';

		/**
		 * The class responsible for defining all redirects.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-e-store-woo-redirects.php';

		/**
		 * The class responsible for defining all redirects.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-e-store-woo-user.php';
		/**
		 * The lib for user agent parsing.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/user-agent-parser.php';

		$this->loader = new E_Store_Woo_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the E_Store_Woo_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new E_Store_Woo_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new E_Store_Woo_Admin( $this->get_E_Store_Woo(), $this->get_version() );
		$user = new E_Store_Woo_User();

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$this->loader->add_action( 'wp_ajax_e_store_remove_activity', $user, 'removeActivityCallback' );
		$this->loader->add_action( 'wp_ajax_e_store_reload_activity', $user, 'reloadActivity' );
		$this->loader->add_action( 'wp_ajax_e-store-sort-activity', $user, 'getLogDataCallback' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new E_Store_Woo_Public( $this->get_E_Store_Woo(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_E_Store_Woo() {
		return $this->E_Store_Woo;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    E_Store_Woo_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}


	/**
	 * Fetch options before updating.
	 *
	 * @since     1.0.0
	 * @return    boolean
	 */
	public function get_options() {
		$pluginOptions = new E_Store_Woo_Options();
		$currentUser = new E_Store_Woo_User();
		$currentUser->removeActivity();
		if($currentUser->isAdmin()){
			return $pluginOptions->fetchFormData();
		}
	}


	/**
	 * Create default options.
	 *
	 * @since     1.0.0
	 *
	 */
	public function set_options() {
		$pluginOptions = new E_Store_Woo_Options();
		$pluginOptions->registerOption( 'esw_enabled', 'true' );
		$pluginOptions->registerOption( 'rand_link', 'esw-rand' );
		$pluginOptions->registerOption( 'affiliate_id', 'demo' );
		$pluginOptions->registerOption( 'once_per_day', 'true' );
		$pluginOptions->registerOption( 'ip_ban_allowed', 'true' );
		$pluginOptions->registerOption( 'ua_ban_allowed', 'true' );
	}

	/**
	 * Run a redirects functional.
	 *
	 * @since     1.0.0
	 *
	 */
	public function fetchRedirects(){
		$redirects = new E_Store_Woo_Redirects();
		add_action('init', [&$redirects, 'listener']);
		add_action('init', [&$redirects, 'createMetaTag']);
	}

	/**
	 * Create a DB table for users log
	 *
	 * @since     1.0.0
	 *
	 */
	private function createUserLogTable(){
		global $wpdb;
		$table_name = $wpdb->prefix .'e_store_users_log';

		if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name){
			$charset_collate = $wpdb->get_charset_collate();
			$sql = "CREATE TABLE $table_name ( `id` INT(11) NOT NULL AUTO_INCREMENT , `ip` VARCHAR(100) NOT NULL , `blocked_activity` INT(1) NOT NULL , `user_agent` VARCHAR(400) NOT NULL , `banned_ip` INT(1) NOT NULL DEFAULT '0' , `banned_agent` INT(1) NOT NULL DEFAULT '0' ,  `time` datetime DEFAULT '0000-00-00 00:00:00' NOT NULL, `prod_link` VARCHAR(650) NOT NULL, PRIMARY KEY (`id`)) $charset_collate ENGINE = MyISAM;";
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );
		}
	}

	/**
	 * Create a DB table for users log
	 *
	 * @since     1.0.0
	 *
	 */
	private function createIpBanTable(){
		global $wpdb;
		$table_name = $wpdb->prefix .'e_store_ip_ban';

		if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name){
			$charset_collate = $wpdb->get_charset_collate();
			$sql = "CREATE TABLE $table_name ( `id` INT(11) NOT NULL AUTO_INCREMENT , `ip` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) $charset_collate ENGINE = MyISAM;";
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );
		}
	}

	/**
	 * Create a DB table for users log
	 *
	 * @since     1.0.0
	 *
	 */
	private function createUABanTable(){
		global $wpdb;
		$table_name = $wpdb->prefix .'e_store_ua_ban';

		if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name){
			$charset_collate = $wpdb->get_charset_collate();
			$sql = "CREATE TABLE $table_name ( `id` INT(11) NOT NULL AUTO_INCREMENT , `ua` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) $charset_collate ENGINE = MyISAM;";
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );
		}
	}

	/**
	 * Init actions for add various bans data from forms
	 *
	 * @since     1.0.0
	 *
	 */

	private function addBanActions(){
	  $user = new E_Store_Woo_User();
	  $user->addIpBan();
	  $user->ajaxGetBanIps();
	  $user->removeIpBan();
	  $user->addUABan();
	  $user->ajaxGetBanUAs();
	  $user->removeUABan();
	  $user->ajaxUaBulk();
	  $user->ajaxIpBulk();
	}


}
