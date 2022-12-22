const elForm=document.querySelector('.js-form');
const elInput=document.querySelector('.js-input');
const elList=document.querySelector('.js-list');
const elAllSpan=document.querySelector('#js-all-span');
const elCompletedSpan=document.querySelector('#js-completed');
const elUnCompletedSpan=document.querySelector('#js-un-completed');
const elBtnAll=document.querySelector('.js-all');
const elBtnCompleted=document.querySelector('.js-completed');
const elBtnUnCompleted=document.querySelector('.js-un-completed');


const todos=[];


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

    elAllSpan.textContent = todos.length;

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
        elAllSpan.textContent = todos.length;
        elUnCompletedSpan.textContent=todos.length;

        renderTodo(todos, elList)
    };
});

elList.addEventListener('click', (evt)=>{

    if(evt.target.matches('.js-delete-btn')){
        const todoId=evt.target.dataset.todoId;

        const findedIndex = todos.findIndex((item) => item.id == todoId);

        todos.splice(findedIndex, 1);

        let todoFilter = todos.filter((item) => item.isCompleted == true);
        
        elCompletedSpan.textContent = todoFilter.length;
        elUnCompletedSpan.textContent = elAllSpan.textContent - elCompletedSpan.textContent - 1;
  

        renderTodo(todos, elList)
        
    }
    if(evt.target.matches('.js-edit-btn')){
        const todoId=evt.target.dataset.todoId; //string
        const findedItem = todos.find((item) => item.id == todoId);

        const newText = prompt('Yangi todo kiriting!', findedItem.text)
        
        findedItem.text=newText;

        let todoFilter = todos.filter((item) => item.isCompleted == true);
        elCompletedSpan.textContent = todoFilter.length;
        elUnCompletedSpan.textContent = elAllSpan.textContent - elCompletedSpan.textContent ;

        renderTodo(todos, elList)
    }
    if(evt.target.matches('.js-check')){
        const todoId=evt.target.dataset.todoId; //string
        const findedItem = todos.find((item)=> item.id == todoId);
        findedItem.isCompleted = !findedItem.isCompleted;

        let todoFilter = todos.filter((item) => item.isCompleted == true);
  
        elCompletedSpan.textContent = todoFilter.length;
        elUnCompletedSpan.textContent = elAllSpan.textContent - elCompletedSpan.textContent ;
        
        renderTodo(todos, elList)
        
       
    }

    let todosCompleted=[];
    elBtnCompleted.addEventListener('click', (evt)=>{
        let todoFilter = todos.filter((item) => item.isCompleted == true);
        todosCompleted.push(todoFilter)
        renderTodo(todosCompleted[0], elList)
    });
    
    
    let todosUnCompleted=[];
    elBtnUnCompleted.addEventListener('click', (evt)=>{
        let todoFilter = todos.filter((item) => item.isCompleted == false);
        todosUnCompleted.push(todoFilter);
        renderTodo(todosUnCompleted[0], elList)
    })
    evt.preventDefault();
});




elBtnAll.addEventListener('click', (evt)=>{
    renderTodo(todos, elList);
})

