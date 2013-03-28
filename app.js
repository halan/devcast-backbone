App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  start: function(rootEl, options){
    this.initializeTweets(options);
    this.render(rootEl)
    this.updateTweets();
  },

  initializeTweets: function(options){
    this.tweets = new App.Collections.Tweets([], options);
  },

  render: function(rootEl){
    this.el = rootEl;
    this.renderTweets();
    return this;
  },

  renderTweets: function(){
    this.tweetViews = new App.Views.TweetViews({collection: this.tweets});
    this.tweetViews.render().$el.appendTo(this.el);
  },

  updateTweets: function(){
    this.tweets.fetch();
  }
}))();


