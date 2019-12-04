function createCloseButton() {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  span.addEventListener('click', function() {
    let div = this.parentElement;
    div.style.display = "none";
  });

  return span;
}


function newElement() {
  let li = document.createElement('li');
  let inputValue = document.getElementById("myInput").value;
  let text = document.createTextNode(inputValue);
  li.appendChild(text);
  li.appendChild(createCloseButton());
  if (inputValue === "") {
    alert("Field can`t be empty!")
  } else{
    document.getElementById("myUl").appendChild(li);
  }
  clearButtons();
}

document.getElementById("myInput").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    newElement();
    clearButtons();
  }
});

function clearButtons() {
  const element = document.getElementById("myInput");
  element.value = '';
}

let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if(ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }

}, false);



getFromServer();

function getFromServer() {
  fetch('https://5d4908fd2d59e50014f20f15.mockapi.io/api/v1/tasks')
  .then(response => response.json())
  .then(responseJson => {
    for (const item of responseJson) {
      let li = document.createElement('li');
      let inputValue = item.title;
      let inputDate = item.due_date;
      let inputStarred = item.starred;
      let idElement = document.createElement('span');
      idElement.className = "title";
      let value = document.createTextNode(inputValue);
      let date = moment(inputDate).format('YYYY-MM-DD HH:mm:ss');
      let dateElement = document.createTextNode(date);
      let dateElementFormat = document.createElement('span');
      dateElementFormat.className = "date";
      dateElementFormat.appendChild(dateElement);
      li.appendChild(value);
      li.appendChild(dateElementFormat);
      li.appendChild(createCloseButton());
      document.getElementById("myUl").appendChild(li);
    }});

  }
