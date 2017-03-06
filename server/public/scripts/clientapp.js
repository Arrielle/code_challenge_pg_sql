$(document).ready(function () {

  // get treats on load
  getTreats();

  deleteTreat();

  updateTreat();

  /**---------- Event Handling ----------**/
  /** Save New Treat **/
  $('#saveNewButton').on('click', function(event) {
    event.preventDefault();

    var treateName = $('#treatNameInput').val();
    var treatDescription = $('#treatDescriptionInput').val();
    var treateURL = $('#treatUrlInput').val();

    var newTreat = {
      name: treateName,
      description: treatDescription,
      url: treateURL
    };

    postTreat(newTreat);
  });

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      console.log('GET /treats returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }
  // POST /treats
  function postTreat(treat) {
    $.ajax({
      method: 'POST',
      url: '/treats',
      data: treat,
    })
    .done(function () {
      console.log('POST /treats sent ', treat);
      clearDom();
      getTreats();
    });
  }
  //DELETE /treats
  function deleteTreat(){
    $('#treat-display').on('click', '.deleteButton', function(){
      console.log('delete button clicked');
      var treatIDDelete = $(this).parent().data().id;
      // .parent().parent().data().id;
      console.log(treatIDDelete);
      $.ajax({
        type: 'DELETE',
        url: '/treats/delete/' + treatIDDelete,
        success: function(response){
          console.log(response);
          clearDom();
          getTreats();
        }
      });//ends ajax
    });//ends onclick
  }//ends delete treat function
  //UPDATE /treats
  function updateTreat(){
    $('#treat-display').on('click', '.updateButton', function(){
    var treatIDSave = $(this).parent().data().id;
    //create objectToSave
    var descriptionOfTreat = $(this).parent().find('.treatDescription').val();
    var nameOfTreat = $(this).parent().find('.treatName').val();
    console.log(nameOfTreat);
    var objectToSave = {
      name: nameOfTreat,
      description: descriptionOfTreat
    }
    // call ajax request
    $.ajax({
      type: 'PUT', //it's the PG update PUT or PATCH
      url: '/treats/save/' + treatIDSave,
      data: objectToSave,// books/delete/48 (where 48 is bookIDDelete)
      success: function(response){
        console.log(response);
        clearDom();
        getTreats();
      }//ends success
    });//ends ajax
  });//ends onclick
  }//ends update function
  /** ---------- DOM Functions ----------**/

  function clearDom() {
    var $treats = $('#treat-display');
    $treats.empty();
  }

  function appendTreat(treat) {
    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var $treats = $('#treat-display');

    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row every 2 treats
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat" data-id ="' + treat.id + '">' +
    '<div class="image-wrap">' +
    '<img src="' + treat.pic + '" class="u-max-full-width" />' +
    '<div class="toggle row">' +
    '<div class="six columns">' +
    '<button class="edit u-full-width">Edit</button>' +
    '</div>' +
    '<div class="six columns">' +
    '<button class="delete u-full-width">Delete</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<h3><input value="' + treat.name + '" class="treatName"></h3>' +
    '<p><input type="textarea" value="' + treat.description + '" class="treatDescription"></p><br>' +
    '<button class ="updateButton">Update</button>' +
    '<button class = "deleteButton">Delete</button>' +
    '</div>');

    $treat.data('id', treat.id);

    $('.treat:last-of-type').append($treat);
  }
});
