$(document).ready(initializeApp);


function initializeApp() {
  $(".card").click(handleCardClick);
}

function handleCardClick(event) {
  console.log(event);
  $(event.currentTarget).find(".cardfront").addClass("hidden");
}
