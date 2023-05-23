$(document).ready(function() {

    $.ajax({
        url: '/library',
        type: 'GET',
        contentType: 'application/json',
        success: function(response) {
            let shows = response;
            let showsList = $('#random-shows');
            showsList.empty();
            for (var i = 0; i < shows.length; i++) {
                let show = shows[i];
                let showElement = $('<div class="show"></div>');
                let img = $('<img>').attr('src', show.img_url).attr('alt', show.title);
                showElement.append(img);

                let h2 = $('<h2></h2>').text(show.title);
                showElement.append(h2);

                showsList.append(showElement);

            }
        }
    })
})