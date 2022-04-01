function changeColor(e, string = "") {
    let target = $(e.target);
    if (target.val().trim() !== string) {
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
        $(".ui.comments")[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
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
        target[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
        let comment_level = target.parents(".comment").length;
        const comment_area = (
            `<div class="ui form">
                <div class="inline field">
                    <img class="ui image rounded" src="/profile_pictures/genericphoto1.png"/>
                    <textarea class="replyToComment" type="text" placeholder="Add a Reply..." rows="1" onInput="changeColor(event${comment_level==2 ? ", '@"+reply_to +"'": ""})">${(comment_level == 2) ? "@"+reply_to+" " : ""}</textarea>
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
        $(comment_area).insertAfter(target.children('.actions')).hide().show(400);
        const comment_area_element = $(target).find('textarea.replyToComment');
        const end = comment_area_element.val().length;
        comment_area_element[0].setSelectionRange(end, end);
        if (comment_level == 2) {
            comment_area_element.highlightWithinTextarea({
                highlight: [{
                        highlight: "@" + reply_to, // string, regexp, array, function, or custom object
                        className: 'blue'
                    },
                    {
                        highlight: "@" + reply_to.split(" ")[0], // string, regexp, array, function, or custom object
                        className: 'blue'
                    }
                ]
            })
        };
        comment_area_element.focus();
        comment_area_element[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}

function addCommentToComment(e) {
    let target = $(e.target);
    const form = target.parents(".ui.form");
    if (!form.children(".ui.submit.button").hasClass("blue")) {
        return;
    }
    let text = form.find("textarea.replyToComment").val();
    let orig_comment = form.closest(".comment");
    let comment_level = form.parents(".comment").length; // = 1 if 1st level, =2 if 2nd level
    if (comment_level == 1) {
        if (!orig_comment.children('.comments').length) {
            orig_comment.append('<div class="comments">');
        }
        comments = orig_comment.find(".comments");
    } else {
        comments = orig_comment.closest(".comments");
    }
    if (text.trim() !== "") {
        const words = form.find("mark").map(function() {
            return $(this).html();
        })
        const highlights = [...new Set(words)].sort(function(a, b) {
            return b.length - a.length; // Desc order
        });
        if (highlights.length !== 0) {
            for (word of highlights) {
                var regEx = new RegExp('(?<!<a>)' + word, 'gmi');
                text = text.replace(regEx, '<a>' + word + '</a>')
            }
        }
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

        form.find("textarea.newComment").val("");
        form.remove();
        comments.append(mess);
        $(comments).last()[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
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
            $('.ui.submit.button.replyToVideo').removeClass("blue");
            $('.ui.button.replyToVideo').hide(300);
        }
    })

    // reply to POST
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

    // Open comment reply box 
    $("a.reply").click(openCommentReply);

    // add a new Comment
    $(".ui.blue.labeled.submit.icon.button").click(addCommentToComment);

    // When textarea input changes
    $('textarea').on('input', changeColor);

    // Press enter to submit a comment
    window.addEventListener("keydown", function(event) {
        if (!event.ctrlKey && event.key === "Enter" && $(event.target).hasClass("replyToVideo")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            addCommentToVideo(event);
        } else if (!event.ctrlKey && event.key === "Enter" && $(event.target).hasClass("replyToComment")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            addCommentToComment(event);
        }
    }, true);
});