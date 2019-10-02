$(document).ready(initializeApp);


var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

function initializeApp() {
  $(".card").click(handleCardClick);
}


function handleCardClick(event) {
  console.log(event);
  $(event.currentTarget).find(".cardback").addClass("hidden");

  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);

    var firstImg = firstCardClicked.find(".cardfront").css("background-image");
    var secondImg = secondCardClicked.find(".cardfront").css("background-image");

    if (firstImg === secondImg) {
      console.log("cards match");
      matches = matches + 1;
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(
        function () {
          firstCardClicked.find(".cardback").removeClass("hidden");
          secondCardClicked.find(".cardback").removeClass("hidden");
          firstCardClicked = null;
          secondCardClicked = null;
        }, 1500);
    }
  }

}
