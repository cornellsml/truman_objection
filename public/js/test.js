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
    3000: 7,
    10000: 8,
    11000: 9,
    20000: 8,
    40000: 7,
    60000: 6,
    68000: 7,
    80000: 5,
    83000: 6,
    90000: 7,
    99000: 8,
    100000: 7,
    140000: 6,
    180000: 5,
    200000: 6,
}

const times = Object.keys(viewCount);
const counts = Object.values(viewCount);
const length = counts.length;

$(window).on("load", function() {
    $('a.showMoreLess').click(showMoreLess);

    for (var i = 0; i < times.length * 5; i++) {
        (function(ind) {
            const mult = (ind / length);
            const num = ind % length;
            console.log(mult);
            console.log(num);
            setTimeout(function() {
                console.log(counts[num]);
                $("span.viewCount").text(counts[num] + " ");
            }, (200000 * mult) + parseInt(times[num]));
        })(i);
    }
});