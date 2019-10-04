$(document).ready(initializeApp);


var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

var maxMatches = 9;

var attempts = 0;
var gamesPlayed = 0;


function initializeApp() {
  $(".card").click(handleCardClick);
  displayStats();
  $(".restartButton").click(toggleModal);
}

function handleCardClick(event) {
  if (firstCardClicked !== null && secondCardClicked !== null) {
    return;
  }

  console.log(event);

  $(event.currentTarget).find(".cardback").addClass("hidden");

  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
    toggleDisableClick(firstCardClicked);
  } else {
    attempts++;
    secondCardClicked = $(event.currentTarget);
    toggleDisableClick(secondCardClicked);

    var firstImg = firstCardClicked.find(".cardfront").css("background-image");
    var secondImg = secondCardClicked.find(".cardfront").css("background-image");

    if (firstImg === secondImg) {
      console.log("cards match");
      matches++;
      displayStats();
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        resetStats();
        toggleDisableClick($(".card"));
        toggleModal();
      }
    } else {
      $(".card").removeClass("clicked");
      displayStats();
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

function toggleModal() {
  $(".modal").toggleClass("showModal");
}

function calculateAccuracy() {
  var accuracy = matches / attempts;
  accuracy = Math.floor(accuracy * 100); //decimal to percentage
  return accuracy;
}

function displayStats() {
  $(".gamesPlayed").text("Games Played:");
  $(".gamesNum").text(gamesPlayed);
  $(".attempts").text("Attempts:");
  $(".attemptsNum").text(attempts);
  $(".accuracy").text("Accuracy:");
  if (attempts >= 1) {
    var accuracyResult = calculateAccuracy();
    $(".accuracyNum").text(accuracyResult + "%");
  } else {
    $(".accuracyNum").text("We'll See!");
  }
}

function resetStats() {
  matches = null;
  attempts = 0;
  gamesPlayed++;
  displayStats();
  $(".cardback").removeClass("hidden");
}

function toggleDisableClick(element) {
  element.toggleClass("clicked");
}
