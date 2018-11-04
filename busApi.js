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
      crate_img.setAttribute("src", "images/busImage2.png");
      //crate_img.setAttribute('marginleft', duetime * 15);
      var marginLeftTest = duetime * 20 + "px";
      console.log("testing margins " + marginLeftTest);
      crate_img.style.marginLeft = marginLeftTest;
      document.getElementById(stopidValue).appendChild(crate_img);

      var page3 = document.createElement("div");
      page3.setAttribute("id", stopidValue + "text");
      // if (duetime == 0) {
      //   var t = document.createTextNode(
      //     "Next bus " + route + " is now Due from " + stopidName  + " / "
      //   );
      // } else {
      //   var t = document.createTextNode(
      //     "Next bus " +
      //       route +
      //       " is due in " +
      //       duetime +
      //       " minutes from " +
      //       stopidName + " / "
      //   );
      // }
      //page3.setAttribute("id", duetime);
      //page3.appendChild(t);
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
      BusTime.push([duetimeNumber, route, stopidValue, stopidName]);
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
    crate_img.setAttribute("src", "images/busImage2.png");
    //crate_img.setAttribute('marginleft', duetime * 15);
    var marginLeftTest =  BusTime[i][0] * 20 + "px";
    console.log("testing margins " + marginLeftTest);
    crate_img.style.marginLeft = marginLeftTest;
    document.getElementById( BusTime[i][2]).appendChild(crate_img);


    var elmnt = document.createElement("div");
    if(BusTime[i][0] == 0){
      var textnode = document.createTextNode(
        "Next bus " + BusTime[i][1] + " is now Due from " + BusTime[i][3]
      );

    }
    else{
    var textnode = document.createTextNode(
      "Next bus " + BusTime[i][1] + " is due in " + BusTime[i][0] + " minutes from " + BusTime[i][3]
    );
    }
    // Append the text node to <li>
    elmnt.appendChild(textnode);

    document.getElementById( BusTime[i][2]).appendChild(elmnt);

    var a = document.createElement("a");
    var linkText = document.createTextNode("For a full rundown ");
    a.appendChild(linkText);
    a.setAttribute("target", "_blank");
    a.href = `https://www.dublinbus.ie/RTPI/Sources-of-Real-Time-Information/?searchtype=view&searchquery=${BusTime[i][2]}`;
    document.getElementById( BusTime[i][2]).appendChild(a);
  }
}



