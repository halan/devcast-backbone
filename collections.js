App.Collections.Tweets = Backbone.Collection.extend({
  initialize: function(models, options){
    this.screen_name = options.screen_name;
    Backbone.Collection.prototype.initialize.call(this, arguments);
  },
  urlRoot: 'https://api.twitter.com/1/statuses/user_timeline.json',
  url: function(){
    return this.urlRoot+'?include_entities=true&include_rts=true&screen_name='+this.screen_name
  },
  model: App.Models.Tweet,
  fetch: function(options){
    options = options || {};
    options.dataType = 'jsonp';
    Backbone.Collection.prototype.fetch.call(this, options);
  }
});


