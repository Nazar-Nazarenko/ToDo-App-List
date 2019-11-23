let myNodeList = document.getElementsByTagName('LI');
for(let i = 0; i < myNodeList.length; i++) {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodeList[i].appendChild(span);

  span.addEventListener('click', function() {
    let div = this.parentElement;
    div.style.display = "none";
  });
}
getFromServer();

function getFromServer() {
  fetch('https://5d4908fd2d59e50014f20f15.mockapi.io/api/v1/tasks')
  .then(response => response.json())
  .then(responseJson => {
    for (let i = 0; i < responseJson.length; i++) {
      let li = document.createElement('li');
      let inputValue = responseJson[i].title;
      let t = document.createTextNode(inputValue);
      li.appendChild(t);
    document.getElementById("myUl").appendChild(li);
  }});
  
}

function newElement() {
  let li = document.createElement('li');
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);

  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  span.addEventListener('click', function() {
    let div = this.parentElement;
    div.style.display = "none";
  });

  if (inputValue === "") {
    alert("Field can`t be empty!")
  }else{
    document.getElementById("myUl").appendChild(li);
  }
}


let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if(ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

window.onload = getFromServer;
