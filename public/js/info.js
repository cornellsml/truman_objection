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
        element: '.ui.bottom.attached.buttons'
    },
    {
        intro: `<b>Note:</b> You will receive the video link to share<b> at the end of study</b> when you click share.
        This way you won't be redirected to another site in the middle of the study.`,
        element: '.ui.share.button'
    },
    {
        intro: `You can comment on the video by entering a comment in the box below the video.`,
        element: '.ui.form'
    },
    {
        intro: `You can view comments left by other people.`,
        element: '.ui.comments'
    }, {
        intro: `Replies to comments will appear indented.`,
        element: '.sampleReply'
    },
    {
        intro: `You can: <br>
        <ul>
            <li><b>Upvote comments</b>: If you like someone's comment</li>
            <li><b>Downvote comments</b>: If you dislike someone's  comment</li>
            <li><b>Reply to comments</b></li>
            <li><b>Flag comments</b>: If you want to report someone's comment</li>
            <li><b>Share comments</b>: If you want to share someone's comment</li>
        </ul> `,
        element: '.sampleComment'
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
        if (this._currentStep == 0 || this._currentStep == 11) {
            intro.setOption('scrollToElement', false);
            $(".demo-text")[0].scrollIntoView({
                behavior: "smooth",
                block: "center", // defines vertical alignment
                inline: "nearest" // defines horizontal alignment
            });
        }
    });
    intro.onexit(function() {
        $(".ui.big.labeled.icon.button").addClass("green")[0].scrollIntoView({ behavior: "smooth" });
    });
    intro.start(); //start the intro
    $(".ui.big.labeled.icon.button").on('click', function() {
        if ($(this).hasClass("green")) {
            window.location.href = '/test_misinformation';
        }
    });
});