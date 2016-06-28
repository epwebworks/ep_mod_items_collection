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
  'text!ep_mod_ic/templates/main.template.html',
  'language'
], function( Backbone, mainTemplate, language ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    MainView,
    configMap = {
      languages : {
        ru : 'js/modules/ep-mod-items-collection/resources/languages/lang_ru.json',
        en : 'js/modules/ep-mod-items-collection/resources/languages/lang_en.json'
      }
      };

  // ----------------------- END MODULES SCOPE VARIABLES --------------------


  // ------------------------- BEGIN VIEW CONSTRUCTOR -----------------------

  MainView = Backbone.View.extend({
    classId : 'MainView',

    template : _.template( mainTemplate ),

    ui : {
      lang : '.ep-mod-ic-lang'
    },

    events : {
      'click .ep-mod-ic-lang' : 'onClickLang'
    },

    initialize : function () {
      var self = this;
      this.$el.addClass( 'container' );
      this.setLang( 'ru', configMap.languages.ru, true );
    },

    render : function ( tmplData ) {
      this.$el.html( this.template( tmplData ) );
    },

    onClickLang : function ( event ) {
      var elem, lang_code;

      event.preventDefault();
      elem = event.target;
      lang_code = $( elem ).attr( 'href' ).slice( 1 );
      this.setLang( lang_code, configMap.languages[ lang_code ], true);

    },

    setLang : function ( lang_code, lang_path, do_set_current ) {
      var
        $buttons,
        self     = this,
        lang_map = {};


      lang_map[ lang_code ] = lang_path;

      $( language ).one( 'load', () => {
        self.render( self.getTemplateData() );
        $buttons = self.$( self.ui.lang + ' button' );
        $buttons.removeClass( 'active' );
        $buttons.filter( '[href="#' + lang_code + '"]' ).addClass( 'active' );
      } );

      language.set( lang_map, do_set_current );
    },

    getTemplateData : function () {
      var
        curr_lang = language.get(),
        tmplData = { _lang : curr_lang.dictionary };
      
      return tmplData;
    }

  });

  // -------------------------- END VIEW CONSTRUCTORS -----------------------


  return MainView;

});
