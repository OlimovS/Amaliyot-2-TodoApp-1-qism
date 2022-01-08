const RESPONSE_IN_SECONDS = 500;

class LocalStorageManager {
  getItem(key, defaultValue) {
    try {
      const val = JSON.parse(localStorage.getItem(key)) || defaultValue;
      return val;
    } catch (error) {
      return defaultValue;
    }
  }

  setItem(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
}

class FakeApi {
  constructor(db) {
    this.db = db;
  }

  getAllTodos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const todos = this.db.getItem("todos", []);

        resolve({ data: todos });
      }, RESPONSE_IN_SECONDS);
    });
  }

  updateTodos(updatedTodos) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.db.setItem("todos", updatedTodos);

        resolve({ message: "success" });
      }, RESPONSE_IN_SECONDS);
    });
  }
}

const api = new FakeApi(new LocalStorageManager());
