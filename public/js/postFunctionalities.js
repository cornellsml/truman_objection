function changeColor(e) {
    let target = $(e.target);
    if (target.val().trim() !== "") {
        target.parents(".ui.form").children('.ui.submit.button').addClass("blue");
    } else {
        target.parents(".ui.form").children('.ui.submit.button').removeClass("blue");
    }
}

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
    let target = $(e.target).closest('.ui.downvote.button');
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

function addCommentToVideo(e) {
    let target = $(e.target);
    const form = target.parents(".ui.form");
    const text = form.find("textarea.replyToVideo").val();
    if (text.trim() !== "") {
        const mess =
            `<div class="comment">
                <a class="avatar"> 
                    <img src="/profile_pictures/genericphoto1.png"> 
                </a>
                <div class="content">
                    <a class="author">Guest</a>
                    <div class="metadata">
                        <span class="date">Just now</span>
                    </div>
                    <div class="text">${text}</div>
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

        $("textarea.replyToVideo").val("");
        $('.ui.button.replyToVideo').hide();
        $("textarea.replyToVideo").blur();
        $(".ui.comments").prepend(mess);
        $(".ui.comments")[0].scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth' });
    } else {
        $("textarea.replyToVideo").focus();
    }
}

function flagPost(e) {
    let target = $(e.target).closest('.ui.flag.button');
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

function shareComment(e) {}

function openCommentReply(e) {
    let target = $(e.target).parents('.content');
    const reply_to = target.children('a.author').text();
    const form = target.children('.ui.form');
    if (form.length !== 0) {
        form.hide(function() { $(this).remove(); });
        target[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    } else {
        const form = (
            `<div class="ui form">
                <div class="inline field">
                    <img class="ui image rounded" src="/profile_pictures/genericphoto1.png"/>
                    <textarea class="replyToComment" type="text" placeholder="Add a Reply..." rows="1" onInput="changeColor(event)"></textarea>
                </div>
                <div class="ui submit button replyToComment" onClick="addCommentToComment(event)">
                    Reply to ${reply_to}
                </div>
                <div class="ui cancel basic blue button replyToComment" onClick="openCommentReply(event)">
                    Cancel
                </div>
            </div>
            </form>`
        );
        $(form).insertAfter(target.children('.actions')).hide().show(400)[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
        $(target).find('textarea.replyToComment').focus();
    }
}

function addCommentToComment(e) {
    let target = $(e.target);
    const form = target.parents(".ui.form");
    const text = form.find("textarea.replyToComment").val();
    let orig_comment = form.closest(".comment");
    // no comments area - add it; i.e. second level of comments; else it is third level
    if (!orig_comment.children('.comments').length) {
        orig_comment.append('<div class="comments">');
    }
    comments = orig_comment.find(".comments");
    if (text.trim() !== "") {
        const mess =
            `<div class="comment">
                <a class="avatar"> 
                    <img src="/profile_pictures/genericphoto1.png"> 
                </a>
                <div class="content">
                    <a class="author">Guest</a>
                    <div class="metadata">
                        <span class="date">Just now</span>
                    </div>
                    <div class="text">${text}</div>
                    
                </div>
            </div>`;

        form.find("textarea.newComment").val("");
        form.remove();
        comments.append(mess);
    }
}

$(window).on("load", function() {
    // like POST
    $('.upvote.button').click(likePost);

    // dislike POST
    $('.downvote.button').click(dislikePost);

    // Focuses cursor to new comment input field, if the "Reply" button is clicked
    $(".reply.button").click(function() {
        $("textarea.replyToVideo").focus();
    });

    // Open "Cancel" and "Comment" Buttons (to main video)
    $('textarea[name="replyToVideo"]').focusin(function() {
        if ($('.ui.button.replyToVideo').is(":hidden")) {
            $('.ui.button.replyToVideo').show(300);
        }
    });

    // Hide "Cancel" and "Comment" Buttons (to main video)
    $('.ui.cancel.button.replyToVideo').click(function() {
        if ($('.ui.button.replyToVideo').is(":visible")) {
            $('textarea.replyToVideo').val("");
            $('.ui.button.replyToVideo').hide(300);
        }
    })

    // reply to Video
    $('.ui.submit.button.replyToVideo').click(addCommentToVideo);

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

    // create a new Comment
    $(".ui.blue.labeled.submit.icon.button").click(addCommentToComment);

    // $("input.newcomment").keyup(function(event) {
    //     //i.big.send.link.icon
    //     //$(this).siblings( "i.big.send.link.icon")
    //     if (event.keyCode === 13) {
    //         $(this).siblings("i.big.send.link.icon").click();
    //     }
    // });

    $('textarea').on('input', changeColor);

    // Press enter to submit a comment
    window.addEventListener("keydown", function(event) {
        if (!event.ctrlKey && event.key === "Enter" && event.target.className == "replyToVideo") {
            event.preventDefault();
            event.stopImmediatePropagation();
            addCommentToVideo(event);
        } else if (!event.ctrlKey && event.key === "Enter" && event.target.className == "replyToComment") {
            event.preventDefault();
            event.stopImmediatePropagation();
            addCommentToComment(event);
        }
    }, true);
});