$(document).ready(initializeApp);

const cardImages = ['cf1', 'cf2', 'cf3', 'cf4', 'cf5', 'cf6', 'cf7', 'cf8', 'cf9', 'cf1', 'cf2', 'cf3', 'cf4', 'cf5', 'cf6', 'cf7', 'cf8', 'cf9'];

let firstCardClicked = null;
let secondCardClicked = null;

let matches = null;
const maxMatches = 9;

let attempts = 0;
let gamesPlayed = 0;


function initializeApp() {
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

    const firstImg = firstCardClicked.find(".cardfront").css("background-image");
    const secondImg = secondCardClicked.find(".cardfront").css("background-image");

    if (firstImg === secondImg) {
      matches++;
      displayStats();
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        setTimeout(
          function () {
            resetStats();
            makeCards(cardImages);
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
  let accuracy = matches / attempts;
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
    const accuracyResult = calculateAccuracy();
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
  $(".card").empty();
}

const shuffle = imgArray => {
  let current = imgArray.length;
  let temp, random;
  while (0 !== current) {
    random = Math.floor(Math.random() * current);
    current -= 1;
    temp = imgArray[current];
    imgArray[current] = imgArray[random];
    imgArray[random] = temp;
  }
  return imgArray;
}

const makeCards = imageArray => {
  const imgArray = shuffle(imageArray);
  let cardFrontElements;
  let cardBackElements;
  let cardCount = 0;
  imgArray.forEach(cardPhoto => {
    cardFrontElements = $("<div>").addClass("cardfront " + cardPhoto);
    $("#card" + [cardCount]).append(cardFrontElements);
    cardBackElements = $("<div>").addClass("cardback");
    $("#card" + [cardCount]).append(cardBackElements);
    cardCount++
  })
}
