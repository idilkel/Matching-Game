let arr = [
  "/assets/binary.jpg",
  "/assets/headphones.jpg",
  "/assets/html.jpg",
  "/assets/laptop.jpg",
  "/assets/phone.png",
  "/assets/screen.png",
];

let images = arr.concat(arr);

const shuffleArray = (arr) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

shuffleArray(images);

console.log(images);

let startTime;

const placeCards = () => {
  let cells = document.getElementsByTagName("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = `     
    <div class="card" id="card${i}">
      <div class="card-back visible" >
        <img src="/assets/marble-background.jpg" alt="flipped card" style="width:150px;height:120px;">
      </div>
      <div class="card-front hidden">
      <img src=${images[i]} alt="card" style="width:150px;height:120px;">
      </div>
  </div>`;
  }
  startTime = new Date().getTime();
};

placeCards();

let counter = 0;
let card1 = "";
let card2 = "";
let cardId1 = 0;
let cardId2 = 0;
let totalNumberOfCards = 12;
let totalMoves = 0;

const turn = () => {
  let cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = function () {
      if (counter < 2) {
        console.log(" was clicked");
        let backElement = cards[i].getElementsByClassName("card-back")[0];
        backElement.className = "card-back hidden";
        let frontElement = cards[i].getElementsByClassName("card-front")[0];
        frontElement.className = "card-back visible";
        if (counter === 0) {
          card1 = frontElement.getElementsByTagName("img")[0].src;
          console.log(card1);
          cardId1 = this.id;
          console.log(cardId1);
        } else {
          card2 = frontElement.getElementsByTagName("img")[0].src;
          console.log(card2);
          cardId2 = this.id;
          console.log(cardId2);
        }
        counter++;
        console.log(counter);
      }
      if (counter === 2) {
        let cardEl1 = document.getElementById(`${cardId1}`);
        let cardEl2 = document.getElementById(`${cardId2}`);
        console.log(cardEl1);
        console.log(cardEl2);
        if (card1 === card2) {
          setTimeout(() => {
            cardEl1.getElementsByTagName("div")[1].className =
              "card-front hidden";
            cardEl2.getElementsByTagName("div")[1].className =
              "card-front hidden";
            totalNumberOfCards -= 2;
            console.log("total number of cards: " + totalNumberOfCards);
            finish();
          }, 1000);
        } else {
          setTimeout(() => {
            cardEl1.getElementsByTagName("div")[1].className =
              "card-front hidden";
            cardEl2.getElementsByTagName("div")[1].className =
              "card-front hidden";
            cardEl1.getElementsByTagName("div")[0].className =
              "card-back visible";
            cardEl2.getElementsByTagName("div")[0].className =
              "card-back visible";
          }, 1000);
        }
        counter = 0;
        card1 = "";
        card2 = "";
        cardId1 = 0;
        cardId2 = 0;
        totalMoves++;
      }
    };
  }
};

turn();

const finish = () => {
  if (totalNumberOfCards === 0) {
    let msec = new Date().getTime() - startTime;
    console.log("Time: " + time);
    console.log("FINISHED");
    document.getElementById("time").innerHTML += getTimeFromMsec(msec);
    document.getElementById("total").innerHTML += " " + totalMoves;
    document.getElementsByClassName("finish hidden")[0].className =
      "finish visible";
  }
};

const reset = () => {
  document.getElementsByClassName("finish")[0].className = "finish hidden";
  document.getElementById("time").innerHTML = "You did it in";
  document.getElementById("total").innerHTML = "Total number of moves:";
  shuffleArray(images);
  placeCards();
  counter = 0;
  card1 = "";
  card2 = "";
  cardId1 = 0;
  cardId2 = 0;
  totalNumberOfCards = 12;
  totalMoves = 0;
  turn();
  startTime = new Date().getTime();
};

const getTimeFromMsec = (msec) => {
  let seconds = Math.floor(msec / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (hours > 0) {
    return ` ${hours} hours ${minutes} minutes and ${seconds} seconds.`;
  } else if (minutes > 0) {
    if (minutes == 1) {
      return ` ${minutes} minute and ${seconds} seconds`;
    } else {
      return ` ${minutes} minutes and ${seconds} seconds`;
    }
  } else {
    return ` ${seconds} seconds`;
  }
};
