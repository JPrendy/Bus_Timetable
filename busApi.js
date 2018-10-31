// var PageNumber = 0;

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
      var a2 = new Date();
      var d3 = a2.getMinutes(); 
      console.log(d3);
      var route = (text.results[0].route);
      console.log(text.results[0].arrivaldatetime);
      var a =text.results[0].arrivaldatetime;
      var b = a.split("");
      console.log(b);
      var c = b.slice(11,19);
      console.log(c);
      var d = c.join("");
      console.log(d);
      // var d4 = b.slice(14,16);
      // var d5 = d4.join("");
      // console.log(d5);

      duetime = text.results[0].duetime;
      console.log(duetime);

       //document.getElementById("results").innerHTML = output;
       var page3 = document.createElement("div");
       if (duetime == "Due"){
        var t = document.createTextNode("Next bus " + route + " is now Due " + "from " + stopidName);
       }
       else{
       var t = document.createTextNode("Next bus " + route + " is due in " + duetime + " minutes from " + stopidName);
       }
       page3.appendChild(t);
      //document.body.appendChild(page3);
       document.getElementById("results").appendChild(page3);
       //document.getElementById("myDIV").appendChild(page3);
     })
    .catch(err => console.log(err));
}

//push the times to an array then when the button is pressed we sort the array then we append the new list to the html

StopNumber(213, "place1");
StopNumber(1190, "place1");
StopNumber(236, "place1");
StopNumber(1359, "place1");
//add a function for specific stop id and route number I am looking for


// function nextpage() {
//   PageNumber++;
//   console.log(PageNumber);
//   any();
// }

// function previouspage(e) {
//   if (PageNumber > 0) {
//     PageNumber--;
//   } else {
//     return false;
//   }
//   any();
// }