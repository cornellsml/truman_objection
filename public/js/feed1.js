const cdn = "https://dhpd030vnpk29.cloudfront.net/truman-objections";
const r_id = (new URL(document.location)).searchParams.get("r_id");

$(window).on("load", async function() {
    const timeCommentDictionary = {}; // key = timestamp, value = comment to append
    const timeCommentIdDictionary = {};
    let timeStamps = [];
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            const actors = actorData[0];
            for (const actor of actors) {
                const mess =
                    `<div class="comment hidden" id=${actor["id"]}>
                            <div class="image" style="background-color:${actor["color"]}">
                                <a class="avatar"> 
                                    <img src=${cdn + actor["src"]}> 
                                </a>
                            </div>
                            <div class="content">
                                <a class="author">${actor["name"]}</a>
                            <div class="metadata" style="float:right;>
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
                timeCommentDictionary[actor["timeStamps"]] = mess;
                timeCommentIdDictionary[actor["timeStamps"]] = actor["id"];
                timeStamps.push(actor["timeStamps"]);
            }
        });

    timeStamps.sort((a, b) => a - b);

    $('video').on("timeupdate", function() {
        if (this.currentTime * 1000 > timeStamps[0]) {
            const mess = timeCommentDictionary[timeStamps[0]];
            const commentID = timeCommentIdDictionary[timeStamps[0]]
            timeStamps.shift();

            if (commentID == "actor4") {
                $("#actor3").append('<div class = "comments"></div>');
                $("#actor3 .comments").prepend(mess);
            } else {
                $(".ui.comments").prepend(mess);
            }
            $(`#${commentID}`).addClass("glowBorder", 1000).transition('fade up');
            setTimeout(function() {
                $(`#${commentID}`).removeClass("glowBorder", 1000);
            }, 2500);
            // $(`.incomingComment#${commentID}`).transition('slide down').transition('glow');
        }
    });

    // $('.ui.fluid.card.videopost').visibility({
    //     once: false,
    //     continuous: false,
    //     observeChanges: true,
    //     //throttle:100,
    //     initialCheck: true,
    //     offset: 75,

    //     onTopPassed: function(element) {
    //         const id = parseInt($(this).attr('id')) + 1;
    //         if (id == 1) {
    //             $(`.ui.fluid.card.videopost#${id} .replyToVideo`)[0].scrollIntoView({ behavior: 'smooth' });
    //         }

    //     }
    // })
});