$(function() {
    //validation
    $('.submit-btn').click(function(){
        var title = $('#title').trim().val();
        var artist = $('#artist').trim().val();
        var year = $('#year').trim().val();
        var genre = $('#genre').trim().val();  
        var currentYear = new Date().getFullYear();
        
        var spans = $('span');
        for(var i = 0; i < spans.length; i++){
            spans[i].remove(spans[i]);
        }
        //None of the fields may be blank
        //title
        if(title.length == 0){
            $('.title-container').append('<div class="errors">Invalid title</div>');
            return false;
        }//The song title must have a maximum of 40 characters
        else if (title.length > 40){
            $('.title-container').append('<div class="errors">Invalid title</div>');
            return false;
        }//artist
        else if(artist.length == 0){
            $('.artist-container').append('<div class="errors">Invalid artist</div>');
            return false;
        }//The song artist must have a maximum of 60 characters
        else if (artist.length < 60){
            $('.artist-container').append('<div class="errors">Invalid artist</div>');
            return false;
        }//year
        else if(year.length == 0){
             $('.year-container').append('<div class="errors">Invalid year</div>');
            return false;
        }//The year should be a positive whole integer, and must be between 1900 and current year, inclusive
        else if (year < 1920) || (year > currentYear){
            $('.year-container').append('<div class="errors">Invalid year</div>');
            return false;
        }
        //genre
        else if(genre.length == 0){
           $('.genre-container').append('<div class="errors">Invalid genre</div>');
            return false;
        }//The genre must have a maximum length of 30 characters
        else if(genre.length < 30){
            $('.genre-container').append('<div class="errors">Invalid genre</div>');
            return false;
        }
        return true;
    });
    
    var $addMusic = $("#new_music"),
        $musicList = $("#music_list").find(".tbody"),
        $deleteMusic = $(".music_delete"),
        $status = $(".status"),
        $noMusic = $(".no_music")
        addAPIPath = $addMusic.attr("action");
        
    var template = "<.tr>";
        template += "<label>{{title}}</label>";
        template += "<label>{{artist}}</label>";
        template += "<label>{{year}}</label>";
        template += "<label>{{genre}}</label>";
        template += "<a class='music_delete' data-method='delete' href='/musics/{{id}}'>x</a>";
    
    var  manageStatus = function (message, doShow) {
        $status.text(message);
        doShow ? $status.fadeIn(10, "linear") : $status.fadeOut(4000, "linear");
    };
    
    var addSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var song = {
            title: $("#music_title").val(),
            artist: $("#music_artist").val(),
            year: $("#music_year").val(),
            genre: $("#music_genre").val()
        };
        
        manageStatus("Status: Sending request...", true);
        
        $.ajax({
            url: addAPIPath,
            type: 'post',
            dataType: 'json',
            data: song,
            success: function (response) {
                $musicList.append(template.replace("{{title}}", response.title)
                                          .replace("{{artist}}", response.artist)
                                          .replace("{{year}}", response.year)
                                          .replace("{{genre}}", response.genre)
                                          .replace("{{id}}", response.id));
                                          
                                          
                manageStatus("Status: OK", false);
            },
            error: function (error) {
                manageStatus("Status: Request Failed", false);
            }
        });
        
    };
    
    var deleteSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    };
    
    var init = function () {
        $addMusic.submit(addSong);
        $deleteMusic.click(deleteSong);
    };
    
    init();
    
});