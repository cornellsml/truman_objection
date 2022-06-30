const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    r_id: { type: String, unique: true },

    conditions: Array, // ex: 261: value is string with format: {offense}{objectionType}{objectionMessage}
    numComments: { type: Number, default: 0 }, // How many comments has user made

    feedAction: [new Schema({
        condition_id: Number, // Example: 062
        off_id: Number, // Example: 0
        obj_t_id: Number, // Example: 6
        obj_m_id: Number, // Example: 2

        // should only be one
        videoAction: new Schema({
            liked: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            disliked: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            flagged: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            shared: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
        }, { _id: false, versionKey: false }),

        // one for each comment: whether fake or user's
        // Two types of comments: 1) Comment to Video, 2) Reply (Comment) to a User
        commentAction: [new Schema({
            commentID: Number, // 1, 2, 3, 4, 5 (5 is the incoming comment), 6+ are user comments
            // comment_type: String, // user, normal, offense, objection
            liked: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            disliked: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            flagged: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },
            shared: {
                action: { type: Boolean, default: false },
                absTimes: Array
            },

            comment_body: String, // Body of comment

            new_comment: { type: Boolean, default: false }, // is new comment
            new_comment_time: { type: Number },
            reply_to: Number // ID if comment is a reply
        }, { _id: true, versionKey: false })],
    })],

    profile: {
        username: String,
        photo: String,
    },

    pageLog: [new Schema({
        time: Date,
        page: String,
        search: String
    })]
}, { timestamps: true, versionKey: false });

userSchema.methods.logPage = function logPage(time, page, search) {
    let log = {};
    log.time = time;
    log.page = page;
    log.search = search;
    this.pageLog.push(log);
};

// /**
//  * Password hash middleware.
//  */
// userSchema.pre('save', function save(next) {
//     const user = this;
//     if (!user.isModified('password')) { return next(); }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) { return next(err); }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });

// /**
//  * Helper method for validating user's password.
//  */
// userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         cb(err, isMatch);
//     });
// };

// userSchema.methods.logPostStats = function logPage(postID) {

//     let log = {};
//     log.postID = postID;
//     log.citevisits = this.log.length;
//     log.generalpagevisit = this.pageLog.length;

//     if (this.study_days.length > 0) {
//         log.DayOneVists = this.study_days[0];
//         log.DayTwoVists = this.study_days[1];
//         log.DayThreeVists = this.study_days[2];
//     }

//     log.GeneralLikeNumber = this.numPostLikes + this.numCommentLikes;
//     log.GeneralPostLikes = this.numPostLikes;
//     log.GeneralCommentLikes = this.numCommentLikes;
//     log.GeneralFlagNumber = 0;


//     for (var k = this.feedAction.length - 1; k >= 0; k--) {
//         if (this.feedAction[k].post != null) {
//             if (this.feedAction[k].liked) {
//                 //log.GeneralLikeNumber++;
//             }
//             //total number of flags
//             if (this.feedAction[k].flagTime[0]) {
//                 log.GeneralFlagNumber++;
//             }
//         }
//     }

//     log.GeneralPostNumber = this.numPosts + 1;
//     log.GeneralCommentNumber = this.numComments + 1;

//     this.postStats.push(log);
// };

// /**
//  * Add Log to User if access is 1 hour from last use.
//  */
// userSchema.methods.logUser = function logUser(time, agent, ip) {

//     if (this.log.length > 0) {
//         var log_time = new Date(this.log[this.log.length - 1].time);

//         if (time >= (log_time.getTime() + 3600000)) {
//             var log = {};
//             log.time = time;
//             log.userAgent = agent;
//             log.ipAddress = ip;
//             this.log.push(log);
//         }
//     } else if (this.log.length == 0) {
//         var log = {};
//         log.time = time;
//         log.userAgent = agent;
//         log.ipAddress = ip;
//         this.log.push(log);
//     }

// };

// /**
//  * Helper method for getting all User Posts.
//  */
// userSchema.methods.getPosts = function getPosts() {
//     var temp = [];
//     for (var i = 0, len = this.posts.length; i < len; i++) {
//         if (this.posts[i].postID >= 0)
//             temp.push(this.posts[i]);
//     }

//     //sort to ensure that posts[x].postID == x
//     temp.sort(function(a, b) {
//         return a.postID - b.postID;
//     });

//     return temp;

// };

// /**
//  * Helper method for getting all User Posts and replies.
//  */
// userSchema.methods.getPostsAndReplies = function getPostsAndReplies() {
//     var temp = [];
//     for (var i = 0, len = this.posts.length; i < len; i++) {
//         if (this.posts[i].postID >= 0 || this.posts[i].replyID >= 0)
//             temp.push(this.posts[i]);
//     }

//     //sort to ensure that posts[x].postID == x
//     temp.sort(function(a, b) {
//         return a.absTime - b.absTime;
//     });

//     return temp;

// };

// //Return the user post from its ID
// userSchema.methods.getUserPostByID = function(postID) {

//     return this.posts.find(x => x.postID == postID);

// };


// //Return the user reply from its ID
// userSchema.methods.getUserReplyByID = function(replyID) {

//     return this.posts.find(x => x.replyID == replyID);

// };

// //Return the user reply from its ID
// userSchema.methods.getActorReplyByID = function(actorReplyID) {

//     return this.posts.find(x => x.actorReplyID == actorReplyID);

// };

// //get user posts within the min/max time period 
// userSchema.methods.getPostInPeriod = function(min, max) {
//     //concat posts & reply
//     return this.posts.filter(function(item) {
//         return item.relativeTime >= min && item.relativeTime <= max;
//     });
// }

// /**
//  * Helper method for getting user's gravatar.
//  */
// userSchema.methods.gravatar = function gravatar(size) {
//     if (!size) {
//         size = 200;
//     }
//     if (!this.email) {
//         return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//     }
//     const md5 = crypto.createHash('md5').update(this.email).digest('hex');
//     return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;