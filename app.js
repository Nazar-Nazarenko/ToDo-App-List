const apiURL = 'https://5d4908fd2d59e50014f20f15.mockapi.io/api/v1';

function createCloseButton() {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  span.addEventListener('click', function() {
    let div = this.parentElement;
    const id = div.getAttribute('data-id');
    div.style.display = "none";
    deleteFromServer(id);
  });

  return span;
}

function updateButton() {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u270e");
  span.className = "update";
  span.appendChild(txt);

  span.addEventListener('click', function() {
    let div = this.parentElement;
    const id = div.getAttribute('data-id');
    let edit = this.parentElement;
    console.log('edit', edit);
    let edition = edit.getElementsByClassName('task')[0];
    console.log('edition', edition);
    edition.disabled = false;


  });

  return span;
}


function clearButtons() {
  const element = document.getElementById("myInput");
  element.value = '';
}


function renderTask(item) {
  let li = document.createElement('li');
  li.setAttribute('data-id', item.id);
  let inputValue = item.title;
  let value = document.createTextNode(inputValue);
  let valueFormat = document.createElement('input');
  valueFormat.className = 'task';
  valueFormat.disabled = true;
  valueFormat.setAttribute('value', item.title);
  let inputDate = item.due_date;
  let inputStarred = item.starred;
  let date = moment(inputDate).format('YYYY-MM-DD HH:mm:ss');
  let dateElement = document.createTextNode(date);
  let dateElementFormat = document.createElement('span');
  dateElementFormat.className = "date";
  dateElementFormat.appendChild(dateElement);
  li.appendChild(valueFormat);
  li.appendChild(dateElementFormat);
  li.appendChild(updateButton());
  li.appendChild(createCloseButton());
  document.getElementById("myUl").appendChild(li);
}

function getFromServer() {
  fetch('https://5d4908fd2d59e50014f20f15.mockapi.io/api/v1/tasks')
  .then(response => response.json())
  .then(responseJson => {
    for (const item of responseJson) {
      renderTask(item);
    }
  });
  clearButtons();
}


function postToServer() {
  let inputValue = document.getElementById("myInput").value;

  try {
    const data = postData(
      '/tasks', {
      due_date: new Date().toLocaleString(),
      title: inputValue,
      completed: false,
      starred: false }).then(result => {
        renderTask(result)
        console.log(result);
      });
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(apiURL + url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  });
  clearButtons();
  return await response.json();
}



function updateToServer() {
  try {
    const data = putData(
      '/tasks/12', {
      "due_date": new Date().toLocaleString(),
      "title": inputValue,
      "completed": false,
      "starred": false
    });
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

async function putData(url = '', data = {}) {
  const response = await fetch(apiURL + url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  });
  return await response.json();
}




function deleteFromServer(id) {
  try {
    const data = deleteData(
      '/tasks/' + id
    );
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

async function deleteData(url = '') {
  const response = await fetch(apiURL + url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer'
  });
  return await response.json();
}

// calling function herrer
getFromServer ();

document.getElementById("myInput").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    postToServer()
  }
});

let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if(ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }

}, false);
