const cdn = "https://dhpd030vnpk29.cloudfront.net/truman-objections";
const viewCount = {
    3000: 7, // 0: 3 seconds
    10000: 8, // 1: 10 seconds
    15000: 9, // 2: 15 seconds
    20000: 8, // 3: 20 seconds
    40000: 7, // 4: 40 seconds
    60000: 6, // 5: 60 seconds
    75000: 7, // 6: 75 seconds
    80000: 5, // 7: 80 seconds
    83000: 6, // 8: 83 seconds
    90000: 7, // 9: 90 seconds
    97000: 8, // 10: 97 seconds
    100000: 7, // 11: 100 seconds
    140000: 6, // 12: 140 seconds
    180000: 5, // 13: 180 seconds
    200000: 6, // 14: 200 seconds
}

const times = Object.keys(viewCount);
const counts = Object.values(viewCount);
const length = counts.length;

const r_id = searchParams.get("r_id");

function loaduser() {
    const condition = parseInt([off_id, obj_t_id, obj_m_id].join(''));
    const userConditionData = user.feedAction.find(feed => feed.condition_id == condition);

    if (!userConditionData) {
        return;
    }

    const username = user.profile.username;
    const photo = user.profile.photo;

    // Add Video actions
    if (userConditionData.videoAction["liked"]["action"]) {
        $(".ui.upvote.button").addClass("green");
        $("a.ui.basic.green.left.pointing.label").html(function(i, val) { return val * 1 + 1 });
    }
    if (userConditionData.videoAction["disliked"]["action"]) {
        $(".ui.downvote.button").addClass("red");
        $("a.ui.basic.red.left.pointing.label").html(function(i, val) { return val * 1 + 1 });
    }
    if (userConditionData.videoAction["flagged"]["action"]) {
        $(".ui.flag.button").addClass("orange");
    }


    // Add Comment actions
    for (const commentAction of userConditionData.commentAction) {
        if (commentAction.new_comment) { // if action is a new comment, or done on a new comment.
            // if comment is a reply
            if (commentAction.reply_to) {
                let id = commentAction.reply_to;
                if (commentAction.reply_to <= 5) {
                    id = "actor" + commentAction.reply_to;
                }
                let orig_comment = $(`#${id}`);
                let comment_level = orig_comment.parents(".comment").length; // = 0 if 1st level, = 1 if 2nd level
                if (comment_level == 0) {
                    if (!orig_comment.children('.comments').length) {
                        orig_comment.append('<div class="comments">');
                    }
                    comments = orig_comment.find(".comments");
                } else {
                    comments = orig_comment.closest(".comments");
                }

                const mess =
                    `<div class="comment" id=${commentAction.commentID}>
                        <div class="image user_img">
                            <a class="avatar"> 
                                <img src=${photo}> 
                            </a>
                        </div>
                        <div class="content">
                            <a class="author">${username+" (me)"}</a>
                            <div class="metadata">
                                <span class="date">${humanized_time_span(commentAction.new_comment_time)}</span>
                            </div>
                            <div class="text">${commentAction.comment_body}</div>
                            <div class="actions">
                                <a class="upvote" onClick="likeComment(event)">
                                    <i class="icon thumbs up"/>
                                    <span class="num">0</span>
                                </a>
                                <a class="downvote" onClick="dislikeComment(event)">
                                    <i class="icon thumbs down"/>
                                    <span class="num">0</span>
                                </a>
                                <a class="reply" onClick="openCommentReply(event)">
                                    Reply
                                </a>
                                <a class="flag" onClick="flagComment(event)">
                                    Flag
                                </a>
                                <a class="share" onClick="shareComment(event)">
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>`;
                comments.append(mess);
            } else { // if comment is to the video
                const mess =
                    `<div class="comment" id=${commentAction.commentID}>
                        <div class="image user_img">
                            <a class="avatar"> 
                                <img src=${photo}> 
                            </a>
                        </div>
                        <div class="content">
                            <a class="author">${username+" (me)"}</a>
                            <div class="metadata">
                                <span class="date">${humanized_time_span(commentAction.new_comment_time)}</span>
                            </div>
                            <div class="text">${commentAction.comment_body}</div>
                            <div class="actions">
                                <a class="upvote" onClick="likeComment(event)">
                                    <i class="icon thumbs up"/>
                                    <span class="num">0</span>
                                </a>
                                <a class="downvote" onClick="dislikeComment(event)">
                                    <i class="icon thumbs down"/>
                                    <span class="num">0</span>
                                </a>
                                <a class="reply" onClick="openCommentReply(event)">
                                    Reply
                                </a>
                                <a class="flag" onClick="flagComment(event)">
                                    Flag
                                </a>
                                <a class="share" onClick="shareComment(event)">
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>`;
                $(".ui.comments").prepend(mess);
            }
        }

        let commentID = commentAction.commentID;
        if (commentID <= 5) {
            commentID = "actor" + commentAction.commentID;
        }

        // Add comment actions
        if (commentAction["liked"]["action"]) {
            const target = $(`#${commentID}`).find('i.icon.thumbs.up');
            target.addClass("green");
            target.siblings("span.num").html(function(i, val) { return val * 1 + 1 });
        }
        if (commentAction["disliked"]["action"]) {
            const target = $(`#${commentID}`).find('i.icon.thumbs.down');
            target.addClass("red");
            target.siblings("span.num").html(function(i, val) { return val * 1 + 1 });
        }
        if (commentAction["flagged"]["action"]) {
            $(`#${commentID}`).find('.text').first().replaceWith(
                `<div class = 'text'>
                    <h5 class='ui inverted header' style='background-color:black;color:white; margin-top: 10px'>
                        <span>
                        The admins will review this comment further. We are sorry you had this experience.
                        </span>
                    </h5>
                </div>
                `);
        }

    }
}

$(window).on("load", async function() {
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            actorData = actorData[0];
            offenseMessageData = offenseMessageData[0];
            objectionMessageData = objectionMessageData[0];

            const offense = ["misinformation", "harassment", "hate_speech"][off_id];
            const actors = actorData[offense];
            for (const actor of actors) {
                const element_id = actor["id"];

                // ----- Future actor -----
                if (element_id === "#actor5") {
                    // Check Page Log to see if the user has already been on the page. If so, load actor directly. 
                    const search = window.location.search;
                    if (user["pageLog"].find(log => log.search === search)) {
                        const t = humanized_time_span(new Date(Date.parse(user["pageLog"].find(log => log.search === search)["time"])));
                        const mess =
                            `<div class="comment" id="actor5">
                                <div class="image" style="background-color:${actor["color"]}">
                                    <a class="avatar"> 
                                        <img src=${cdn + actor["src"]}> 
                                    </a>
                                </div>
                                <div class="content">
                                    <a class="author">${actor["name"]}</a>
                                <div class="metadata">
                                    <span class="date">${t}</span>
                                </div>
                                <div class="text">${actor["message"]}</div>
                                <div class="actions">
                                    <a class="upvote" onClick="likeComment(event)">
                                        <i class="icon thumbs up"/>
                                        <span class="num">${actor["likes"]}</span>
                                    </a>
                                    <a class="downvote" onClick="dislikeComment(event)">
                                        <i class="icon thumbs down"/>
                                        <span class="num">${actor["dislikes"]}</span>
                                    </a>
                                    <a class="reply" onClick="openCommentReply(event)">
                                        Reply
                                    </a>
                                    <a class="flag" onClick="flagComment(event)">
                                        Flag
                                    </a>
                                    <a class="share" onClick="shareComment(event)">
                                        Share
                                    </a>
                                </div>
                            </div>
                        </div>`;
                        $(".ui.comments").prepend(mess);
                    } else {
                        $("#actor5 img.popupNotificationImage").attr("src", cdn + actor["src"]);
                        $("#actor5 .label").css("background-color", actor["color"]);
                        $("#actor5 span.author").html(actor["name"] + " ");
                        $("#actor5 span.text").html(actor["message"]);

                        setTimeout(function() {
                            const mess =
                                `<div class="comment incomingComment hidden" id="actor5">
                                    <div class="image" style="background-color:${actor["color"]}">
                                        <a class="avatar"> 
                                            <img src=${cdn + actor["src"]}> 
                                        </a>
                                    </div>
                                    <div class="content">
                                        <a class="author">${actor["name"]}</a>
                                    <div class="metadata">
                                        <span class="date">${actor["time"]}</span>
                                    </div>
                                    <div class="text">${actor["message"]}</div>
                                    <div class="actions">
                                        <a class="upvote" onClick="likeComment(event)">
                                            <i class="icon thumbs up"/>
                                            <span class="num">${actor["likes"]}</span>
                                        </a>
                                        <a class="downvote" onClick="dislikeComment(event)">
                                            <i class="icon thumbs down"/>
                                            <span class="num">${actor["dislikes"]}</span>
                                        </a>
                                        <a class="reply" onClick="openCommentReply(event)">
                                            Reply
                                        </a>
                                        <a class="flag" onClick="flagComment(event)">
                                            Flag
                                        </a>
                                        <a class="share" onClick="shareComment(event)">
                                            Share
                                        </a>
                                    </div>
                                </div>
                            </div>`;

                            $(".ui.comments").prepend(mess);
                            $(".incomingComment").transition('slide down').transition('glow');

                            // if in a mobile view, put popup in the middle
                            if (screen.width < 1035) {
                                $("#mobilePopup").show();
                                $("#mobilePopup").transition("pulse");
                            } else {
                                $("#desktopPopup").show();
                                $("#desktopPopup").transition("pulse");
                            }

                            setTimeout(function() {
                                if ($("#desktopPopup").is(':visible')) {
                                    $("#desktopPopup").transition("fade");
                                }
                                if ($("#mobilePopup").is(':visible')) {
                                    $("#mobilePopup").transition("fade");
                                }
                            }, 5000);
                        }, (20000));
                        continue;
                    }
                } else {
                    // ----- Existing actors -----
                    const comment_element = $(`.comment${element_id}`);
                    // Change Profile Picture
                    comment_element.find('.image a.avatar img').attr("src", cdn + actor["src"]);
                    comment_element.find('.image').css("background-color", actor["color"]);
                    // Change Name
                    comment_element.find('.content a.author').html(actor["name"]);
                    // Change Time
                    comment_element.find('.content .metadata span.date').html(actor["time"]);
                    // Change Likes/ Dislikes
                    comment_element.find('.content .actions a.upvote span.num').html(actor["likes"]);
                    comment_element.find('.content .actions a.downvote span.num').html(actor["dislikes"]);
                    // Add message
                    comment_element.find('.content .text').html(actor["message"]);
                }
            }
            $("#offense").html(offenseMessageData[offense]);
            if (obj_t_id === "none") {
                $("#actor3").parent().remove();
            } else {
                $("#objection").html(objectionMessageData[offense][obj_t_id][obj_m_id].replace(/\n/g, "<br />"));
            }
        });

    loaduser();

    // Close notification
    $('.message .close').on('click', function() {
        $(this)
            .closest('.message')
            .transition('fade');
    });

    // scroll to appropriate post when notification popup is clicked
    $('.notificationPopup').on('click', function(event) {
        if ($(event.target).hasClass('close')) {
            return false;
        }
        $(".incomingComment")[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    });

    // Update view count
    for (var i = 0; i < times.length * 20; i++) {
        (function(ind) {
            const mult = Math.floor(ind / length); // 0, 1, 2, 3, etc. 
            const num = ind % length; // 0, 1, 2, 3, etc.
            setTimeout(function() {
                // console.log(((200000 * mult) + parseInt(times[num])) / 1000);
                $(".viewCount").transition('slide up').text(" " + counts[num] + " ").css("color", "red").transition('slide up').transition('glow');
                setTimeout(function() {
                    $(".viewCount").css("color", "rgba(0,0,0,.68)")
                }, 1200);
            }, (200000 * mult) + parseInt(times[num]));
        })(i);
    }
});