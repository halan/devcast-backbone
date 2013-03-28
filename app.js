App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Router: Backbone.Router.extend({
    routes: {
      '': function(){
       console.log('rota padrão')
      },

      'teste': function(){
        console.log('meu teste');
        App.tweets.fetch();
      }
    }
  }),
  start: function(rootEl){
    this.el = $(rootEl);
    this.render();

    this.tweets = new App.Collections.Tweets([]);
    tweetViews = new App.Views.TweetViews({collection: this.tweets});
    tweetViews.render().$el.appendTo(this.el);

    window.router = new App.Router();
    Backbone.history.start({pushState: true});
  }
}))();


App.Models.Tweet = Backbone.Model.extend({
  defaults: {
    text: 'sem texto'
  }
});


App.Collections.Tweets = Backbone.Collection.extend({
  url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=twitterapi&count=2",
  model: App.Models.Tweet,
  fetch: function(options){
    options = options || {};
    options.dataType = 'jsonp';
    Backbone.Collection.prototype.fetch.call(this, options);
  }
});


App.Views.TweetViews = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderOne);
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'sync', this.renderAll);
  },

  tagName: 'ul',
  className: 'tweets',
  render: function(){
    this.collection.trigger('reset');
    return this;
  },
  renderAll: function(){
    this.$el.empty();
    this.collection.forEach(this.renderOne);
  },
  renderOne: function(tweet){
    tweetView = new App.Views.TweetView();
    tweetView.model = tweet;
    tweetView.render().$el.appendTo(tweetViews.el)
  }
});


App.Views.TweetView = Backbone.View.extend({
  template: _.template('<p>---<strong><%= text %></strong><p>'),
  tagName: 'li',
  className: 'tweet',
  render: function(){
    var innerHTML = this.template({text: this.model.get('text')});
    this.$el.html(innerHTML);

    return this;
  }
})





$(function() {
   App.start('#app');
})
