/**
 * Created by 123 on 28.06.2016.
 * item.model.js
 * Item brief model
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 define
 */

define([
  'backbone',
  'json!ep_mod_ic/config.json'
], function ( Backbone, config ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var ItemModel;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODEL CONSTRUCTOR -----------------------

  ItemModel = Backbone.Model.extend({
    initialize : function () {
      this.setImgPath();
    },

    setImgPath : function () {
      var img_path = config.items_path;
      img_path +=  '/' + this.get( 'id' );
      img_path += '/img/' + this.get( 'thumb_img' );
      this.set( { img_path : img_path } );
    }
  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------


  // Return Model constructor
  return ItemModel;
});