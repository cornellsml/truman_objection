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
                if (actor["id"] == "actor4") {
                    setTimeout(function() {
                        $("#actor3").append('<div class="comments"></div>');
                        $("#actor3 .comments").append(mess);
                        $(`#${actor["id"]}`).addClass("glowBorder", 1000);

                        $('.container .overlay p.user').html(`
                        <div class="avatar" style="background-color:${actor["color"]}; width: 25px; height: 25px; border-radius: 50%;text-align:center; margin: 2px;float:left;"> 
                            <img src=${cdn + actor["src"]} style ="width: 15px; height: 15px;"> 
                        </div><span style="font-weight:bold; font-size: 18px;margin-top:3px;">${actor["name"]} just commented: </span>
                        `);
                        $('.container .overlay p.comment').html(`${actor["message"]}`);

                        $('.overlay').transition('fade up');
                        setTimeout(function() {
                            $(`#${actor["id"]}`).removeClass("glowBorder", 1000);
                            $('.overlay').transition('fade up');
                        }, 2500);
                    }, (actor["timeStamps"]));
                } else {
                    $(".ui.comments").append(mess);
                }
            }
        });
});