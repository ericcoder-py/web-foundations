# Library API Design

REST API design for managing a library's **books** resource.

---

## Endpoints

### 1. List All Books
* **Method**: `GET`
* **Path**: `/api/books`
* **Description**: Retrieves a list of all books available in the library inventory.
* **Success Status Code**: `200 OK`
* **Example Request Body**: *None* (GET request)

---

### 2. Get One Book
* **Method**: `GET`
* **Path**: `/api/books/{id}`
* **Description**: Retrieves details of a single book specified by its unique ID.
* **Success Status Code**: `200 OK`
* **Example Request Body**: *None* (GET request)

---

### 3. Create a Book
* **Method**: `POST`
* **Path**: `/api/books`
* **Description**: Adds a new book to the library system.
* **Success Status Code**: `201 Created`
* **Example Request Body**:
  ```json
  {
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "published_year": 1999,
    "isbn": "978-0201616224"
  }