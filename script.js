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
      matches++;
      displayStats();
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        setTimeout(
          function () {
            resetStats();
            $(".cardfront").shuffle();
            toggleModal();
          }, 900);
      }
    } else {
      displayStats();
      setTimeout(
        function () {
          toggleDisableClick(firstCardClicked);
          toggleDisableClick(secondCardClicked);
          firstCardClicked.find(".cardback").removeClass("hidden");
          secondCardClicked.find(".cardback").removeClass("hidden");
          firstCardClicked = null;
          secondCardClicked = null;
        }, 1000);
    }
  }
}

function toggleModal() {
  $("#winModal").toggleClass("showModal");
}

function toggleDisableClick(element) {
  element.toggleClass("clicked");
}

function calculateAccuracy() {
  var accuracy = matches / attempts;
  accuracy = Math.floor(accuracy * 100);
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
  toggleDisableClick($(".card"));
}


//shuffle plug-in
(function ($) {
  $.fn.shuffle = function () {
    var allElems = this.get(),
      getRandom = function (max) {
        return Math.floor(Math.random() * max);
      },
      shuffled = $.map(allElems, function () {
        var random = getRandom(allElems.length),
          randEl = $(allElems[random]).clone(true)[0];
        allElems.splice(random, 1);
        return randEl;
      });
    this.each(function (i) {
      $(this).replaceWith($(shuffled[i]));
    });
    return $(shuffled);
  };
})(jQuery);
