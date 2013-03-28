App.Views.TweetViews = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderOne);
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'sync', this.renderAll);
  },

  tagName: 'ul',
  className: 'tweets',
  render: function(){
    if(_.isEmpty(this.collection)) this.renderAll();
    return this;
  },
  renderAll: function(){
    this.$el.empty();
    this.collection.forEach(this.renderOne, this);
  },
  renderOne: function(tweet){
    var tweetView = new App.Views.TweetView({model: tweet}).render();
    this.$el.append(tweetView.el);
  }
});


App.Views.TweetView = Backbone.View.extend({
  template: _.template('<p><img src="<%= user.profile_image_url %>" /><%= text %></strong><p>'),
  tagName: 'li',
  className: 'tweet',
  render: function(){
    var innerHTML = this.template(this.model.toJSON());
    this.$el.html(innerHTML);

    return this;
  }
})


