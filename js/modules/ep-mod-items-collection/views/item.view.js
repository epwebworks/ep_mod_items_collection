/**
 * Created by 123 on 28.06.2016.
 * item.view.js
 * Item brief view
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
  'text!ep_mod_ic/templates/item.template.html'
], function ( Backbone, itemTemplate ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var configMap = {
      class_name : {
        el : 'col-xs-12 col-sm-4'
      }
    },
    ItemView;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------- BEGIN VIEW CONSTRUCTOR -----------------------


  ItemView = Backbone.View.extend({

    template : _.template( itemTemplate ),

    initialize : function () {
    },

    render : function () {
      this.$el.addClass( configMap.class_name.el );
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }
  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------

  // Return View constructor
  return ItemView;
});
