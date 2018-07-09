<?php
/**
 * The product redirects class.
 *
 * This is used for creation a redirects from specific urls
 *
 *
 * @since      1.0.0
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/includes
 */

class E_Store_Woo_Redirects {


	public function getRandProd() {

		if ( $randLink = get_option( 'rand_link' ) ) {
			if ( strpos( $_SERVER['REQUEST_URI'], $randLink ) ) {

				if ( $product = get_posts( [
					'post_type'      => 'post',
					'orderby'        => 'rand',
					'posts_per_page' => 1,
					'meta_query' => array(
				        array(
				                'key' => 'amazon-product-single-asin',
				                'compare' => '!=',
				                'value' => ''
				            )
				    )
				] ) ) {
					return $product;
				}
			}
		}
	}

	public function getRandProdByCat() {
		if ( strpos( $_SERVER['REQUEST_URI'], 'rand-cat' ) ) {
			$link = explode( "/", $_SERVER['REQUEST_URI'] );

			if ( $product = get_posts( [
				'post_type'     => 'product',
				'orderby'       => 'rand',
				'post_per_page' => 1,
				'tax_query'     => [
					[
						'taxonomy' => 'product_cat',
						'field'    => 'slug',
						'terms'    => $link[3]
					]
				]
			] ) ) {
				return $product;
			} else {
				$product = get_posts( [
					'post_type'     => 'product',
					'orderby'       => 'rand',
					'post_per_page' => 1,
					'tax_query'     => [
						[
							'taxonomy' => 'product_cat',
							'field'    => 'slug',
							'terms'    => $link[2]
						]
					]
				] );

				return $product;
			}

			return false;
		}
	}


	private function getAsin( $postContent = '' ) {
		if ( ! empty( $postContent ) ) {
			$exp = '/\b[B0-9][0-9A-Z]{9}\b/';

			if ( preg_match_all( $exp, $postContent, $matches, PREG_SET_ORDER, 0 ) ) {
				return $matches[0][0];
			}
		}

		return false;

	}

	public function createMetaTag() {

		$this->printMeta();

	}


	public function printMeta() {
		add_action( 'wp_footer', array( &$this, 'generateRefInput' ) );
	}

	public function generateRefInput() {
		$user = new E_Store_Woo_User();
		$userIp = $user->getRealIP();

		if ( ! is_single( get_the_ID() ) ) {
			return false;
		}

		if ( $amazonData = get_transient( $userIp . 'amazonLink' ) ) {
			echo '<input type="hidden" class="amazonLink" name="referrer" value="' . $amazonData . '" />';
		}
	}


	public function doRedirect( $product = '' ) {

		if ( ! empty( $product ) ) {
			$prodAmazonUrl = get_post_meta( $product[0]->ID, 'amazon-product-single-asin', true );
			
			if ( $this->getAsin( $prodAmazonUrl ) ) {
				
				$user = new E_Store_Woo_User();
				//$amazonLink = 'https://www.amazon.com/gp/product/' . $this->getAsin( $prodAmazonUrl ) . '/?tag=' . get_option( 'affiliate_id' );
				$amazonLink = $this->getAmazonURL( $this->getAsin( $prodAmazonUrl ) );

				if($userIp = $user->getRealIP()){
					if(! $user->oncePerDayDetect() && !$user->detectBanIP() && !$user->detectBanUA() ){

						delete_transient($userIp . 'amazonLink');
						if(set_transient( $userIp . 'amazonLink', $amazonLink, 20 ) && $user->setLog($amazonLink)){
							setcookie( 'randomUrl', 1, time() + 30, '/' );
							header( 'Location:' . get_permalink($product['0']->ID) );
							exit;
						}
					}
				}
			}
		}
	}

	public function listener(){
		if(get_option('esw_enabled') == 'true'){
			$this->doRedirect($this->getRandProd());
			//$this->doRedirect($this->getRandProdByCat());
		}
	}

	public function getAmazonURL( $asin ){
		if( function_exists('getSingleAmazonProduct') ){
			global $public_key, $private_key, $aws_partner_id, $aws_partner_locale;

			$appip_operation 		= apply_filters('getSingleAmazonProduct_operation',"ItemLookup");
			$appip_responsegroup 	= apply_filters('getSingleAmazonProduct_response_group',"Large,Reviews,Offers,Variations");
			$appip_idtype	 		= apply_filters('getSingleAmazonProduct_type',"ASIN");

			$set_array				= array("Operation" => $appip_operation,"ItemId" => $asin,"ResponseGroup" => $appip_responsegroup,"IdType" => $appip_idtype,"AssociateTag" => APIAP_ASSOC_ID );
			$api_request_array		= array('locale'=> APIAP_LOCALE,'public_key'=> APIAP_PUB_KEY,'private_key'=> APIAP_SECRET_KEY,'api_request_array'=>$set_array);
			$request_array			= apply_filters('appip_pre_request_array',$api_request_array);

			$pxmlNew				= amazon_plugin_aws_signed_request($request_array['locale'],$request_array['api_request_array'],$request_array['public_key'],$request_array['private_key']);

			return $pxmlNew[0]["Items"]["Item"][0]["DetailPageURL"];
		}
	}

}