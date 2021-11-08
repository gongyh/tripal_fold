<?php
$feature_id = $variables['node']->feature->feature_id;
$sql = "SELECT pdb_loc FROM {tripal_fold} WHERE	feature_id = :feature_id";
$args = array(':feature_id' => $feature_id);
$result = db_query($sql, $args);

