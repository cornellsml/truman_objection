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

let searchParams = (new URL(document.location)).searchParams;

const off_id = searchParams.get("off_id") || 0; // 0=misinformation, 1=harassment, 2=hate_speech
const obj_t_id = searchParams.get("obj_t_id") || 0; // none=no objection, 0=Dismissal-Objectionable Comment, 1=Imploring-Conscientious Appeal, 2=Imploring-Logical Appeal, 3=Threatening-Reputational Attack, 4=Threatening-Violent Warning, 5=Preserving-Personal Abstinence, 6=Preserving-Group Maintenance
const obj_m_id = parseInt(searchParams.get("obj_m_id")) || 0; // 0=1st message, 1=2nd message

$(window).on("load", async function() {
    await $.when(
            $.getJSON('/public/jsons/actor_profiles.json'),
            $.getJSON('/public/jsons/offense_messages.json'),
            $.getJSON('/public/jsons/objection_messages.json'))
        .done(function(actorData, offenseMessageData, objectionMessageData) {
            actorData = actorData[0];
            offenseMessageData = offenseMessageData[0];
            objectionMessageData = objectionMessageData[0];

            const offense = ["misinformation", "harassment", "hate_speech"][off_id];
            $("#offense").html(offenseMessageData[offense]);
            if (obj_t_id === "none") {
                $("#actor3").parent().remove();
            } else {
                $("#objection").html(objectionMessageData[offense][obj_t_id][obj_m_id].replace(/\n/g, "<br />"));
            }
        });

    $('a.showMoreLess').click(showMoreLess);
});