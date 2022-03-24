// ****** actions on main post *******
function likePost(e) {
    let target = $(e.target).closest('.ui.upvote.button');
    if (target.hasClass("green")) {
        target.removeClass("green");
        const label = target.siblings("a.ui.basic.green.left.pointing.label");
        label.html(function(i, val) { return val * 1 - 1 });
    } else {
        target.addClass("green");
        var label = target.siblings("a.ui.basic.green.left.pointing.label");
        label.html(function(i, val) { return val * 1 + 1 });

        let dislike = $('.ui.downvote.button');
        if (dislike.hasClass("red")) {
            dislike.removeClass("red");
            var label = dislike.siblings("a.ui.basic.red.left.pointing.label");
            label.html(function(i, val) { return val * 1 - 1 });
        }
    }
};

function dislikePost(e) {
    let target = $(e.target).closest('.ui.downvote.button');;
    if (target.hasClass("red")) {
        target.removeClass("red");
        const label = target.siblings("a.ui.basic.red.left.pointing.label");
        label.html(function(i, val) { return val * 1 - 1 });
    } else {
        target.addClass("red");
        var label = target.siblings("a.ui.basic.red.left.pointing.label");
        label.html(function(i, val) { return val * 1 + 1 });

        let like = $('.ui.upvote.button');
        if (like.hasClass("green")) {
            like.removeClass("green");
            var label = like.siblings("a.ui.basic.green.left.pointing.label");
            label.html(function(i, val) { return val * 1 - 1 });
        }
    }
};

function flagPost(e) {
    let target = $(e.target).closest('.ui.flag.button');;
    if (target.hasClass("orange")) {
        target.removeClass("orange");
    } else {
        target.addClass("orange");
    }
};

function sharePost() {
    $('.ui.small.basic.share.modal').modal('show');
};

// ****** actions on comment *******
function likeComment(e) {
    let target = $(e.target).closest('a.upvote').children('i.icon.thumbs.up');
    if (target.hasClass("green")) {
        target.removeClass("green");
        const label = target.siblings("span.num");
        label.html(function(i, val) { return val * 1 - 1 });
    } else {
        target.addClass("green");
        var label = target.siblings("span.num");
        label.html(function(i, val) { return val * 1 + 1 });

        let dislike = $(e.target).closest('a.upvote').siblings('a.downvote').children('i.icon.thumbs.down');
        if (dislike.hasClass("red")) {
            dislike.removeClass("red");
            var label = dislike.siblings("span.num");
            label.html(function(i, val) { return val * 1 - 1 });
        }
    }
};

function dislikeComment(e) {
    let target = $(e.target).closest('a.downvote').children('i.icon.thumbs.down');
    if (target.hasClass("red")) {
        target.removeClass("red");
        const label = target.siblings("span.num");
        label.html(function(i, val) { return val * 1 - 1 });
    } else {
        target.addClass("red");
        var label = target.siblings("span.num");
        label.html(function(i, val) { return val * 1 + 1 });

        let like = $(e.target).closest('a.downvote').siblings('a.upvote').children('i.icon.thumbs.up');
        if (like.hasClass("green")) {
            like.removeClass("green");
            var label = like.siblings("span.num");
            label.html(function(i, val) { return val * 1 - 1 });
        }
    }
};

function flagComment(e) {
    let target = $(e.target).closest('.comment').find('.text').first();
    console.log(target)
    target.replaceWith(
        `<div class = 'text'>
            <h5 class='ui inverted header' style='background-color:black;color:white; margin-top: 10px'>
                <span>
                The admins will review this comment further. We are sorry you had this experience.
                </span>
            </h5>
        </div>
        `);
}

function openCommentReply(e) {
    let target = $(e.target).parents('.actions'); // Find comment element user is trying to reply to
    const reply_to = target.siblings('a.author').text();
    if (target.siblings('form.ui.reply.form').length !== 0) {
        target.siblings('form.ui.reply.form').hide(function() { $(this).remove(); });
        target[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    } else {
        const comment_section = (
            `<form class="ui reply form">
                <div class="field">
                    <textarea>
                    </textarea>
                </div>
                <div class="ui blue labeled submit icon button">
                    <i class="icon edit"></i> Reply to ${reply_to}
                </div>
            </form>`
        );
        $(comment_section).insertAfter(target).hide().show(400)[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }
}

$(window).on("load", function() {

    // like POST
    $('.upvote.button').click(likePost);

    // dislike POST
    $('.downvote.button').click(dislikePost);

    // flag POST
    $('.flag.button').click(flagPost);

    // share POST
    $('.share.button').click(sharePost);

    // like COMMENT
    $("a.upvote").click(likeComment);

    // dislike COMMENT
    $("a.downvote").click(dislikeComment);

    // flag COMMENT
    $("a.flag").click(flagComment);

    // (Click) reply COMMENT 
    $("a.reply").click(openCommentReply);

    // $("input.newcomment").keyup(function(event) {
    //     //i.big.send.link.icon
    //     //$(this).siblings( "i.big.send.link.icon")
    //     if (event.keyCode === 13) {
    //         $(this).siblings("i.big.send.link.icon").click();
    //     }
    // });
});