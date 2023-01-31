let arrLength = 12;
let totalNumberOfCards = arrLength;

let arr12 = [
  "/assets/binary.jpg",
  "/assets/headphones.jpg",
  "/assets/html.jpg",
  "/assets/laptop.jpg",
  "/assets/phone.png",
  "/assets/screen.png",
];

let arr24 = [
  "/assets/binary.jpg",
  "/assets/headphones.jpg",
  "/assets/html.jpg",
  "/assets/laptop.jpg",
  "/assets/phone.png",
  "/assets/screen.png",
  "/assets/cat.jpg",
  "/assets/chick.jpg",
  "/assets/dog.jpg",
  "/assets/elephant.jpg",
  "/assets/parrot.jpg",
  "/assets/turtle.jpg",
];

let arr = arr12;

let images;
let startTime;

const selectValue = () => {
  reset();
  arrLength = +document.getElementById("select_id").value;
  // alert(typeof arrLength + " " + arrLength);
  totalNumberOfCards = arrLength;
  console.log("arrLength: " + arrLength);
  if (arrLength === 12) {
    arr = arr12;
    document.getElementById("table-12cards").className = "visible";
    document.getElementById("table-24cards").className = "hidden";
  } else {
    arr = arr24;
    document.getElementById("table-12cards").className = "hidden";
    document.getElementById("table-24cards").className = "visible";
  }
  images = arr.concat(arr);
  console.log("Array length is " + images.length);
  shuffleArray(images);
  console.log(images);
  placeCards();
  turn();
};

images = arr.concat(arr);
console.log(images);

const shuffleArray = (arrayIn) => {
  for (var i = arrayIn.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arrayIn[i];
    arrayIn[i] = arrayIn[j];
    arrayIn[j] = temp;
  }
  return arrayIn;
};

shuffleArray(images);

const placeCards = () => {
  let tableEl;
  let idSuffix;
  if (arrLength === 12) {
    tableEl = document.getElementById("table-12cards");
    idSuffix = "a";
  } else {
    tableEl = document.getElementById("table-24cards");
    idSuffix = "b";
  }
  let cells = tableEl.getElementsByTagName("td");
  for (let i = 0; i < images.length; i++) {
    cells[i].innerHTML = `     
    <div class="card" id="card${i}${idSuffix}">
      <div class="card-back visible" >
        <img src="/assets/marble-background.jpg" alt="flipped card" >
      </div>
      <div class="card-front hidden">
      <img src=${images[i]} alt="card" >
      </div>
  </div>`;
  }
};

placeCards();

let counter = 0;
let card1 = "";
let card2 = "";
let cardId1 = 0;
let cardId2 = 0;
let totalMoves = 0;

const turn = () => {
  let cards = document.getElementsByClassName("card");
  startTime = new Date().getTime();
  console.log(new Date());

  for (let i = 0; i < cards.length; i++) {
    // console.log("i: " + i);
    cards[i].onmousemove = function () {
      clearTimeout(timeout1);
      clearTimeout(timeout2);

      // if (i === 0) {
      //   document.getElementsByClassName("new-game")[0].innerHTML = "Restart";
      // }
      let frontElement = cards[i].getElementsByClassName("card-front")[0];
      console.log("className: " + frontElement.className);
      if (frontElement.className === "card-front removed") {
        return;
      }
      if (counter < 2) {
        console.log(" was clicked");
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
          if (cardId1 === cardId2) {
            return;
          }
        }
        let backElement = cards[i].getElementsByClassName("card-back")[0];
        backElement.className = "card-back hidden";
        frontElement.className = "card-front visible";
        counter++;
        console.log(counter);
      }
      if (counter === 2) {
        let cardEl1 = document.getElementById(`${cardId1}`);
        let cardEl2 = document.getElementById(`${cardId2}`);
        console.log(cardEl1);
        console.log(cardEl2);
        if (card1 === card2) {
          var timeout1 = setTimeout(() => {
            cardEl1.getElementsByTagName("div")[1].className =
              "card-front removed";
            cardEl2.getElementsByTagName("div")[1].className =
              "card-front removed";
            totalNumberOfCards -= 2;
            console.log("total number of cards: " + totalNumberOfCards);
            finish();
          }, 500);
        } else {
          var timeout2 = setTimeout(() => {
            cardEl1.getElementsByTagName("div")[1].className =
              "card-front hidden";
            cardEl2.getElementsByTagName("div")[1].className =
              "card-front hidden";
            cardEl1.getElementsByTagName("div")[0].className =
              "card-back visible";
            cardEl2.getElementsByTagName("div")[0].className =
              "card-back visible";
          }, 500);
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
  // document.getElementsByClassName("new-game")[0].innerHTML = "Start";
  shuffleArray(images);
  placeCards();
  console.log(images);
  totalNumberOfCards = arrLength;
  counter = 0;
  card1 = "";
  card2 = "";
  cardId1 = 0;
  cardId2 = 0;
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
