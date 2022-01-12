class UIHandler {
  drawTodosUI(state) {
    let todosHTML = "";
    state.forEach((todo, index) => {
      let oneTodoHTML = makeOneTodoHtmlContent(todo, index + 1);
      todosHTML += oneTodoHTML;
    });

    //   innerHTML hafli narsa
    todosWrapper.innerHTML = todosHTML;
  }

  showEditModal(todoText, todoId) {
    editModal.style.display = "flex";
    todoEditInput.value = todoText;
    todoEditInput.dataset.todoId = todoId;
  }

  hideEditModal() {
    editModal.style.display = "none";
    todoEditInput.value = "";
    delete todoEditInput.dataset.todoId;
  }

  showLoader() {
    spinnerDiv.style.display = "block";
  }

  hideLoader() {
    spinnerDiv.style.display = "none";
  }
}

const ui = new UIHandler();

class Store {
  constructor() {
    this.state = [];
  }

  setState(newState) {
    this.state = newState;
  }

  addTodo(todoText) {
    // statega qo'shadi
    const newTodo = {
      text: todoText,
      completed: false,
      id: makeID(this.state),
    };

    this.state.push(newTodo);
  }

  updateTodo(todoText, todoId) {
    const todoIndex = this.state.findIndex((elem) => elem.id === todoId);
    this.state[todoIndex].text = todoText;
  }

  deleteTodo(id) {
    // splice - dastlabki array o'zgartiradi
    const idx = this.state.findIndex((todo) => todo.id === id);
    this.state.splice(idx, 1);
  }
}

class App {
  constructor(store) {
    this.store = store;
    // initial allTodos fetching
    this._initalFetchTodos();
  }
  get state() {
    return this.store.state;
  }

  _initalFetchTodos() {
    ui.showLoader();
    api.getAllTodos().then((res) => {
      this.store.setState(res.data);
      ui.hideLoader();
      ui.drawTodosUI(this.store.state);
    });
  }

  addTodo(todoText) {
    this.store.addTodo(todoText);
    // UI and Api related
    this.onChangeTodos();
  }

  updateTodo(todoText, todoId) {
    this.store.updateTodo(todoText, todoId);
    // UI and Api related
    this.onChangeTodos();
    ui.hideEditModal();
  }

  deleteTodo(id) {
    this.store.deleteTodo(id);
    // UI and Api related
    this.onChangeTodos();
  }

  onChangeTodos() {
    ui.showLoader();
    api.updateTodos(this.store.state).then(() => {
      ui.drawTodosUI(this.store.state);
      ui.hideLoader();
    });
  }
}

const app = new App(new Store());
