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


  // ----------------------- BEGIN COLLECTION CONSTRUCTOR -------------------

  ItemsCollection = Backbone.Collection.extend({
    model : ItemModel,

    initialize : function () {

    },

    // -------------------- BEGIN PAGINATION METHODS ----------------

    // Begin Collection method /goTo/
    //
    // Purpose : go to a specific page
    gotTo : function () {
 
    },
    // End Collection method /goTo/

    // Begin Collection method /nextPage/
    //
    // Purpose : go to the next page
    nextPage : function () {

    },
    // End Collection method /nextPage/

    // Begin Collection method /prevPage/
    //
    // Purpose : go to the previous page
    prevPage : function () {

    },
    // End Collection method /prevPage/

    // Begin Collection method /howManyPer/
    //
    // Purpose : Set how many items to display per page
    howManyPer : function ( n ) {

    },
    // End Collection method /howManyPer/


    // Begin Collection method /setSort/
    //
    // Purpose : Update sort on the current view. Sorting will automatically
    //           detect if you’re trying to sort numbers (even if they’re
    //           stored as strings) and will do the right thing.
    setSort : function ( sortBy, sortDirection ) {

    },
    // End Collection method /setSort/

    // Begin Collection method /setFilter/
    //
    // Purpose : Filter the current view. Filtering supports multiple words
    //           without any specific order, so you’ll basically get a full-text
    //           search ability. Also, you can pass it only one field from the
    //           model, or you can pass an array with fields and all of them
    //           will get filtered.
    //           The last option is to pass it an object containing a comparison
    //           method and rules. Currently, only the Levenshtein method is
    //           available. The Levenshtein distance is the difference between
    //           two strings and is effectively the minimum number of changes
    //           required to change one word into another.
    setFilter : function ( filterFields, filterWords ) {

    },

    // Begin Collection method /doFakeFilter/
    //
    // Purpose : Returns the models count after fake-applying a call to
    //           Collection.setFilter.
    doFakeFilter : function ( ) {

    },
    // End Collection method /doFakeFilter/

    // Begin Collection method /setFieldFilter/
    //
    // Example : my_collection.setFieldFilter([
    //             {field: 'release_year', type: 'range', value:
    //             {min: '1999', max: '2003'}},
    //             {field: 'author', type: 'pattern', value: new RegExp('A*', 'igm')}
    //           ]);
    // Purpose : Filter each value of each model according to rules that you
    //           pass as an argument. Say you have a collection of books with
    //           release year and author. You can filter only the books that
    //           were released between 1999 and 2003. And then you can add
    //           another rule that will filter those books only to authors
    //           whose name starts with A.
    //           Possible rules:
    //           function, required, min, max, range, minLength, maxLength,
    //           rangeLength, oneOf, equalTo, containsAllOf, pattern.
    //           Passing this an empty rules set will remove any FieldFilter
    //           rules applied.
    setFieldFilter : function ( rules, doApplyFilter ) {
      var field, type, value, equalTo, range,
        filtered_models = this.models;


      // Begin Filter method /equalTo/
      //
      // Purpose : filter and return models with given attribute value/values
      //           equal to set
      equalTo = ( field, value, models ) => {
        var value_type = Array.isArray( value ) ? 'array' : typeof value;

        switch ( value_type ) {
          case 'string' :
          case 'number' :
            return models.filter( ( model ) => {
              return model.get( field ) === value;
            } );

          case 'array' :
            let filtered_models = [];
            // For each set filter value ( if given as array )
            value.forEach( ( val ) => {
              // ... compare to model value
              models.forEach( ( model ) => {
                var
                  model_value = model.get( field ),
                  model_value_type =
                    Array.isArray( model_value ) ? 'array' : typeof model_value;

                // Compare to given filter value depending on model value type
                switch ( model_value_type ) {
                  // If model value type is array, check if filter value is in it
                  case 'array':
                    if ( ! ( model.get( field ).indexOf( val ) < 0 ) ) {
                      if ( filtered_models.indexOf( model ) < 0 ) {
                        filtered_models.push( model );
                      }
                    }
                    break;

                  // Switch to default for all non-array type of model value
                  default :
                    if ( model_value === val ) { filtered_models.push( model ) }
                }


              } )
            } );
            return filtered_models;

          default :
            break;
        }
      };
      // End Filter method /equalTo/

      // Begin Filter method /range/
      //
      // Purpose : filter and return models with given attribute in set range
      range = ( field, value, models ) => {
        var min = value[ 0 ], max = value[ 1 ];
        return models.filter( ( model ) => {
          return  model.get( field ) >= min && model.get( field ) <= max;
        } )
      };
      // End Filter method /range/

      rules.forEach( ( rule ) => {
        field = rule.field;
        type  = rule.type;
        value = rule.value;

        switch ( type ) {
          case 'equalTo':
            filtered_models = equalTo( field, value, filtered_models );
            break;

          case 'range'  :
            filtered_models = range( field, value, filtered_models );
            break;
        }
      } );

      return new ItemsCollection( filtered_models );
    },
    // End Collection method /setFieldFilter/

    // Begin Collection method /doFakeFieldFilter/
    //
    // Purpose : Returns the models count after fake-applying a call to
    //           Collection.setFieldFilter.
    doFakeFieldFilter : function ( rules ) {

    }
    // End Collection method /doFakeFieldFilter/

    // -------------------- END PAGINATION METHODS ----------------

  });

  // --------------------- END COLLECTION CONSTRUCTOR -----------------------


  // Return Model constructor
  return ItemsCollection;
});