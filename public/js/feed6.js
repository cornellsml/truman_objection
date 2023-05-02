const cdn = "https://dhpd030vnpk29.cloudfront.net/truman-objections";
const r_id = (new URL(document.location)).searchParams.get("r_id");

$(window).on("load", async function() {
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            const actors = actorData[0];
            for (const actor of actors) {
                if (actor["id"] == "actor4") {
                    const mess =
                        `<div class="ui fluid card"> 
                            <div class="content">
                                <div class="comment" id=${actor["id"]}>
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
                                </div>
                            </div>
                            <div class="content">
                                <i class="user icon small"></i>
                                Readers added context they thought people might want to know: This user has engaged in multiple instances of using abusive language to harass others.
                            </div>
                        </div>`;
                    $("#actor3").append('<div class="comments"></div>');
                    $("#actor3 .comments").append(mess);
                } else {
                    const mess =
                        `<div class="comment" id=${actor["id"]}>
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
                }
            }
        });
});