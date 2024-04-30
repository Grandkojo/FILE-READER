//handle alert messages
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  var fileInput = document.getElementById('file');
  //if there's no file
  if (fileInput.files.length === 0) {
    alert('Please select a file');
    return;
  }
  //if there's a file alert and upload
  var formData = new FormData();
  formData.append('file', fileInput.files[0]);
  
  console.log(formData);

  fetch('/', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert("File uploaded successfully!");
    return;
  })
  .catch(error => console.error(error));
});

function startCount() {
  var response = document.querySelector(".wordOutput");


  //fetch api endpoint
  var fileInput = document.getElementById("file");
  var fileName = fileInput.files[0]['name'];
  console.log(file);

  

  fetch("/get_most_frequent_words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
