var FidelSlideshow = Fidel.ViewController.extend({
  init: function(data) {
    this.slides = data.slides || [];
    this.currentSlide = (document.location.hash.split('=')[1])-1 || 0;
    if(this.currentSlide > this.slides.length-1) this.currentSlide = this.slides.length;

    //show first slide, or slide from url
    this._showSlide(this.slides[this.currentSlide]);
  },

  next: function next() {
    if(this.currentSlide === this.slides.length-1) return;
    this.currentSlide++;
    this._removeSlide(function(){
      this._showSlide(this.slides[this.currentSlide]);
    });
  },
  prev: function previous() {
    if(this.currentSlide === 0) return;
    this.currentSlide--;
    this._removeSlide(function(){
      this._showSlide(this.slides[this.currentSlide]);
    });
  },
  gotoSlide: function gotoSlide(number) {
    if(number > this.slides.length-1);
    this.currentSlide = number;
    this.removeSlide();
    this._showSlide(this.slides[number]);
  },

  _loadImg: function loadImage(image, callback) {
    var self = this;
    
    this.img = new Image();
    this.img.src = image;

    if(this.img.complete || this.img.readyState === 4) {
      callback.apply(self);
    } else {
      $(this.img).one('load', function() {
        callback.apply(self);
      });
    }
  },

  _updateHash: function updateHash() {
    document.location.hash = ['page', this.currentSlide+1].join('=');
  },

  _showSlide: function showSlide(slide) {
    this._loadImg(slide.url, function() {
      this.imageContainer.html(this.img).find('img').hide().fadeIn('slow');
      this.title.html(slide.title).hide().fadeIn();
      this.caption.html(slide.caption).hide().fadeIn();
      this.credit.html(slide.credit).hide().fadeIn();

      this._updateHash();
    });
  },

  _removeSlide: function removeSlide(callback) {
    var self = this;
    this.title.fadeOut();
    this.caption.fadeOut();
    this.credit.fadeOut();
    this.imageContainer.find('img').fadeOut(function() {
      callback.apply(self);
    });
  }
});