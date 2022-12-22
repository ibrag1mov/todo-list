const elForm=document.querySelector('.js-form');
const elInput=document.querySelector('.js-input');
const elList=document.querySelector('.js-list');
const elGroupBtn=document.querySelector('.js-group-btn');
const elAllSpan=document.querySelector('#js-all-span');
const elCompletedSpan=document.querySelector('#js-completed');
const elUnCompletedSpan=document.querySelector('#js-un-completed');


const todos=[];
var check=0;

const renderTodo = (array, node)=>{
    node.innerHTML='';
    array.forEach((item)=>{
        const newItem = document.createElement('li');
        const newInput = document.createElement('input');
        const newSpan=document.createElement('span');
        const newEditBtn=document.createElement('button');
        const newDeleteBtn=document.createElement('button');

        newItem.setAttribute('class', 'd-flex list-group-item align-items-center js-item ');
        newSpan.setAttribute('class', 'w-75 mx-4')
        newInput.setAttribute('class', ' form-check-input m-0 js-check');
        newEditBtn.setAttribute('class', 'btn bg-light bg-gradient me-2 shadow js-edit-btn');
        newDeleteBtn.setAttribute('class', 'btn bg-danger text-white bg-gradient shadow js-delete-btn');

        newSpan.textContent =item.text;
        newInput.type = 'checkbox';
        newEditBtn.innerHTML = `<i class="bi bi-pen  pe-none"></i>`;
        newDeleteBtn.innerHTML = `<i class="bi bi-x-lg pe-none"></i>`;
        newEditBtn.dataset.todoId = item.id;
        newDeleteBtn.dataset.todoId = item.id;
        newInput.dataset.todoId = item.id;

        newItem.appendChild(newInput);
        newItem.appendChild(newSpan);
        newItem.appendChild(newEditBtn);
        newItem.appendChild(newDeleteBtn);

        if(item.isCompleted){
            newInput.checked = true;
            newSpan.style.textDecoration = 'line-through'
        }

       
  

        node.appendChild(newItem);
    });
};

elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    if(elInput.value != ''){
        let elInputValue = elInput.value;
        elInput.value='';
    
    
        const newTodo = {
            id: todos.length > 0 ? todos[todos.length-1].id + 1 : 1,
            text: elInputValue,
            isCompleted: false,
        };

        todos.push(newTodo);
        elUnCompletedSpan.textContent=todos.length;
        elAllSpan.textContent = todos.length;

        renderTodo(todos, elList)
       
    };
  
});

elList.addEventListener('click', (evt)=>{

    if(evt.target.matches('.js-delete-btn')){
        const todoId=evt.target.dataset.todoId;

        const findedIndex = todos.findIndex((item) => item.id == todoId);

        todos.splice(findedIndex, 1);
        
        elAllSpan.textContent = todos.length;



        renderTodo(todos, elList)
        
    }
    if(evt.target.matches('.js-edit-btn')){
        const todoId=evt.target.dataset.todoId; //string
        const findedItem = todos.find((item) => item.id == todoId);

        const newText = prompt('Yangi todo kiriting!', findedItem.text)
        
        findedItem.text=newText;
        renderTodo(todos, elList)
    }
    if(evt.target.matches('.js-check')){
        const todoId=evt.target.dataset.todoId; //string
        const findedItem = todos.find((item)=> item.id == todoId);
        findedItem.isCompleted = !findedItem.isCompleted;
        if(findedItem.isCompleted == true){
            check+=1;
            
        }
        else{
            check-=1;
        }
        elCompletedSpan.textContent = check;
        elUnCompletedSpan.textContent = todos.length - check;

        renderTodo(todos, elList)
    }
})

elGroupBtn.addEventListener('click', (evt)=>{
   if(evt.target.matches('.btn-primary')){
    renderTodo(todos, elList)
    }
    if(evt.target.matches('.btn-success')){

        if(elCompletedSpan.textContent != 0){
            const newFilterTodo=todos.filter((el)=> el.isCompleted==true);
            elCompletedSpan.textContent = newFilterTodo.length;
            renderTodo(newFilterTodo, elList)
        }
    }
    if(evt.target.matches('.btn-danger')){
        if(elCompletedSpan.textContent != 0){
            const newFilterTodo=todos.filter((el)=> el.isCompleted==false);
            elUnCompletedSpan.textContent = newFilterTodo.length;
            renderTodo(newFilterTodo, elList)
        }
    }
})
