$('.btn-search').click(function(){
    $('#modal-form').modal('toggle');
    $('#name').val('');
   $('#limit').val('');
});

$(document).ready(function() {
  $('.artist-info').hide();
  $("#form-artist").validate({
  rules: {
      name: "required",     
      limit: {
          required: true,
          max:6
      }
  },
  messages: {
      name: "Please enter artist name",
      limit: "Please enter no. of tracks",
  },
  submitHandler: function(form) {
    var term , limit;
      term = $('#name').val();
      limit = $('#limit').val();
      $.ajax({
          method: "POST",
          url: 'http://itunes.apple.com/search?term='+term+'&limit='+limit,   
          dataType: "json",
          crossdomain:true
        }).done(function( response ) {
          $('#modal-form').modal('toggle');
          $('.artist-info').html('');
          var result,html='' ;
          result = response.results;
          html += '<ul class="nav nav-tabs" role="tablist">';
          $.each(result, function( key, value ) {
            html += '<li class="nav-item">';
            html += '<a class="nav-link '+ (key == 0 ? 'active' : '') +'" href="#tab_artist'+value.trackId+'" role="tab" data-toggle="tab">'+value.artistName+'</a>';
            html += '</li>';
          });
          html += '</ul>';
          html += '<div class="tab-content">';
          $.each(result, function( key, value ) {
            html += '<div role="tabpanel" class="tab-pane  '+ (key == 0 ? 'active' : ' fade in') +'" id="tab_artist'+value.trackId+'">';
            // html += '<div class="row">';
            html += '<div class="desc text-left">';
            html += '<p><span class="sub-title">Artist name : </span>'+value.artistName +' </p>';
            html += '<p ><span class="sub-title">Track Name : </span>'+ value.trackName + '</p>';
            html += '<p ><span class="sub-title">ArtworkUrl :</span>'+ value.artworkUrl30 + '</p>';
            html += '</div>';
            html += '</div>';
          });
          html += '</div>';
          $('.artist-info').show();
          $('.artist-info').append(html);
        }).fail(function(error) {
          console.log( "error",error );
          
        });
  }
});
});