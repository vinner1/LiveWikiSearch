function ajaxcall(){
    
    $.ajax({ // you can also make ajax calls .getJSON
        url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' +
        $('#search').val(), // .val() returns the value in the field
        dataType: 'jsonp', // Typo here can be a bitch :( jsonp help request data from another domain using the script tag instead of XmlHttpRequest object like json 
        type: 'GET',
        success: function(data){

            $('#update').empty();
            var data = JSON.stringify(data);
            data = JSON.parse(data);

            var output = '';

            data.query.search.forEach(function(data){
                var title = '<h1>' + data.title + '</h1>' + '<br>';
                var snippet = '<p>' + data.snippet + '</p>';
                var url = '<a href = "https://en.wikipedia.org/wiki/' + data.title + '"target ="_blank">'; 
                endUrl = "</a>"
                output += url + title + endUrl + snippet + '<hr>';
            });
            $('#update').append(output);
            // console.log(data);
        }
    });

}

function randomFunction(){
    $('#update').empty();
    $('#search').empty();
    $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function(){
    $('#search').focus();
    $('#search').off('keyup');
    $('#search').on('keyup', function(){
        ajaxcall();
        $('iframe').attr('src', ''); //always make sure the iframe is empty while make an ajax call so you don't run into issues
    });
    $('.random').on('click', function(){
        randomFunction();
        $(this).text('Show another random article');
    });
});