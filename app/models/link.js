var crypto = require('crypto');
var mongo = require('mongoose');

var linkSchema = mongo.Schema({
  visits: Number,
  link: String,
  title: String,
  code: String,
  base_url: String,
  url: String
});

var Link = mongo.model('Link', linkSchema);

var encrypt = function(url){
  var shasum = crypto.createHash('sha1');
  shasum.update('url');
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next){
  var code = encrypt(this.url);
  this.code = code;
  next();
})

module.exports = Link;


// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;
