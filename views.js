App.Views.TweetViews = Backbone.View.extend({
  events: {
    'click a': 'refresh'
  },
  template: _.template('<div class="controls"><a href="#">Atualizar</a></div><ul></ul>'),
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderOne);
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'sync', this.renderAll);
  },

  className: 'tweets',

  refresh: function(){
    this.loadingMessage('Carregando...');
    this.collection.fetch();
  },

  populate: function(){
    if(this.collection.isEmpty())
      this.refresh();
    else
      this.renderAll();
  },

  loadingMessage: function(message){
    this.$('> ul').text(message);
  },

  render: function(){
    this.$el.html(this.template());
    this.populate();

    return this;
  },

  renderAll: function(){
    this.$('> ul').empty();
    this.collection.forEach(this.renderOne, this);
  },

  renderOne: function(tweet){
    var tweetView = new App.Views.TweetView({model: tweet}).render();
    this.$('> ul').append(tweetView.el);
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
