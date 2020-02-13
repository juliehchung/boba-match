$(document).ready(initializeApp);

let cardImages = ['cf1', 'cf2', 'cf3', 'cf4', 'cf5', 'cf6', 'cf7', 'cf8', 'cf9', 'cf1', 'cf2', 'cf3', 'cf4', 'cf5', 'cf6', 'cf7', 'cf8', 'cf9'];

let firstCardClicked = null;
let secondCardClicked = null;

let matches = null;
let maxMatches = 9;

let attempts = 0;
let gamesPlayed = 0;


function initializeApp() {
  shuffle(cardImages);
  makeCards(cardImages);
  $(".card").click(handleCardClick);
  displayStats();
  $(".restartButton").click(toggleModal);
}

const handleCardClick = event => {
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
            shuffle(cardImages);
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

const toggleModal = () => {
  $("#winModal").toggleClass("showModal");
}

const toggleDisableClick = element => {
  element.toggleClass("clicked");
}

const calculateAccuracy = () => {
  var accuracy = matches / attempts;
  accuracy = Math.floor(accuracy * 100);
  return accuracy;
}

const displayStats = () => {
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

const resetStats = () => {
  matches = null;
  attempts = 0;
  gamesPlayed++;
  displayStats();
  $(".cardback").removeClass("hidden");
  toggleDisableClick($(".card"));
}

const makeCards = imgArray => {
  let pictureElements;
  let backElement;
  let counter = 0;
  imgArray.forEach(cardPhoto => {
    pictureElements = $("<div>").addClass("cardfront " + cardPhoto);
    $("#card" + [counter]).append(pictureElements);
    backElement = $("<div>").addClass("cardback");
    $("#card" + [counter]).append(backElement);
    counter++
  })
}

const shuffle = imgArray => {
  let current = imgArray.length;
  let temporaryValue, random;
  while (0 !== current) {
    random = Math.floor(Math.random() * current);
    current -= 1;
    temporaryValue = imgArray[current];
    imgArray[current] = imgArray[random];
    imgArray[random] = temporaryValue;
  }
  return imgArray;
}
