const { builder } = require('@netlify/functions');
const fetch = require ('node-fetch');
const { format } = require('date-fns');

function formatDate(strDate) {
  return format(new Date(strDate), "MMMM do, yyyy")
}

function randomColor() {
  return `rgba(${Math.round(Math.random()*7)},${Math.round(Math.random()*70)},${Math.round(Math.random()*7)}, ${0.4})`;
}

function changeNumberToMonat(monat_number) {
  switch(monat_number){
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
}

async function handler(event) {
  const [, , year, ...month] = event.path.split('/');
  const time = new Date().toString();
  const request = await fetch(`https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=3cGGAzhEUGTJGXrdy5TNaTrU3ctblSEK`)
        .then(response => response.json())
        .catch(error => console.error(error));
  const data = request.response.docs;
  let post="";

  for (let i = 0; i < 30; i++) {
    let new_post =
    `<div class="card w-50 p-2">
      <div class="card-body m-0" style="background-color: ${randomColor()}">
        <a href="${data[i].web_url}">
          <h5 class="text-white pb-3"> ${data[i].abstract} </h5>
        </a>
        <div class="text-light"> ${formatDate(data[i].pub_date)} </div>
      </div>
     </div>
    `
    post = post.concat(new_post);
  }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body:
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="news new york times archive" />

          <!-- Bootstrap CSS -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
          <title> Archieve </title>
          <style>
            body {
              background-color: rgba(80, 77, 77, 1);
            }

            h1 {
              color: blue;
              font-size: 300%;
            }

            p {
              color: red;
              font-size: 160%;
            }
            .card {
              transition: transform 0.25s;
              border-radius: 0;
              border: 0;
              background-color: rgba(80, 77, 77, 1);
            }
            a:hover {
              color: white;
            }

            .link {
              color: red;
              padding-left: 3%;
            }

            .link:hover {
              color: white;
            }
          </style>
        </head>
        <body>
          <main>
            <div>
              <h1 class="pb-5 m-0 font-bold text-center text-white display-3"> New York Times News </h1>
              <a class="link" href="/"> Home </a>
              <h4 class="m-auto text-white text-center pb-5"> Archive: ${changeNumberToMonat(parseInt(month))} ${year}</h4>
              <p class="text-center m-2">Generated at:<br />${time}</p>
              <div class="row mx-2">${post}</div>
            </div>
          </main>
        </body>
        </html>
        `,
            };
}

exports.handler = builder(handler);