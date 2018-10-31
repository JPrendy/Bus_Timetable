// var PageNumber = 0;

// function any() {
//   var SearchTerm = document.getElementById("searchinput").value;
//   let url = ``;
//   if (SearchTerm === "") {
//     url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}`;
//   } else {
//     url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d8eb6e8f3a54495396f7db53263f216e&page=${PageNumber}&q=${SearchTerm}`;
//   }
  url = `https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=1187&format=json`;
  console.log(`https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=1187&format=json`);
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(text) {
      console.log("timestamp " + text.timestamp);
      var a2 = new Date();
    //   var b2 = a2.split("");
    //   var c2 = b2.slice(11,19);
    //   var d2 = c2.join("");
    //   console.log(d2);
      var d3 = a2.getMinutes(); 
      console.log(d3);

      console.log(text.results[0].arrivaldatetime);
      var a =text.results[0].arrivaldatetime;
      var b = a.split("");
      console.log(b);
      var c = b.slice(11,19);
      console.log(c);
      var d = c.join("");
      console.log(d);
    //  let output = '<div class="card-columns">';

    //   for (var i = 0; i < 10; i++) {
    //     output += `
    //           <div class="card">
    //           <h5><center>${text.response.docs[i].headline.main}</center></h5>

    //           <div class="card-body">

    //             <a href="${text.response.docs[i].web_url}" target="_blank" >${
    //             text.response.docs[i].snippet
    //             }</a>
                
    //             </div>
    //             <h7><center>Type: ${
    //               text.response.docs[i].section_name
    //             }</center></h7>

    //         </div><br/>`;
    //   }
    //   output += "</div>";
    //   document.getElementById("results").innerHTML = output;
     })
    .catch(err => console.log(err));
// }

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