// ****** actions on main post *******
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


$(window).on("load", function() {
    $('a.showMoreLess').click(showMoreLess);
});