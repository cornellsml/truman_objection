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
    let adjectiveArray = {};
    let nounArray = {};
    await $.getJSON('/public/jsons/adjectives.json', function(data) {
        adjectiveArray = arrayToAlphabetDictionary(data);
    });
    await $.getJSON('/public/jsons/nouns.json', function(data) {
        nounArray = arrayToAlphabetDictionary(data);
    });

    $('.ui.dropdown[name="firstInitial"]').dropdown({
        onChange: function(value, text, $selectedItem) {
            // custom action
            const firstInitial = $('select[name="firstInitial"]').val();
            const lastInitial = $('select[name="lastInitial"]').val();
            if (firstInitial !== '' && lastInitial !== '') {
                $(".ui.big.labeled.icon.button").addClass("green")[0];
            }
            if (firstInitial !== '') {
                let adjectives = adjectiveArray[firstInitial];
                let adjective = adjectives[getRandomInt(0, adjectives.length)];
                $("span.firstName").text(adjective);
            }
        }
    });

    $('.ui.dropdown[name="lastInitial"]').dropdown({
        onChange: function(value, text, $selectedItem) {
            // custom action
            const firstInitial = $('select[name="firstInitial"]').val();
            const lastInitial = $('select[name="lastInitial"]').val();
            if (firstInitial !== '' && lastInitial !== '') {
                $(".ui.big.labeled.icon.button").addClass("green")[0];
            }
            if (lastInitial !== '') {
                let nouns = nounArray[lastInitial];
                let noun = nouns[getRandomInt(0, nouns.length)];
                $("span.lastName").text(noun);
            }
        }
    });

    $(".ui.big.labeled.icon.button").on('click', function() {
        const firstName = $("span.firstName").text();
        const lastName = $("span.lastName").text();
        window.sessionStorage.setItem('Username', `${firstName} ${lastName}`);
        if ($(this).hasClass("green")) {
            window.location.href = '/test_misinformation';
        }
    });
});