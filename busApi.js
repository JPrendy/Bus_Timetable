var BusTime = [];

function StopNumber(stopidValue, routeNo, stopidName, lat, long) {
  url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopidValue}&format=json`;
  console.log(
    `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=${stopidValue}&format=json`
  );
  fetch(url)
    .then(function(response) {

     //this will remove the spinner icon
    var x = document.getElementById("loading");
    if(x != null){
    document.getElementById("loading").remove();
    }
      return response.json();
    })
    .then(function(text) {
      resultArray = 0;
      if (routeNo != "multiple") {
        var numberOfResults = text.numberofresults;
        for (var i = 0; i < numberOfResults; i++) {
          var route = text.results[i].route;
          //console.log("The current route is " + route);
          if (route == routeNo) {
            resultArray = i;
            //console.log("WOOOOOOW");
            break;
          }
        }
      }

      console.log("timestamp " + text.timestamp);
      var route = text.results[resultArray].route;
      console.log(text.results[resultArray].arrivaldatetime);
      var a = text.results[resultArray].arrivaldatetime;
      var b = a.split("");
      // console.log(b);
      var c = b.slice(11, 19);
      // console.log(c);
      var d = c.join("");
      console.log(d);
      duetime = text.results[resultArray].duetime;
      if (duetime == "Due") {
        duetime = 0;
      }
      console.log(duetime);

      var createDiv= document.createElement("div");
      createDiv.setAttribute("class", "busSquare");
      createDiv.setAttribute("id", stopidValue);
      document.getElementById("results").appendChild(createDiv);

      var crate_img = document.createElement("img");
      crate_img.setAttribute("src", "images/busImage.png");
      //crate_img.setAttribute('marginleft', duetime * 15);
      var marginLeftTest = duetime * 20 + "px";
      console.log("testing margins " + marginLeftTest);
      crate_img.style.marginLeft = marginLeftTest;
      document.getElementById(stopidValue).appendChild(crate_img);

      var page3 = document.createElement("div");
      page3.setAttribute("id", stopidValue + "text");
      document.getElementById(stopidValue).appendChild(page3);
//////
if (duetime == 0) {
  document.getElementById(stopidValue + "text").innerHTML = "Next " +
  "<b>" + route + "</b>" +
  " bus is now <b>Due</b> from " +
  "<b>" +  stopidName + "</b>" + " / ";
}
else{
document.getElementById(stopidValue + "text").innerHTML = "Next " +
      "<b>" + route + "</b>" +
      "  bus  is due in " +
      "<b>" + duetime + "</b>" +
      " minutes from " +
      "<b>" +  stopidName + "</b>" + " / ";
}



  
   // document.getElementById(stopidValue + "text").innerHTML = " <b>minutes</b> from" + stopidName;


      var a = document.createElement("a");
      var linkText = document.createTextNode("For a full rundown ");
      a.appendChild(linkText);
      a.setAttribute("target", "_blank");
      a.href = `https://www.dublinbus.ie/RTPI/Sources-of-Real-Time-Information/?searchtype=view&searchquery=${stopidValue}`;
      document.getElementById(stopidValue + "text").appendChild(a);









      duetimeNumber = parseInt(duetime);
      BusTime.push([duetimeNumber, route, stopidValue, stopidName, lat, long]);
      //BusTime.push(duetimeNumber);
    })
    .catch(err => console.log(err));
}
console.log(BusTime);

//push the times to an array then when the button is pressed we sort the array then we append the new list to the html
//maybe add a link to the website
StopNumber(213, "multiple", "Bus near Airport Takeaway", 53.38140194, -6.244888056);
StopNumber(1190, 14, "Outside My Home", 53.38015806, -6.235771111);
StopNumber(236, "multiple", "Funeral Parlour", 53.38202806, -6.238146944);
StopNumber(1359, 16, "Dame Street (16)", 53.34441806, -6.261423056);
StopNumber(7582, 14, "Dame Street (14)", 53.34432306, -6.262591111);
StopNumber(278, 16, "O Connell Street (16)", 53.35162806, -6.261236944);
StopNumber(497, 14, "Opposite to Connoly Station", 53.35050306, -6.250701111);
StopNumber(297, 14, "14 near the river Liffey",53.34811611, -6.256768889);
//add a function for specific stop id and route number I am looking for

window.onload = function() {
  document.getElementById("nextBus").addEventListener("click", nextBus);
  document.getElementById("nearestBus").addEventListener("click", getLocation);

  //add a spinner in here then have a condition that removes it from when the fetched worked
  var crate_img4 = document.createElement("img");
  crate_img4.setAttribute("src", "images/loading.gif");
  crate_img4.setAttribute("id", "loading");
  document.getElementById("results").appendChild(crate_img4);
  console.log(crate_img4);


};

function nextBus() {
  var list = document.getElementById("results");
  console.log("================");
  console.log("TOTAL VALUES " + list.childNodes.length);
  console.log("================");
  //for(var i =0; i<list.childNodes.length;i++){
  //list.removeChild(list.childNodes);
  //}
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  BusTime.sort(function(a, b) {
    return a[0] - b[0];
    //return a - b;
  });
  console.log(BusTime);
  for (i = 0; i < BusTime.length; i++) {
    var createDiv= document.createElement("div");
    createDiv.setAttribute("class", "busSquare");
    createDiv.setAttribute("id", BusTime[i][2]);
    document.getElementById("results").appendChild(createDiv);

    var crate_img = document.createElement("img");
    crate_img.setAttribute("src", "images/busImage.png");
    //crate_img.setAttribute('marginleft', duetime * 15);
    var marginLeftTest =  BusTime[i][0] * 20 + "px";
    console.log("testing margins " + marginLeftTest);
    crate_img.style.marginLeft = marginLeftTest;
    document.getElementById( BusTime[i][2]).appendChild(crate_img);


    var elmnt = document.createElement("div");
    elmnt.setAttribute("id", BusTime[i][2] + "text");
    document.getElementById(BusTime[i][2]).appendChild(elmnt);

    if(BusTime[i][0] == 0) {
        document.getElementById(BusTime[i][2] + "text").innerHTML = "Next " +
        "<b>" + BusTime[i][1] + "</b>" +
        " bus is now <b>Due</b> from " +
        "<b>" + BusTime[i][3] + "</b>" + " / ";
      }
      else{
      document.getElementById(BusTime[i][2] + "text").innerHTML = "Next " +
            "<b>" + BusTime[i][1] + "</b>" +
            "  bus  is due in " +
            "<b>" + BusTime[i][0] + "</b>" +
            " minutes from " +
            "<b>" +  BusTime[i][3] + "</b>" + " / ";
      }
      



    var a = document.createElement("a");
    var linkText = document.createTextNode("For a full rundown ");
    a.appendChild(linkText);
    a.setAttribute("target", "_blank");
    a.href = `https://www.dublinbus.ie/RTPI/Sources-of-Real-Time-Information/?searchtype=view&searchquery=${BusTime[i][2]}`;
    document.getElementById( BusTime[i][2] + "text").appendChild(a);
  }
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}

var _eQuatorialEarthRadius = 6378.1370;
var _d2r = (Math.PI / 180.0);
var nearestBus = [];

function showPosition(position) {
  var list = document.getElementById("results");
  var lat1 = position.coords.latitude;
  var long1 = position.coords.longitude;
  console.log(lat1, long1);
  console.log(BusTime);
  for (i = 0; i < BusTime.length; i++) {
      var lat2 = BusTime[i][4];
      var long2 = BusTime[i][5];

      var dlong = (long2 - long1) * _d2r;
      var dlat = (lat2 - lat1) * _d2r;
      var a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
      var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
      var d = _eQuatorialEarthRadius * c;

      nearestBus.push([d, BusTime[i][0], BusTime[i][1], BusTime[i][3], BusTime[i][2]]);
  }
  console.log(nearestBus);
  nearestBus.sort(function(a, b) {
      return a[0] - b[0];
      //return a - b;
    });
    console.log(nearestBus[0][0], nearestBus[0][1], nearestBus[0][2], nearestBus[0][3], nearestBus[0][4]);
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    var createDiv= document.createElement("div");
    createDiv.setAttribute("class", "busSquare");
    createDiv.setAttribute("id", nearestBus[0][4]);
    document.getElementById("results").appendChild(createDiv);

    var crate_img = document.createElement("img");
    crate_img.setAttribute("src", "images/busImage.png");
    //crate_img.setAttribute('marginleft', duetime * 15);
    var marginLeftTest =  nearestBus[0][0] * 20 + "px";
    console.log("testing margins " + marginLeftTest);
    crate_img.style.marginLeft = marginLeftTest;
    document.getElementById(  nearestBus[0][4]).appendChild(crate_img);


    var elmnt = document.createElement("div");
    elmnt.setAttribute("id",  nearestBus[0][4] + "text");
    document.getElementById( nearestBus[0][4]).appendChild(elmnt);

    if( nearestBus[0][1] == 0) {
        document.getElementById( nearestBus[0][4] + "text").innerHTML = "Next " +
        "<b>" + nearestBus[0][2] + "</b>" +
        " bus is now <b>Due</b> from " +
        "<b>" + nearestBus[0][3] + "</b>" + " / ";
      }
      else{
      document.getElementById( nearestBus[0][4] + "text").innerHTML = "Next " +
            "<b>" + nearestBus[0][2] + "</b>" +
            "  bus  is due in " +
            "<b>" + nearestBus[0][1]+ "</b>" +
            " minutes from " +
            "<b>" + nearestBus[0][3] + "</b>" + " / ";
      }
      



    var a = document.createElement("a");
    var linkText = document.createTextNode("For a full rundown ");
    a.appendChild(linkText);
    a.setAttribute("target", "_blank");
    a.href = `https://www.dublinbus.ie/RTPI/Sources-of-Real-Time-Information/?searchtype=view&searchquery=${nearestBus[0][4]}`;
    document.getElementById( nearestBus[0][4] + "text").appendChild(a);

}




