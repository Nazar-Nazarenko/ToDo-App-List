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
    let hideButton = edit.getElementsByClassName('update')[0];
    console.log('hideButton', hideButton);
    hideButton.style.visibility = 'hidden';
    let visibleButton = edit.getElementsByClassName('save')[0];
    console.log("visibleButton", visibleButton);
    visibleButton.style.visibility = 'visible';
    let edition = edit.getElementsByClassName('task')[0];
    console.log('edition', edition);
    edition.disabled =  false;
  });

  return span;
}

function saveButton() {
  let spanSave = document.createElement("span");
  let txt = document.createTextNode("done");
  spanSave.className = "save";
  spanSave.appendChild(txt);
  spanSave.style.visibility = 'hidden';

  spanSave.addEventListener('click', function() {
    let div = this.parentElement;
    const id = div.getAttribute('data-id');
    let save = this.parentElement;
    console.log('save', save);
    let editValue = save.getElementsByClassName('task')[0];
    editValue.disabled = true;
    spanSave.style.visibility = 'hidden';
    let pencil = this.parentElement;
    let pencilVisible = pencil.getElementsByClassName('update')[0];
    pencilVisible.style.visibility = 'visible';
    let prepareUpdate = div.getElementsByClassName('task')[0].value;
    console.log('prepareUpdate', prepareUpdate);
    updateToServer(id, prepareUpdate);

  });
  return spanSave;
}


function clearButtons() {
  const element = document.getElementById("myInput");
  element.value = '';
}


function renderTask(item) {
  let li = document.createElement('li');
  li.setAttribute('data-id', item.id);
  if(item.starred) {
    li.className = 'checked';
  }
  let inputValue = item.title;
  let value = document.createTextNode(inputValue);
  let valueFormat = document.createElement('input');
  valueFormat.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      let saveValue = document.getElementsByClassName('task')[0];
      saveValue.disabled = true;
      let doneButton = document.getElementsByClassName('save')[0];
      doneButton.style.visibility = 'hidden';
      let pencilButton = document.getElementsByClassName('update')[0];
      pencilButton.style.visibility = 'visible';
      updateToServer(item.id, this.value);
    }
  })
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
  let circle = document.createElement('span');
  let circleItem = document.createTextNode('\u26AA');
  circleItem.className = 'circle';
  li.appendChild(circleItem);
  li.appendChild(valueFormat);
  li.appendChild(dateElementFormat);
  li.appendChild(updateButton());
  li.appendChild(createCloseButton());
  li.appendChild(saveButton());
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
      due_date: new Date().getTime(),
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



function updateToServer(id, inputValue) {
  try {
    console.log("new Date()", new Date().toLocaleString());
    const data = putData(
      '/tasks/' + id, {
      "due_date": new Date().getTime(),
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
  saveButton();
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
    postToServer();
  }
});

let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if(ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }

}, false);
