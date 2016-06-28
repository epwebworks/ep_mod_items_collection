/**
 * Created by 123 on 28.06.2016.
 * item.collection.js
 * Items brief collection
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
  'ep_mod_ic/models/item.model'
], function ( Bakbone, ItemModel ) {
  "use strict";

  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var ItemsCollection;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------ BEGIN MODEL CONSTRUCTOR -----------------------

  ItemsCollection = Backbone.Collection.extend({
    model : ItemModel,

    initialize : function () {

    }
  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------


  // Return Model constructor
  return ItemsCollection;
});