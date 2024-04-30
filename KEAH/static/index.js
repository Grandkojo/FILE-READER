// document.getElementById('submit').addEventListener('submit', function (event) {
//   event.preventDefault()
 
// });

function startCount() {
  var response = document.querySelector(".wordOutput");


  //fetch api endpoint
  var fileInput = document.getElementById("file");
  var fileName = fileInput.files[0]['name'];
  console.log(file);

  // Create a FormData object and append the file to it
  // var formData = new FormData();
  // formData.append("file", file);

  fetch("/get_most_frequent_words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // file: "../files/keah.txt", // Assuming the file path you want to send to the server5
      file: "files/" + fileName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      const runtime = parseFloat(data.runtime).toFixed(4);

      let content = `Runtime: ${runtime} seconds<br>Most frequent words:<br>`;
      data.most_frequent_words.forEach((wordCount) => {
        content += `"${wordCount[0]}": ${wordCount[1]}<br>`;
      });

      response.innerHTML = content;

      console.log(response); // This will log the response data to the console
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
    });
}
