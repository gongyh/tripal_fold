<?php
function tripal_fold_preprocess_tripal_fold_main(&$variables){
    $feature_id = $variables['node']->feature->feature_id;
    $sql = "SELECT pdb_loc FROM {tripal_fold} WHERE feature_id = :feature_id";
    $args = array(':feature_id' => $feature_id);
    $result = db_query($sql, $args);
    if($result){
	$poc_loc = $result->fetchObject()->poc_loc;
 	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/three.min.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/CSS2DRenderer.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/PDBLoader.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/OrbitControls.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/stats.min.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/dat.gui.min.js');
	drupal_add_js(drupal_get_path('module', 'tripal_fold') . '/theme/js/Detector.js');
    }
}
