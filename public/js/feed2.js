const cdn = "https://dhpd030vnpk29.cloudfront.net/truman-objections";
const r_id = searchParams.get("r_id");

$(window).on("load", async function() {
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            const actors = actorData[0];
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
                    if (actor["id"] == "actor4") {
                        $("#actor3").append('<div class = "comments"></div>');
                        $("#actor3 .comments").append(mess);
                    } else {
                        $(".ui.comments").append(mess);
                    }
                    $(`.incomingComment#${actor["id"]}`).transition('slide down').transition('glow');
                }, (actor["timeStamps"]));
            }
        });
});