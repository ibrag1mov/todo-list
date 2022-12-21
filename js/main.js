let elForm=document.querySelector('.js-form');
let elInput=document.querySelector('.js-input');
let elList=document.querySelector('.js-list');

let todos=[];

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
  
    // const obj{
    //     id: todos.length > 0 ? todos[todos.length-1].id + 1:1;
    //     text: elInput.value;

    // }

    let elItem=document.createElement('li');
    let elChekbox = document.createElement('input');
    let elSpan=document.createElement('span');
    let elEditBtn=document.createElement('button');
    let elDeleteBtn=document.createElement('button');

    elItem.setAttribute('class', 'd-flex list-group-item align-items-center js-item ');
    elSpan.setAttribute('class', 'w-75 mx-4')
    elChekbox.setAttribute('type', 'checkbox');
    elChekbox.setAttribute('class', ' form-check-input m-0');
    elEditBtn.setAttribute('class', 'btn btn-warning me-2');
    elDeleteBtn.setAttribute('class', 'btn btn-danger ');


    elSpan.textContent=elInput.value;
    elInput.value=""
    elEditBtn.textContent="Edit";
    elDeleteBtn.textContent="Delete";


    elItem.appendChild(elChekbox);
    elItem.appendChild(elSpan);
    elItem.appendChild(elEditBtn);
    elItem.appendChild(elDeleteBtn);
    console.log(elItem);

    elList.appendChild(elItem);
})






// id:todos.length > 0 ? todos[todos.length-1].id + 1:1;