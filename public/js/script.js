var form = document.getElementById('shorten-form');
var urlBox = form.elements[0];
var link = document.getElementById('link');
var shrBox = document.getElementById('shortened');

new Clipboard('#copy');

function displayShortenedUrl(response) {
  console.log(response);
  link.textContent = response.data.shortUrl;
  link.setAttribute(
      'href', response.data.shortUrl
  );
  shrBox.style.opacity = '1';
  urlBox.value = '';
}

function displayError(err) {
    alert('An error has occurred, please try again.');
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log(urlBox.value);
    // Send the POST request to the backend
    axios.post('/new', {
        url: urlBox.value
    }).then(displayShortenedUrl)
        .catch(displayError);
});