const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function timeStringToNum (v) {
  var timeParts = v.split(":");
  return ((timeParts[0] * (60000 * 60)) + (timeParts[1] * 60000));
}

const scriptSchema = new mongoose.Schema({
  body: {type: String, default: '', trim: true},
  post_id: Number,
  class: String, //experimental or normal
  picture: String,
  highread: Number,
  lowread: Number,
  likes: Number,
  actor: {type: Schema.ObjectId, ref: 'Actor'},
  reply: {type: Schema.ObjectId, ref: 'Script'},
  post_class: String,
  control:Number,
  des_20:Number,
  des_80: Number,
  r5: Number,
  r25: Number,
  r30: Number,
  r40: Number,
  r60: Number,
  des_5_community_injunctive:Number,
  des_30_community_injunctive: Number,
  des_60_community_injunctive: Number,
  des_5_injunctive_platform: Number,
  des_30_injunctive_platform: Number,
  des_60_injunctive_platform: Number,
  r5_rules_noCommunity: Number,
  r30_rules_noCommunity: Number,
  r60_rules_noCommunity: Number,
  
  

  experiment_group: String,

  time: Number, //in millisecons
// des_20  des_80  des_20_community_injunctive des_80_community_injunctive des_20-injunctive_platform  des_80-injunctive_platform
  comments: [new Schema({
    class: String, //Bully, Marginal, normal, etc
    actor: {type: Schema.ObjectId, ref: 'Actor'},
    body: {type: String, default: '', trim: true}, //body of post or reply
    commentID: Number, //ID of the comment
    time: Number,//millisecons
    new_comment: {type: Boolean, default: false}, //is new comment
    likes: Number, 
    category: String,
    control: Number,
    des_20: Number, 
    des_80: Number,
    des_20_community_injunctive: Number, 
    des_80_community_injunctive: Number,
    des_20_injunctive_platform: Number,
    des_80_injunctive_platform: Number,
    r5: Number,
    r25: Number,
    r40: Number,
    r60: Number,
    }, { versionKey: false })]
  
},{ versionKey: false });


const Script = mongoose.model('Script', scriptSchema);

module.exports = Script;
