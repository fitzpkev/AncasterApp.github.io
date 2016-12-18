/*
 * Author: Kevin Fitzgerald
 * 
 * Sources: Adapted from https://github.com/makinacorpus/Leaflet.Social/
 */

L.Control.Social = L.Control.extend({
  includes: L.Mixin.Events,
  options: {
    position: 'bottomleft',
    default_text: "Check out this map of businesses in Ancaster",
    links: [
      ['facebook', "Facebook", "https://www.facebook.com/sharer.php?u=_url_&t=_text_"],
      ['twitter', "Twitter", "https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20map%20of%20Ancaster%20Businesses!"],
      ['google-plus', "Google Plus", "https://plus.google.com/share?url=_url_"]
    ]
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  share: function () {
    var url = this.link;
    url = url.replace(/_text_/, encodeURIComponent(this.self.options.default_text));
    url = url.replace(/_url_/, encodeURIComponent(location.href));
    window.open(url);
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control');
    for (var i = 0; i < this.options.links.length; i++) {
      infos = this.options.links[i];
      var div = L.DomUtil.create('div', 'leaflet-social-control', this._container);
      var link = L.DomUtil.create('a', 'leaflet-social-control-'+infos[0], div);
      link.href = infos[2];
      link.title = infos[1];
      var span = L.DomUtil.create('span', 'icon-'+infos[0]+'-sign', link);

      L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.share, {self: this, link: infos[2]});
    };

    return this._container;
  }
});

L.control.social = function (options) {
  return new L.Control.Social(options);
};