let stepsList = [{
        intro: 'Click "Next" to Begin the Tutorial!',
        element: '.demo',
        position: 'left'
    },
    {
        intro: 'You can watch videos posted by other people.',
        element: 'video',
        position: 'left'
    },
    {
        intro: `You can read the author's description of the video.`,
        element: '.content',
        position: 'left',
    },
    {
        intro: 'You can see how many people are viewing the video with you.',
        element: '.viewCount-string',
        // position: 'left',
    },
    {
        intro: `You can: <br>
            <ul>
                <li><b>Upvote the Video</b>: If you like the video</li>
                <li><b>Downvote the Video</b>: If you dislike the video</li>
                <li><b>Comment on the Video</b></li>
                <li><b>Flag the Video</b>: If you want to report the video</li>
                <li><b>Share the Video</b>: If you want to share the video</li>
            </ul> 
        `,
        element: '.video_buttons'
    },
    {
        intro: `<b>Note:</b> You will receive the video link to share<b> at the end of study</b> when you click share.
        This way you won't be redirected to another site in the middle of the study.`,
        element: '.ui.share.button.visible-button'
    },
    {
        intro: `You can comment on the video by entering a comment in the box below the video.`,
        element: '.ui.form'
    },
    {
        intro: `You can view comments left by other people.`,
        element: '.ui.comments'
    },
    {
        intro: `Replies to comments will appear indented.`,
        element: '.sampleReply'
    },
    {
        intro: `You can: <br>
        <ul>
            <li><b>Upvote</b> comments</li>
            <li><b>Downvote</b> comments</li>
            <li><b>Reply to</b> comments</li>
            <li><b>Flag</b> comments</li>
            <li><b>Share</b> comments</li>
        </ul> `,
        element: '.sampleComment'
    },
    {
        intro: `Please read.`,
        element: '#sampleUpvote',
    },
    {
        intro: `<b>Note:</b> Similar to videos, you will receive the comment link to share<b> at the end of study</b> when you click share.
        This way you won't be redirected to another site in the middle of the study. `,
        element: 'a.share'
    },
    {
        intro: `This is the end of the tutorial. </br></br>
        Click "Done &#10003" if you understand the features of the website!`,
        element: '.demo',
        position: 'right'
    }
]

$(window).on("load", function() {
    const visibleShare = $(".ui.share.button:visible")
    visibleShare.addClass('visible-button');

    var intro = introJs().setOptions({
        steps: stepsList,
        'doneLabel': 'Done &#10003',
        'nextToDone': true,
        'exitOnOverlayClick': false,
        'exitOnEsc': false,
        'showStepNumbers': true,
        'overlayOpacity': 0,
        'hidePrev': true,
        'showBullets': false,
        'scrollToElement': false
            // 'scrollPadding': 100
    });
    intro.onbeforechange(function() {
        if (this._currentStep > 0) {
            intro.setOption('scrollToElement', true);
        }
        // Scrolling is a little weird for first and last step, so manually scroll to the top of the demo box
        if (this._currentStep == 0 || this._currentStep == 12) {
            intro.setOption('scrollToElement', false);
            $(".demo-text")[0].scrollIntoView({
                behavior: "smooth",
                block: "center", // defines vertical alignment
                inline: "nearest" // defines horizontal alignment
            });
        }
    });
    intro.onexit(function() {
        $(".ui.big.button").addClass("green")[0].scrollIntoView({ behavior: "smooth" });
    });
    intro.start(); //start the intro

    $(".ui.big.labeled.icon.button").on('click', function() {
        // let userID = window.location.pathname.split('/')[1];
        // const userID = (new URL(document.location)).searchParams.get("r_id"); // value is null or Response ID from Qualtrics Survey
        const queryParams = window.location.search;
        if ($(this).hasClass("green")) {
            window.location.href = '/guest' + queryParams;
        } else {
            $(".introjs-tooltip")[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
});