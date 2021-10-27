/** 
 * Returns one or more variables assigned to a node.
 * 
 * An array is returned containing an object for each variable assigned
 * to a term that matches the criteria. If a name and rank are provided then
 * the variables returned must match.
 * 
 * @param $nid
 *   The node ID
 * @param $name
 *   Optional. The name of the variable
 * @param $rank
 *   Optional. The rank of the variable to retreive
 * @return 
 *   An array of variable objects.
 */
function tripal_get_node_variables($nid, $name = '', $rank = '') {
    $variables = array();
    if (!$nid) {
	return $variables;
    }
    $query = db_select('tripal_node_variables', 'tnv')
	->fields('tnv')
	->condition('nid', $nid, '=');
    if ($name) {
	$variable = tripal_get_variable($name);
	$query->condition('variable_id', $variable->variable_id, '=');
    }
    if ($rank) {
	$query->condition('rank', $rank, '=');
    }
    $results = $query->execute();

    // Build the variables array and return it
    while ($variable = $results->fetchObject()) {
	$variables[] = $variable;
    }
    return $variables;
}
