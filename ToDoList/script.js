class Todo {
    constructor(id, parentItem) {
        this.id = id;
        this.parentItem = parentItem;
    }
}

class TodoService {
    constructor() {
        this.listLenght=0;
        this.lastId = 0;
        this.todos = [];
        this.sortFlag = true;
        this.input = document.querySelector('input');
        this.sort = document.querySelector('.sortleft');
        this.add = document.querySelector('.add-button');
        this.list = document.querySelector('.list');
    }

    checkList(){
        this.todos.length===0?listIsEmpty=true:listIsEmpty=false;
        
        listIsEmpty?this.list.style.border = '0px':this.list.style.border = '1px';
    }
    createTodo() {
        const id = this.lastId;
        const parent = document.createElement('div');
        const todoText = document.createElement('input');
        const clear = document.createElement('button');

        todoText.value = this.input.value;

        parent.classList.add('item');
        clear.classList.add('x');

        parent.append(todoText);
        parent.append(clear);

        clear.addEventListener('click', e => {
            parent.remove();
            delete this.todos[id];
            this.listLenght--;
            if(this.listLenght<=0){this.list.style.border = '0px #C4C4C4 solid';}
            console.log(this.listLenght);
        });
        this.listLenght++;
        this.list.style.border = '1px #C4C4C4 solid'
        return new Todo(this.lastId++, parent);
    }

    addTodo() {
        if (this.input.value != '') {
            this.todos.push(this.createTodo());

            this.todos.forEach(i => this.list.append(i.parentItem));
            this.input.value = '';
        }
    }

    sorting() {
        if (this.sortFlag) {
            this.todos.sort((a, b) => a.parentItem.firstChild.textContent > b.parentItem.firstChild.textContent ? 1 : -1);
            this.sort.classList.remove('sortleft');
            this.sort.classList.toggle('sortright');
            console.log(this.sort.classList);
        } else {
            this.todos.sort((a, b) => b.parentItem.firstChild.textContent > a.parentItem.firstChild.textContent ? 1 : -1);
            this.sort.classList.remove('sortright');
            this.sort.classList.toggle('sortleft');
        }
        this.todos.forEach(i => this.list.append(i.parentItem));
        this.sortFlag = !this.sortFlag;

    }

    clear(target) {
        target.parentElement.remove();
    }

    render() {
        this.add.addEventListener('click', e => {
            this.addTodo();
        });

        document.addEventListener('keyup',(event)=>{
            if(event.key==='Enter'){this.addTodo();};
        })

        this.sort.addEventListener('click', e => {
            this.sorting();
        });
    }
}



const dodo = new TodoService;
dodo.render();