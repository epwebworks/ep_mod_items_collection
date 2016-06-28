/**
 * Created by 123 on 28.06.2016.
 * items.view.js
 * Items collection view
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
  'ep_mod_ic/collections/items.collection',
  'ep_mod_ic/views/item.view',
  'text!ep_mod_ic/templates/items.template.html',
  'language'
], function ( Backbone, ItemsCollection, ItemView, itemsTemplate, language ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    ItemsView,

    configMap = {
      ui : {
        filters : '',
        items   : '#ep-mod-ic-items'
      }
    },

    stateMap = {
      items_path : null
    };


  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------- BEGIN VIEW CONSTRUCTOR -----------------------


  ItemsView = Backbone.View.extend({

    template : _.template( itemsTemplate ),

    initialize : function ( init_data ) {
      this.collection = new ItemsCollection( init_data.items.item_list );
    },

    render : function () {
      var
        _lang = language.get().dictionary;

      this.$el.addClass( 'row' );
      this.$el.html( this.template );

      this.collection.each( function ( item_model ) {
        var itemView;

        // Set model language to current
        item_model.set({ _lang :_lang });

        // Create item view
        itemView = new ItemView({ model : item_model });

        // Append item view to containing element
        this.$( configMap.ui.items ).append( itemView.render().el );

      }, this );

      return this;
    }
  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------

  // Return View constructor
  return ItemsView;
});