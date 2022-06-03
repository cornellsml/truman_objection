const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    r_id: { type: String, unique: true },

    offense: Array,
    objection_type: Array,
    objection_message: Array,

    feedAction: [new Schema({
        offense_id: Number,
        objection_type_id: Number,
        objection_message_id: Number,

        // should only be one
        videoAction: [new Schema({
            liked: [new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false })], // did the user like the video?
            disliked: [new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false })], // did the user dislike the video?
            flagged: [new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false })], // did the user flag the video?
            shared: [new Schema({
                    action: Boolean,
                    absTime: Date
                }, { _id: false, versionKey: false })] // did the user share the video?
        }, { _id: false, versionKey: false })],

        // one for each comment: whether fake or user's
        commentAction: [new Schema({
            comment_id: Number, // 1, 2, 3, 4, 5
            // comment_type: String, // user, normal, offense, objection
            liked: new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false }),
            disliked: new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false }),
            flagged: new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false }),
            shared: new Schema({
                action: Boolean,
                absTime: Date
            }, { _id: false, versionKey: false }),
            comment_body: String, //Original Body of User Post

            new_comment: { type: Boolean, default: false }, //is new comment
            new_comment_id: Number, //ID for comment
            new_comment_time: { type: Number },
        }, { _id: true, versionKey: false })],
    })],

    profile: {
        username: String,
        photo: String,
    },

    pageLog: [new Schema({
        time: Date,
        page: String
    })],

    lastNotifyVisit: Date
}, { timestamps: true, versionKey: false });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

/**
 * Add Log to User if access is 1 hour from last use.
 */
userSchema.methods.logUser = function logUser(time, agent, ip) {

    if (this.log.length > 0) {
        var log_time = new Date(this.log[this.log.length - 1].time);

        if (time >= (log_time.getTime() + 3600000)) {
            var log = {};
            log.time = time;
            log.userAgent = agent;
            log.ipAddress = ip;
            this.log.push(log);
        }
    } else if (this.log.length == 0) {
        var log = {};
        log.time = time;
        log.userAgent = agent;
        log.ipAddress = ip;
        this.log.push(log);
    }

};

userSchema.methods.logPage = function logPage(time, page) {

    let log = {};
    log.time = time;
    log.page = page;
    this.pageLog.push(log);
};

userSchema.methods.logPostStats = function logPage(postID) {

    let log = {};
    log.postID = postID;
    log.citevisits = this.log.length;
    log.generalpagevisit = this.pageLog.length;

    if (this.study_days.length > 0) {
        log.DayOneVists = this.study_days[0];
        log.DayTwoVists = this.study_days[1];
        log.DayThreeVists = this.study_days[2];
    }

    log.GeneralLikeNumber = this.numPostLikes + this.numCommentLikes;
    log.GeneralPostLikes = this.numPostLikes;
    log.GeneralCommentLikes = this.numCommentLikes;
    log.GeneralFlagNumber = 0;


    for (var k = this.feedAction.length - 1; k >= 0; k--) {
        if (this.feedAction[k].post != null) {
            if (this.feedAction[k].liked) {
                //log.GeneralLikeNumber++;
            }
            //total number of flags
            if (this.feedAction[k].flagTime[0]) {
                log.GeneralFlagNumber++;
            }
        }
    }

    log.GeneralPostNumber = this.numPosts + 1;
    log.GeneralCommentNumber = this.numComments + 1;

    this.postStats.push(log);
};

/**
 * Helper method for getting all User Posts.
 */
userSchema.methods.getPosts = function getPosts() {
    var temp = [];
    for (var i = 0, len = this.posts.length; i < len; i++) {
        if (this.posts[i].postID >= 0)
            temp.push(this.posts[i]);
    }

    //sort to ensure that posts[x].postID == x
    temp.sort(function(a, b) {
        return a.postID - b.postID;
    });

    return temp;

};

/**
 * Helper method for getting all User Posts and replies.
 */
userSchema.methods.getPostsAndReplies = function getPostsAndReplies() {
    var temp = [];
    for (var i = 0, len = this.posts.length; i < len; i++) {
        if (this.posts[i].postID >= 0 || this.posts[i].replyID >= 0)
            temp.push(this.posts[i]);
    }

    //sort to ensure that posts[x].postID == x
    temp.sort(function(a, b) {
        return a.absTime - b.absTime;
    });

    return temp;

};

//Return the user post from its ID
userSchema.methods.getUserPostByID = function(postID) {

    return this.posts.find(x => x.postID == postID);

};


//Return the user reply from its ID
userSchema.methods.getUserReplyByID = function(replyID) {

    return this.posts.find(x => x.replyID == replyID);

};

//Return the user reply from its ID
userSchema.methods.getActorReplyByID = function(actorReplyID) {

    return this.posts.find(x => x.actorReplyID == actorReplyID);

};

//get user posts within the min/max time period 
userSchema.methods.getPostInPeriod = function(min, max) {
    //concat posts & reply
    return this.posts.filter(function(item) {
        return item.relativeTime >= min && item.relativeTime <= max;
    });
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

/* Garbage snips
    new Schema({ //{type: Schema.ObjectId, ref: 'Script'},
      body: {type: String, default: '', trim: true},
      picture: String,
      time: Number,
      actorName: String,
      actorPicture: String,
      actorUserName: String}),
    */