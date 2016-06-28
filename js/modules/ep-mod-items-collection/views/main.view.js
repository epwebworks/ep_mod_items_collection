/**
 * Created by 123 on 25.06.2016.
 * main.view.js
 * Main module view
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
  'ep_mod_ic/views/items.view',
  'json!ep_mod_ic/resources/items/items.json',
  'text!ep_mod_ic/templates/main.template.html',
  'language'
], function( Backbone, ItemsView, itemsJSON, mainTemplate, language ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    MainView,
    configMap = {
      class_id : 'MainView',
      languages : {
        ru : 'js/modules/ep-mod-items-collection/resources/languages/lang_ru.json',
        en : 'js/modules/ep-mod-items-collection/resources/languages/lang_en.json'
      },
      ui : {
        lang             : '#ep-mod-ic-lang',
        items_collection : '#ep-mod-ic-collection'
        }
      };

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------- BEGIN VIEW CONSTRUCTOR -----------------------

  MainView = Backbone.View.extend({

    // View template
    template : _.template( mainTemplate ),

    // Events map
    events : {
      'click #ep-mod-ic-lang button' : 'onClickLang'
    },

    // Begin View method /initialize/
    //
    // Purpose : run methods on view init
    initialize : function () {
      this.$el.addClass( 'container' );
      this.setLang( 'ru', configMap.languages.ru, true );
      this.itemsView = new ItemsView({
        items   : itemsJSON,
        filters : null
      });
    },
    // End View method initialize/

    // Begin View method /render/
    //
    // Purpose   : render view
    // Arguments :
    //   * tmplData - {Object} Map of key-object and key-values pairs
    render : function ( tmplData ) {
      this.$el.html( this.template( tmplData ) );
      this.itemsView.$el = this.$( configMap.ui.items_collection );
      this.itemsView.render();
    },
    // End View method /render/

    // Begin View method /onClickLang/
    //
    // Purpose   : handles clicking on language switching buttons
    // Arguments :
    //   * event - event object
    // Throw     : none
    // Return    : none
    onClickLang : function ( event ) {
      var elem, lang_code;

      event.preventDefault();
      elem = event.target;
      lang_code = $( elem ).attr( 'href' ).slice( 1 );
      this.setLang( lang_code, configMap.languages[ lang_code ], true);
    },
    // End View method /onClickLang/

    // Begin View method /setLang/
    //
    // Purpose   : toggle current language
    // Arguments :
    //   * lang_code - {String} two latin letters
    //   * lang_path - {String} JSON language relative path
    //   * do_set_current - {Boolean} if true make language current
    // Throws    : none
    // Return    : none
    setLang : function ( lang_code, lang_path, do_set_current ) {
      var
        $buttons,
        self     = this,
        lang_map = {};

      lang_map[ lang_code ] = lang_path;

      $( language ).one( 'load', () => {
        self.render( self.getTemplateData() );
        $buttons = self.$( configMap.ui.lang + ' button' );
        $buttons.removeClass( 'active' );
        $buttons.filter( '[href="#' + lang_code + '"]' ).addClass( 'active' );
      } );

      language.set( lang_map, do_set_current );
    },
    // End View method /setLang/

    // Begin View method /getTemplateData/
    //
    // Purpose   : create object for main template that includes language
    //             dependent and other required data
    // Arguments : none
    // Throw     : none
    // Return    :
    //   * tmplData - mapped template text data
    getTemplateData : function () {
      var
        curr_lang = language.get(),
        tmplData = { _lang : curr_lang.dictionary };
      
      return tmplData;
    }
    // End View method /getTemplateData/

  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------


  // Return View constructor
  return MainView;

});
