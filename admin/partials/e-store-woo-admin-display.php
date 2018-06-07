<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @since      1.0.0
 *
 * @package    E_Store_Woo
 * @subpackage E_Store_Woo/admin/partials
 */

$options = new E_Store_Woo_Options();
$users = new E_Store_Woo_User();
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>


<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>




<div class="container-fluid e-store-woo options-area">
    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#general-options">General options</a></li>
        <li><a data-toggle="tab" href="#options-links">Links</a></li>
        <li><a data-toggle="tab" href="#options-activity">Users Activity</a></li>
        <li><a data-toggle="tab" href="#options-ua">User Agent Filter</a></li>
        <li><a data-toggle="tab" href="#options-ip">IP Filter</a></li>
    </ul>

    <div class="tab-content">
        <div id="general-options" class="tab-pane fade in active">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <h3>General options</h3>
                    <div class="row">

                        <form name="generalOptions" class="esw-options">
                            <div class="form-group">
                                <label for="plugin_enabled">Plugin enabled:</label>
                                <select name="esw_enabled" style="width: 150px;" id="plugin_enabled">
                                    <option <?= $options->pluginEnabled() ? 'selected' : '' ?> value="true">Yes</option>
                                    <option <?= !$options->pluginEnabled() ? 'selected' : '' ?> value="false">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="plugin_enabled">One redirection for user per day:</label>
                                <select name="once_per_day" style="width: 150px;" id="plugin_enabled">
                                    <option <?= $options->oncePerDay() ? 'selected' : '' ?> value="true">Yes</option>
                                    <option <?= !$options->oncePerDay() ? 'selected' : '' ?> value="false">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="ip_ban_allowed">Ip ban allowed:</label>
                                <select name="ip_ban_allowed" style="width: 150px;" id="ip_ban_allowed">
                                    <option <?= $options->ipBanAllowed() ? 'selected' : '' ?> value="true">Yes</option>
                                    <option <?= !$options->ipBanAllowed() ? 'selected' : '' ?> value="false">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="ua_ban_allowed">User Agent ban allowed:</label>
                                <select name="ua_ban_allowed" style="width: 150px;" id="ua_ban_allowed">
                                    <option <?= $options->uaBanAllowed() ? 'selected' : '' ?> value="true">Yes</option>
                                    <option <?= !$options->uaBanAllowed() ? 'selected' : '' ?> value="false">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="random_slug">Link slug for random product generator:</label>
                                <input type="text" id="random_slug" name="rand_link" value="<?=get_option('rand_link');?>">
                            </div>
                            <div class="form-group">
                                <label for="affiliate_id">Your affiliate ID:</label>
                                <input type="text" id="affiliate_id" name="affiliate_id" value="<?=get_option('affiliate_id');?>">
                            </div>
                            <button class="submit-options btn btn-default">Save</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <div id="options-links" class="tab-pane fade">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <h4>Random product</h4>
                    <input  id="randomMain" type="text" value="<?= get_home_url() ."/". get_option('rand_link') ?>"/>
                    <button type="button" class="btn btn-default btn-copy js-tooltip js-copy" data-toggle="tooltip" data-placement="bottom" data-copy="<?= get_home_url() ."/". get_option('rand_link') ?>" title="Copy to clipboard">
                        <!-- icon from google's material design library -->
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                    </button>
                    <h4>Random product from category:</h4>
					<?=$options->generateLinksByWooCat();?>
                    <div id="tree">
                    </div>
                </div>
            </div>
        </div>
        <div id="options-activity" class="tab-pane fade">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <?=$users->getMainStatistics()?>
                    <h3>Users Activity</h3>   
                    <button class="remove-activity btn btn-warning">Remove Activity</button>
                    <button class="reload-activity btn btn-info">Reload Activity</button>
                    <label for="">Reload each: </label><select class="autoreload-time">
                        <option value="10">10 seconds</option>
                        <option value="30" selected>30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="90">90 seconds</option>
                        <option value="disable">Disable</option>
                    </select>
                    <label for="">Order by: </label><select class="activity-orderby">
                        <option value="ip">IP</option>
                        <option value="time" selected>Date/Time</option>
                        <option value="user_agent">User agent</option>
                    </select>
                    <div id="activity-table">
                        <?=$users->getLogData()?>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="options-activity" class="tab-pane fade">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <?=$users->getMainStatistics()?>
                    <h3>Users Activity</h3>   <button class="remove-activity btn btn-warning">Remove Activity</button>
            <?=$users->getLogData()?>
                </div>
            </div>
        </div> -->
        <div id="options-ua" class="tab-pane fade">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <h3>User agent filter</h3>
                    <div class="well">
                    <h4>Your Current User Agent:</h4>
                    <?=$users->getCurrentUA()?>
                    </div>
                    <div class="well">
                        <h5>Bulk import</h5>
                        <el>Only .txt (one parameter per line)</el>
                        <input type="file" name="ua-bulk-file" required id="ua-bulk">
                        <button class="start-ua-import btn btn-success">Start</button>
                    </div>
                    <form class="esw-add-ip">
                        <div class="form-group">
                            <label for="random_slug">Add USER AGENT to the ban list:</label>
                            <input accept=".txt" type="text" id="ua-ban" name="ua-ban" value="">
                        </div>
                        <button class="add-ua-ban btn btn-default">Add UA</button>
                    </form>
					<?=$users->getUABanData()?>
                </div>
            </div>
        </div>
        <div id="options-ip" class="tab-pane fade">
            <div class="container-fluid">
                <div class="options-holder general col-sm-12">
                    <h3>User IP filter</h3>
                    <div class="well">
                        <h4>Your Current IP:</h4>
                        <?=$users->getRealIP()?>
                        <h4>IP's in Database: <?=$users->getIpCount()?></h4>

                    </div>
                    <div class="well">
                        <h5>Bulk import</h5>
                        <el>Only .txt (one ip per line)</el>
                        <input type="file" name="ip-bulk-file" required id="ip-bulk">
                        <button class="start-ip-import btn btn-success">Start</button>
                    </div>
                    <form class="esw-add-ip">
                        <div class="form-group">
                            <label for="random_slug">Add IP to the ban list:</label>
                            <input type="text" id="ip-ban" name="ip-ban" value="">
                        </div>
                        <button class="add-ip-ban btn btn-default">Add IP</button>
                    </form>
					<?=$users->getIpBanData()?>
                </div>
            </div>
        </div>
    </div>
</div>