function arrayToAlphabetDictionary(data) {
    return data.reduce((obj, item) => {
        var key = item[0].toUpperCase(); // take first character, uppercase
        obj[key] = obj[key] || []; // create array if not exists
        obj[key].push(item); // push item
        return obj
    }, {});
}

// Function copied directly from the MDN web docs:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

$(window).on("load", async function() {
    let timeout;
    let adjectiveArray = {};
    let nounArray = {};
    await $.getJSON('/public/jsons/adjectives.json', function(data) {
        adjectiveArray = arrayToAlphabetDictionary(data);
    });
    await $.getJSON('/public/jsons/nouns.json', function(data) {
        nounArray = arrayToAlphabetDictionary(data);
    });

    $('.ui.dropdown').dropdown({
        onChange: function(value, text, $selectedItem) {
            // clear any usernames waiting to be loaded
            clearTimeout(timeout);
            $("h2.username").empty();
            $('button.ui.button').removeClass("green");

            const firstInitial = $('select[name="firstInitial"]').val();
            const lastInitial = $('select[name="lastInitial"]').val();

            if (firstInitial !== '' && lastInitial !== '') {
                // $(".ui.big.labeled.icon.button").addClass("green")[0];
                $('button.ui.button').addClass("loading");
                const randomNames = [];
                for (var i = 0; i < 3; i++) {
                    const adjectives = adjectiveArray[firstInitial];
                    const adjective = adjectives[getRandomInt(0, adjectives.length)];
                    const nouns = nounArray[lastInitial];
                    const noun = nouns[getRandomInt(0, nouns.length)];
                    const randomName = `${adjective} ${noun}`;
                    randomNames.push(randomName);
                }
                timeout = setTimeout(function() {
                    $('button.ui.button').removeClass("loading");
                    for (var i = 0; i < 3; i++) {
                        $(`h2.username_${i+1}`).text(randomNames[i]);
                    }
                }, 750);
            }
        }
    });

    // Click a username
    $('button.ui.button').on('click', function() {
        // only allow selection if there are values loaded into the buttons
        if ($(this).find("h2") && $(this).find("h2").text().trim() == '') {
            console.log($(this).find("h2").text());
            return;
        }
        $('button.ui.button').removeClass("green");
        $('button.ui.button h2 i.check.icon.green').remove();
        $(this).addClass("green");
        $(this).find("h2").prepend('<i class="check icon green hidden"></i>');
        $(this).find("h2").append('<i class="check icon green"></i>');
    })

    // Click a photo
    $('a.avatar').on('click', function() {
        // clear any photos selected 
        $("a.avatar i.icon.green.check").addClass("hidden");
        // $("a.avatar i.icon.green.check").remove();
        $('img').removeClass("green");

        $(this).find('img').addClass("green");
        $(this).find('i.icon').removeClass("hidden");
        // $(this).append('<i class="check icon green"></i>');
    })

    $(".ui.big.labeled.icon.button").on('click', function() {
        const firstName = $("span.firstName").text();
        const lastName = $("span.lastName").text();
        window.sessionStorage.setItem('Username', `${firstName} ${lastName}`);
        if ($(this).hasClass("green")) {
            window.location.href = '/test_misinformation';
        }
    });
});