(function($){
  Drupal.behaviors.tripal_fold = {
    attach: function(context, settings){
      var pdb_location = Drupal.settings.tripal_fold.pdb_location;
      var jmolpath = Drupal.settings.tripal_fold.jmolpath;
      console.log(jmolpath);
      var pdb = pdb_location[0];
      var initcommand = 'wareframe ONLY';
      jmolInitialize(jmolpath);
      jmolApplet(400, 'load ' + pdb + ';' + initcommand);
      jmolBr();
      jmolHtml('style ');
      jmolRadioGroup([[initcommand, 'wireframe', 'checked'],['wireframe ONLY;wireframe 0.5;', 'Sticks'],['spacefill ONLY', 'Balls']]);
    }
  }
})(jQuery);
