<?php
if ( ! function_exists( 'wp_delete_user' ) ) {
	include_once( ABSPATH . 'wp-includes/pluggable.php' );
}

/**
 * Class for user control.
 *
 * This is used for options management.
 *
 *
 * @since      1.0.0
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/includes
 */
class E_Store_Woo_User {


	public function getCurrentUser() {
		return wp_get_current_user();
	}

	public function isAdmin() {

		if ( $this->getCurrentUser()->has_cap( 'administrator' ) /*|| $this->getCurrentUser()->has_cap( 'administrator_clone' )*/ ) {
			return true;
		}

		return false;
	}

	public function getRealIP() {
		$ipaddress = '';
		if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) && $_SERVER['HTTP_CLIENT_IP'] ) {
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		} else if ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) && $_SERVER['HTTP_X_FORWARDED_FOR'] ) {
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else if ( isset( $_SERVER['HTTP_X_FORWARDED'] ) && $_SERVER['HTTP_X_FORWARDED'] ) {
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		} else if ( isset( $_SERVER['HTTP_FORWARDED_FOR'] ) && $_SERVER['HTTP_FORWARDED_FOR'] ) {
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		} else if ( isset( $_SERVER['HTTP_FORWARDED'] ) && $_SERVER['HTTP_FORWARDED'] ) {
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		} else if ( isset( $_SERVER['REMOTE_ADDR'] ) && $_SERVER['REMOTE_ADDR'] ) {
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		} else {
			$ipaddress = 'UNKNOWN';
		}

		return $ipaddress;
	}

	public function getUserAgent() {
		return $_SERVER['HTTP_USER_AGENT'];
	}

	private function insertLogData( $ip = '', $user_agent = '', $prod_link = '', $banned_ip = '', $banned_ua = '', $banned_activity = '') {
		if ( ! empty( $ip ) && ! empty( $user_agent ) && ! empty( $prod_link ) ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'e_store_users_log';

			if ( $wpdb->insert(
				$table_name,
				array(
					'user_agent' => $user_agent,
					'ip'         => $ip,
					'blocked_activity' => !empty($banned_activity) ? '1' : '0',
					'time'       => current_time( 'mysql' ),
					'prod_link'  => $prod_link,
                    'banned_ip' => !empty($banned_ip) ? '1' : '0',
                    'banned_agent' => !empty($banned_ua) ? '1' : '0',
				) ) ) {
				return true;
			}
		}

		return false;
	}


	public function setLog( $prod_link ) {
		$ua = parse_user_agent();
		$ua = implode(" ", $ua);
		return $this->insertLogData( $this->getRealIP(), $ua, $prod_link );
	}

    public function getLogData( $orderby = 'time' )
    {
    	$order = 'ASC';
    	if ( 'time' == $orderby ) {
    		$order = 'DESC';
    	}

        global $wpdb;
        $table_name = $wpdb->prefix . "e_store_users_log";
        if ($retrieve_data = $wpdb->get_results("SELECT * FROM $table_name GROUP BY ip, blocked_activity, banned_ip, banned_agent ORDER BY $orderby $order")) {
            echo '<table class="table table-condensed">
                        <thead>
                        <tr>
                            <th>IP</th>
                            <th>User Agent</th>
                            <th>Time</th>
                            <th>Redirected to link / Ban reason</th>
                        </tr>
                        </thead>
                        <tbody>';
            foreach ($retrieve_data as $data) {
                if ($data->banned_ip == '1' || $data->banned_agent == '1' || $data->blocked_activity == '1') {
                    $styleClass = 'banned';
                    $isLink = false;
                } else {
                    $styleClass = 'regular_info';
                }
                echo ' 
                        <tr class="' . $styleClass . '">
                            <td>' . $data->ip . '</td>
                            <td>' . $data->user_agent . '</td>
                            <td>' . $data->time . '</td>';
                if ($isLink == false) {
                    echo '
                            <td><span>' . $data->prod_link . '</span></td>
                        </tr>
                        ';
                } else {
                    echo '
                            <td><a href="' . $data->prod_link . '">' . $data->prod_link . '</a></td>
                        </tr>
                        ';
                }

            }
            echo '</tbody>
                    </table>';
        }
    }

    public function getLogDataCallback(){

        $orderby = $_POST['orderby'];
        $this->getLogData( $orderby );
        wp_die();
    }

    public function reloadActivity() {

        //if ( $this->isAdmin() ) {
            $this->getLogData();
            wp_die();
        //}

        //return false;
        //wp_die();
    }

	public function getIpBanData() {
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_ip_ban";
		if ( $retrieve_data = $wpdb->get_results( "SELECT * FROM $table_name order by id desc" ) ) {
			echo '<table class="table ip-bans table-condensed">
                        <thead>
                        <tr>
                            <th>IP</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>';
			foreach ( $retrieve_data as $data ) {
				echo '
                        <tr>
                            <td>' . $data->ip . '</td>
                            <td><button data-id="' . $data->id . '" class="remove-ban-ip btn btn-default">Delete</button></td>
                        </tr>
                        ';
			}
			echo '</tbody>
                    </table>';
		}else{
			echo '<table class="table ip-bans table-condensed"></table>';
		}
	}


	public function getUABanData() {
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_ua_ban";
		if ( $retrieve_data = $wpdb->get_results( "SELECT * FROM $table_name order by id desc" ) ) {
			echo '<table class="table ua-bans table-condensed">
                        <thead>
                        <tr>
                            <th>User Agent</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>';
			foreach ( $retrieve_data as $data ) {
				echo '
                        <tr>
                            <td>' . $data->ua . '</td>
                            <td><button data-id="' . $data->id . '" class="remove-ban-ua btn btn-default">Delete</button></td>
                        </tr>
                        ';
			}
			echo '</tbody>
                    </table>';
		}
		else{
			echo '<table class="table ua-bans table-condensed"></table>';
		}
	}

	public function ipWasToday( $ip ) {
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_users_log";
		$result     = $wpdb->get_results( "SELECT * FROM $table_name WHERE time >= CURDATE() AND `ip` = '$ip'" );

		if ( count( $result ) > 0 ) {
			return true;
		}

		return false;
	}

	public function oncePerDayDetect() {
		if ( get_option( 'once_per_day' ) == 'true' ) {
			if ( $this->ipWasToday( $this->getRealIP() ) && ! $this->isAdmin() ) {
                $ua = parse_user_agent();
                $ua = implode(" ", $ua);
                $this->insertLogData( $this->getRealIP(), $ua, 'Banned Activity', '0', '0', '1');
                return true;
			}
		}

		return false;
	}

	public function removeActivity() {
		if ( $this->isAdmin() && strpos( $_SERVER['REQUEST_URI'], 'e-store-remove-activity' ) ) {
			global $wpdb;
			$table_name = $wpdb->prefix . "e_store_users_log";
			$wpdb->query( "TRUNCATE TABLE $table_name" );
			exit();
		}

		return false;
	}

	function removeActivityCallback(){
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_users_log";
		$wpdb->query( "TRUNCATE TABLE $table_name" );
		exit();
	}

	public function addIpBan() {
		if ( strpos( $_SERVER['REQUEST_URI'], 'e-store-add-ip' ) ) {
			if ( ! empty( $_POST['ip_ban'] ) && ! $this->ipInBan( $_POST['ip_ban'] ) ) {
				global $wpdb;
				$table_name = $wpdb->prefix . "e_store_ip_ban";
				$ip         = $_POST['ip_ban'];
				if ( $wpdb->insert(
					$table_name,
					array(
						'ip' => $ip,
					) ) ) {
					exit();
				}
			}

		}
	}

	public function ipInBan( $ip = '' ) {
		if ( ! empty( $ip ) ) {
			global $wpdb;
			$table_name = $wpdb->prefix . "e_store_ip_ban";
			$result     = $wpdb->get_results( "SELECT ip FROM $table_name WHERE `ip` = '$ip'" );
			if ( ! empty( $result ) ) {
				return true;
			}
		}

		return false;
	}

	public function ajaxGetBanIps(){
		if( strpos( $_SERVER['REQUEST_URI'], 'e-store-ajax-ip' ) && $_POST['get_ip_data'] == '1'){
			echo $this->getIpBanData();
			exit();
		}
	}

	public function removeIpBan() {
		if ( $this->isAdmin() && strpos( $_SERVER['REQUEST_URI'], 'e-store-remove-ip' ) && !empty($_POST['ip_id'])) {
			global $wpdb;
			$ipID = $_POST['ip_id'];
			$table_name = $wpdb->prefix . "e_store_ip_ban";
			$wpdb->query( "DELETE FROM $table_name WHERE `id` = $ipID " );
			exit();
		}

		return false;
	}



	public function addUABan() {
		if ( strpos( $_SERVER['REQUEST_URI'], 'e-store-add-ua' ) ) {

			if ( ! empty( $_POST['ua_ban'] ) && ! $this->UABanExist( $_POST['ua_ban'] ) ) {
				global $wpdb;
				$table_name = $wpdb->prefix . "e_store_ua_ban";
				$ua         = $_POST['ua_ban'];
				if ( $wpdb->insert(
					$table_name,
					array(
						'ua' => $ua,
					) ) ) {
					exit();
				}
			}

		}
	}

	public function UABanExist( $ua = '' ) {


		if ( ! empty( $ua ) ) {
			global $wpdb;
			$table_name = $wpdb->prefix . "e_store_ua_ban";
			$result     = $wpdb->get_results( "SELECT id FROM $table_name WHERE `ua` = '$ua'" );
			if ( ! empty( $result ) ) {
				return true;
			}
		}

		return false;
	}

	public function ajaxGetBanUAs(){
		if( strpos( $_SERVER['REQUEST_URI'], 'e-store-ajax-ua' ) && $_POST['get_ua_data'] == '1'){
			echo $this->getUABanData();
			exit();
		}
	}

	public function removeUABan() {
		if ( $this->isAdmin() && strpos( $_SERVER['REQUEST_URI'], 'e-store-remove-ua' ) && !empty($_POST['ua_id'])) {
			global $wpdb;
			$uaID = $_POST['ua_id'];
			$table_name = $wpdb->prefix . "e_store_ua_ban";
			$wpdb->query( "DELETE FROM $table_name WHERE `id` = $uaID " );
			exit();
		}

		return false;
	}



	public function detectBanIP(){
        $options = new E_Store_Woo_Options();
        if(!$options->ipBanAllowed()){
            return false;
        }
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_ip_ban";
		$ip = $this->getRealIP();
		$result     = $wpdb->get_results( "SELECT id FROM $table_name WHERE `ip` = '$ip'" );
		if ( ! empty( $result ) ) {
            $ua = parse_user_agent();
            $ua = implode(" ", $ua);
            $this->insertLogData( $this->getRealIP(), $ua, 'Banned IP', '1', '0');
			return true;
		}
		return false;
	}



	public function detectBanUA(){
        $options = new E_Store_Woo_Options();
        if(!$options->uaBanAllowed()){
            return false;
        }
		global $wpdb;
		$table_name = $wpdb->prefix . "e_store_ua_ban";
		$ua = parse_user_agent();
		foreach ($ua as $uaElement){
			$result     = $wpdb->get_results( "SELECT id FROM $table_name WHERE `ua` LIKE '%$uaElement%'" );
			if ( ! empty( $result ) ) {
                $ua = parse_user_agent();
                $ua = implode(" ", $ua);
                 $this->insertLogData( $this->getRealIP(), $ua, 'Banned UA', '0', '1');
				return true;
			}
		}
		return false;
	}

	public function getCurrentUA(){
		$ua = parse_user_agent();
		foreach($ua as $propertyName => $info){
		   echo '<p>'.$propertyName.': '.$info.'</p>';
        }
	}

	public function ajaxUaBulk(){
        if( strpos( $_SERVER['REQUEST_URI'], 'e-store-ua-bulk' ) && !is_null($_POST)){
            global $wpdb;
            $table_name = $wpdb->prefix . "e_store_ua_ban";
            if(!empty($_POST['data'])){
                foreach ($_POST['data'] as $elem){
                    $result = $wpdb->get_results( "SELECT id FROM $table_name WHERE `ua` LIKE '%$elem%'" );
                    if(empty($result)){
                      $wpdb->insert(
                            $table_name,
                            array(
                                'ua' => $elem,
                            ));
                    }
                }
                echo 'success';
                exit();
            }
            echo 'failed';
            exit();
        }
    }
    public function ajaxIpBulk(){
        if( strpos( $_SERVER['REQUEST_URI'], 'e-store-ip-bulk' ) && !is_null($_POST)){
            global $wpdb;
            $table_name = $wpdb->prefix . "e_store_ip_ban";
            if(!empty($_POST['data'])){
                foreach ($_POST['data'] as $elem){
                    $result     = $wpdb->get_results( "SELECT id FROM $table_name WHERE `ip` = '$elem'" );
                    if(empty($result)){
                      $wpdb->insert(
                            $table_name,
                            array(
                                'ip' => $elem,
                            ));
                    }
                }
                echo 'success';
                exit();
            }
            echo 'failed';
            exit();
        }
    }


    public function getIpCount(){
        global $wpdb;
        $table_name = $wpdb->prefix . "e_store_ip_ban";
        $result     = $wpdb->get_results( "SELECT id FROM $table_name WHERE 1 = 1" );
        echo $wpdb->num_rows;
    }


    public function getMainStatistics(){
	    echo '<div class="row"><div class="col-sm-12"><h3>Main statistics</h3></div><div class="col-sm-3">
<div class="well">
    <h5>Successful redirects</h5>
    <p>Today : '.$this->getMainStatisticsData(false, false, false,'today').'</p>
    <p>Yesterday : '.$this->getMainStatisticsData(false, false, false,'yesterday').'</p>
    <p>Last week : '.$this->getMainStatisticsData(false, false, false,'week').'</p>
    <p>This month : '.$this->getMainStatisticsData(false, false, false,'month').'</p>
    <p>This year : '.$this->getMainStatisticsData(false, false, false,'year').'</p>
</div>
</div><div class="col-sm-3">
<div class="well">
    <h5>IP Bans</h5>
    <p>Today : '.$this->getMainStatisticsData(false, true, false,'today').'</p>
    <p>Yesterday : '.$this->getMainStatisticsData(false, true, false,'yesterday').'</p>
    <p>Last week : '.$this->getMainStatisticsData(false, true, false,'week').'</p>
    <p>This month : '.$this->getMainStatisticsData(false, true, false,'month').'</p>
    <p>This year : '.$this->getMainStatisticsData(false, true, false,'year').'</p>
</div>
</div>
<div class="col-sm-3">
<div class="well">
    <h5>UA Bans</h5>
    <p>Today : '.$this->getMainStatisticsData(true, false, false,'today').'</p>
    <p>Yesterday : '.$this->getMainStatisticsData(true, false, false,'yesterday').'</p>
    <p>Last week : '.$this->getMainStatisticsData(true, false, false,'week').'</p>
    <p>This month : '.$this->getMainStatisticsData(true, false, false,'month').'</p>
    <p>This year : '.$this->getMainStatisticsData(true, false, false,'year').'</p>
</div>
</div>
<div class="col-sm-3">
<div class="well">
    <h5>Blocked double activity</h5>
    <p>Today : '.$this->getMainStatisticsData(false, false,     true,'today').'</p>
    <p>Yesterday : '.$this->getMainStatisticsData(false, false, true,'yesterday').'</p>
    <p>Last week : '.$this->getMainStatisticsData(false, false, true,'week').'</p>
    <p>This month : '.$this->getMainStatisticsData(false, false, true,'month').'</p>
    <p>This year : '.$this->getMainStatisticsData(false, false, true,'year').'</p>
</div>
</div>
</div>';
    }

    public function getMainStatisticsData($uaBan = false, $ipBan = false, $activityBan = false, $dateRange = 'today')
    {
        global $wpdb;
        $table_name = $wpdb->prefix . "e_store_users_log";

        if ($dateRange == 'today') {
            $timeRange = 'time >= CURDATE()';
        }
        if ($dateRange == 'yesterday') {
            $timeRange = 'time >= CURDATE() - INTERVAL 1 DAY AND time < CURDATE()';
        }
        if ($dateRange == 'week') {
            $timeRange = 'YEARWEEK(time) = YEARWEEK(NOW() - INTERVAL 1 WEEK)';
        }
        if ($dateRange == 'month') {
            $timeRange = 'MONTH(time) = MONTH(CURRENT_DATE()) AND YEAR(time) = YEAR(CURRENT_DATE())';
        }
        if ($dateRange == 'year') {
            $timeRange = 'YEAR(time) = YEAR(CURDATE())';
        }

        $banParameter = "`banned_ip` = '0' AND `banned_agent` = '0'";

        if ($ipBan == true) {
            $banParameter = "`banned_ip` = '1'";
        }
        if ($uaBan == true) {
            $banParameter = "`banned_agent` = '1'";
        }
        if ($activityBan == true){
            $banParameter = "`blocked_activity` = '1'";
        }

        $query = "SELECT COUNT(DISTINCT ip) as res FROM $table_name WHERE $timeRange AND $banParameter ";

        $result = $wpdb->get_results($query);

        return $result[0]->res;
    }

}

