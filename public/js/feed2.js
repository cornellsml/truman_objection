const cdn = "https://dhpd030vnpk29.cloudfront.net/truman-objections";
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
        $(".ui.upvote.button i").addClass("green");
        $("a.ui.basic.green.left.pointing.label").html(function(i, val) { return val * 1 + 1 });
    }
    if (userConditionData.videoAction["disliked"]["action"]) {
        $(".ui.downvote.button i").addClass("red");
        $("a.ui.basic.red.left.pointing.label").html(function(i, val) { return val * 1 + 1 });
    }
    if (userConditionData.videoAction["flagged"]["action"]) {
        $(".ui.flag.button i").addClass("orange");
    }
}

$(window).on("load", async function() {
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            actorData = actorData[0];

            const offense = "misinformation";
            const actors = actorData[offense];
            for (const actor of actors) {
                setTimeout(function() {
                    const mess =
                        `<div class="comment incomingComment hidden" id=${actor["id"]}>
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

                    $(".ui.comments").append(mess);
                    $(`.incomingComment#${actor["id"]}`).transition('slide down').transition('glow');

                }, (actor["timeStamps"]));
            }
        });

    loaduser();
});