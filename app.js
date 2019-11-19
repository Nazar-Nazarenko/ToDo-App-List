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
