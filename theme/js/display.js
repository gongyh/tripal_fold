(function($){
  Drupal.behaviors.tripal_fold = {
    attach: function(context, settings){
      var data = Drupal.settings.tripal_fold.data;
      var init_uri = trans_uri(data[0].uri);
      if(data.length > 0){
        var select = $('<select></select>');
        for(var i = 0; i < data.length; i++){
	  var option = $("<option></option>");
          option.text(data[i].filename);
          option.val(data[i].filename);
	  select.append(option);
        }
        select.on('change', function(){
          loadPDB(trans_uri(data[$(this).get(0).selectedIndex].uri))
        })
        $("#pdb_viewer").before(select); 
      }
 
      var options = {
        width: 600,
        height: 600,
        antialias: true,
        quality : 'medium'
      };
      // insert the viewer under the Dom element with id 'gl'.
      var viewer = pv.Viewer(document.getElementById('pdb_viewer'), options);

      function loadPDB(path) {
       // asynchronously load the PDB file for the dengue methyl transferase
       // from the server and display it in the viewer.
       pv.io.fetchPdb(path, function(structure) {
        // display the protein as cartoon, coloring the secondary structure
        // elements in a rainbow gradient.
        viewer.cartoon('protein', structure, { color : color.ssSuccession() });
        // there are two ligands in the structure, the co-factor S-adenosyl
        // homocysteine and the inhibitor ribavirin-5' triphosphate. They have
        // the three-letter codes SAH and RVP, respectively. Let's display them
        // with balls and sticks.
        var ligands = structure.select({ rnames : ['SAH', 'RVP'] });
        viewer.ballsAndSticks('ligands', ligands);
        viewer.centerOn(structure);
      });
     }
    
     function trans_uri(path){
	return path.replace("public://","/sites/default/files/");
     }

     // load the methyl transferase once the DOM has finished loading. That's
     // the earliest point the WebGL context is available.
     //document.addEventListener('DOMContentLoaded', loadPDB);
     loadPDB(init_uri);
    }
  }
})(jQuery);
