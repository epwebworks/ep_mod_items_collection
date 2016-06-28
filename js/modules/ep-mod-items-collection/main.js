/**
 * Created by 123 on 25.06.2016.
 * main.js
 * Main module script
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 require
 */

require.config({
  baseUrl : 'js',
  paths   : {
    jquery        : 'libs/jquery/jquery-1.12.3.min',
    bootstrap     : 'libs/bootstrap/bootstrap.min',
    underscore    : 'libs/underscore/underscore-min',
    backbone      : 'libs/backbone/backbone-min',
    text          : 'libs/require/text',
    json          : 'libs/require/json',
    ep_mod_ic     : 'modules/ep-mod-items-collection',
    language      : 'modules/ep-mod-items-collection/utils/language'
  },
  shim    : {
    'backbone'     : {
      deps    : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'underscore'   : {
      exports : '_'
    },
    'bootstrap'    : {
      deps    : ['jquery'],
      exports : 'bootstrap'
    },
    'json'         : {
      deps : ['text']
    }
  }
});

require([
  'bootstrap',
  'ep_mod_ic/views/main.view',
  'json!ep_mod_ic/config.json'
], function ( bootstrap, MainView, config ) {

  "use strict";

  new MainView({ el : config.ui.main });

});