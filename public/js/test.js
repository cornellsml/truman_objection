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
    68000: 7, // 6: 68 seconds
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

    for (var i = 0; i < times.length * 20; i++) {
        (function(ind) {
            const mult = Math.floor(ind / length); // 0, 1, 2, 3, etc. 
            const num = ind % length; // 0, 1, 2, 3, etc.
            setTimeout(function() {
                // console.log(((200000 * mult) + parseInt(times[num])) / 1000);
                $(".viewCount").transition('slide up').text(" " + counts[num] + " ").transition('slide up').transition('glow');
            }, (200000 * mult) + parseInt(times[num]));
        })(i);
    }

    setTimeout(function() {
        $(".incomingComment").transition('slide down').transition('glow');
    }, (25000));
});