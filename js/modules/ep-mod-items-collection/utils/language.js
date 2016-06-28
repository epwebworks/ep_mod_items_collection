/**
 * Created by 123 on 26.06.2016.
 * language.js
 * Language utilite
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
  'jquery'
], function( $ ) {
  "use strict";


  // ---------------------- BEGIN MODULE SCOPE VARIABLES --------------------

  var
    stateMap = {
      current_lang : null,
      current_dict : null,
      dictionaries : {}
    },

    setLang, getLang, publicAPI;

  // ----------------------- END MODULES SCOPE VARIABLES --------------------
  

  // -------------------------- BEGIN PUBLIC METHODS ------------------------

  // Begin Public method /setLang/
  //
  // Example   : language.setLang({ ru : 'js/res/lang_ru.json' }, true )
  // Purpose   : set language from JSON file with dictionary
  // Arguments :
  //   * lang_map - Obj { lang_code : dict_url }
  //     where lang_code is 2 character {String}, dict_url {String}
  //   * do_set_current - optional {Boolean}
  //     true  - make these language and dictionary current
  // Throws    : error on incorrect dictionary url
  // Return    : none
  setLang = function ( lang, do_set_current ) {
    var lang_code;

    switch ( typeof lang ) {

      case 'string':
        if ( stateMap.dictionaries[ lang ] ) {
          stateMap.current_lang = lang;
          stateMap.current_dict = stateMap.dictionaries[ lang ];
        }
        break;

      case 'object':
        for ( lang_code in lang ) {
          if ( lang.hasOwnProperty( lang_code ) ) {
            $.getJSON( lang[ lang_code ], function ( dict ) {
              stateMap.dictionaries[ lang_code ] = dict;
              if ( do_set_current ) {
                stateMap.current_lang = lang_code;
                stateMap.current_dict = dict;
              }
              $( publicAPI ).trigger( 'load', lang_code );
            } );
          }
        }
        break;
    }
  };
  // End Public method /setLang/

  getLang = function ( lang ) {
    if ( ! lang ) {
      return {
        language   : stateMap.current_lang,
        dictionary : stateMap.current_dict
      }
    }
    return stateMap.dictionaries[ lang ] || false;
  };

  // --------------------------- END PUBLIC METHODS -------------------------


  publicAPI = {
    setLang : setLang,
    getLang : getLang
  };

  // Return module public API
  return publicAPI;

});
