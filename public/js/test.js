function showMoreLess(e) {
    const target = $(e.target);
    const description = target.siblings('p.description');
    if (description.hasClass("short")) {
        description.removeClass("short");
        target.html("SHOW LESS");
    } else {
        description.addClass("short");
        target.html("SHOW MORE");
    }
};

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

$(window).on("load", function() {
    $('a.showMoreLess').click(showMoreLess);
    $('.message .close')
        .on('click', function() {
            $(this)
                .closest('.message')
                .transition('fade');
        });

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

    setTimeout(function() {
        const mess =
            `<div class="comment incomingComment hidden">
                <a class="avatar"> 
                    <img src="/profile_pictures/animals-2/lion_mis.svg"> 
                </a>
                <div class="content">
                    <a class="author">Small Potato</a>
                <div class="metadata">
                    <span class="date">Just now</span>
                </div>
                <div class="text">That is interesting</div>
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
        $(".incomingComment").transition('slide down').transition('glow');

        //if in a mobile view, put popup in the middle
        $("#desktopPopup").show();
        $("#desktopPopup").transition("pulse");

        setTimeout(function() {
            if ($("#desktopPopup").is(':visible')) {
                $("#desktopPopup").transition("fade");
            }
        }, 5000);
    }, (20000));

    // scroll to appropriate post when notification popup is clicked
    $('.notificationPopup').on('click', function(event) {
        if ($(event.target).hasClass('close')) {
            return false;
        }

        $(".incomingComment")[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    });
});