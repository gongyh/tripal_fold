(function($){
  Drupal.behaviors.tripal_fold = {
    attach: function(context, settings){
      var data = Drupal.settings.tripal_fold.data;
      var uniquename = Drupal.settings.tripal_fold.feature_uniquename;
      var init_uri = trans_uri(data[0].uri, uniquename);
      if(data.length > 0){
        var select = $('<select></select>');
        var download_btn = $('<button>download</button>')
        download_btn.css('margin-left', '20px');
        for(var i = 0; i < data.length; i++){
	  var option = $("<option></option>");
          option.text(data[i].filename);
          option.val(data[i].filename);
	  select.append(option);
        }
        select.on('change', function(){
          loadPDB(trans_uri(data[$(this).get(0).selectedIndex].uri))
        })
        download_btn.on('click', function(){
	  var pdb_selected = data[select.get(0).selectedIndex].filename;
          var href = '/tripal/pdb_files_download/' + uniquename + '/' + pdb_selected;
	  $(window).attr('location', href);
        })
        $("#pdb_viewer").before(select); 
        $("#pdb_viewer").before(download_btn);
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
    
     function trans_uri(path, feature_name){
	return path.replace("public://pdb","/sites/default/files/pdb/" + feature_name + "/");
     }

     // load the methyl transferase once the DOM has finished loading. That's
     // the earliest point the WebGL context is available.
     //document.addEventListener('DOMContentLoaded', loadPDB);
     loadPDB(init_uri);
    }
  }
})(jQuery);
