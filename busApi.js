// var PageNumber = 0;
var BusTime=[];
function StopNumber(stopidValue, stopidName) {
//   var SearchTerm = document.getElementById("searchinput").value;
//   let url = ``;
//   if (SearchTerm === "") {
//     url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}`;
//   } else {
//     url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}&q=${SearchTerm}`;
//   }
  url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopidValue}&format=json`;
  console.log(`https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopidValue}&format=json`);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      console.log("timestamp " + text.timestamp);
      var route = (text.results[0].route);
      console.log(text.results[0].arrivaldatetime);
      var a =text.results[0].arrivaldatetime;
      var b = a.split("");
      // console.log(b);
      var c = b.slice(11,19);
      // console.log(c);
      var d = c.join("");
      console.log(d);
      duetime = text.results[0].duetime;
      if (duetime == "Due"){
        duetime = 0;
      }
      console.log(duetime);
      var crate_img = document.createElement("img");
      crate_img.setAttribute('src', 'images/busImage.jpg'); 
      //crate_img.setAttribute('marginleft', duetime * 15);
      var marginLeftTest = duetime * 25 + 'px';
      console.log("testing margins " + marginLeftTest);
      crate_img.style.marginLeft = marginLeftTest;
      document.getElementById("results").appendChild(crate_img);

       var page3 = document.createElement("div");
       if (duetime == 0){
        var t = document.createTextNode("Next bus " + route + " is now Due " + "from " + stopidName);
       }
       else{
       var t = document.createTextNode("Next bus " + route + " is due in " + duetime + " minutes from " + stopidName);
       }
       page3.setAttribute('id', duetime);
       page3.appendChild(t);
       document.getElementById("results").appendChild(page3);
       duetimeNumber = parseInt(duetime);
       BusTime.push([duetimeNumber, stopidValue]);
       //BusTime.push(duetimeNumber);

     })
    .catch(err => console.log(err));
}
console.log(BusTime);

//push the times to an array then when the button is pressed we sort the array then we append the new list to the html
//maybe add a link to the website
StopNumber(213, "Bus near Airport Takeaway");
StopNumber(1190, "Outside My Home");
StopNumber(236, "Funeral Parlour");
StopNumber(1359, "Dame Street (16)");
StopNumber(7582, "Dame Street (14)");
StopNumber(278, "O Connell Street (16)");
StopNumber(497, "Opposite to Connoly Station");
StopNumber(297, "14 near the river Liffey");
//add a function for specific stop id and route number I am looking for

window.onload=function(){
document.getElementById("nextBus").addEventListener("click", nextBus);
}

function nextBus(){
  BusTime.sort(function(a,b){
    return a[0] - b[0];
    //return a - b;
  })
  console.log(BusTime);
  for(i=0; i<BusTime.length; i++){
    var elmnt = document.createElement("div");
    var textnode = document.createTextNode(BusTime[i][0]);

// Append the text node to <li>
elmnt.appendChild(textnode);

// Get the <ul> element with id="myList"
var item = document.getElementById("results");

// Replace the first child node (<li> with index 0) in <ul> with the newly created <li> element
item.replaceChild(elmnt, item.childNodes[i]);

  }
}


test(1359,16);


function test(stopidValue, value2){
  url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopidValue}&format=json`;
  var hello = 0;
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(text) {
  var numberOfResults = text.numberofresults; //gets the number od results loaded from the json file.
  console.log("no of results" + numberOfResults);
  for(var i = 0; i< numberOfResults; i++){
  var route = (text.results[i].route);
  //console.log("The current route is " + route);
  if (route == value2){
    hello = i;
    //console.log("WOOOOOOW");
    break;
  }
}
console.log("================");
console.log("The next bus that is " + value2 + " " + hello);
console.log("================");
  })
.catch(err => console.log(err));
}
