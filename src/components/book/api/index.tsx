import { Book } from "../types";

const BASE_URL = "http://localhost:8080/books";

async function getAll(): Promise<Book[]> {
  const response = await fetch(BASE_URL, {
    method: "GET",
  });

  return await response.json();
}

async function getById(bookId: string): Promise<Book> {
  const response = await fetch(`${BASE_URL}/${bookId}`, {
    method: "GET",
  });

  return await response.json();
}

//getByAuthor

async function getByCategory(bookCategory: string): Promise<Book[]> {
  const response = await fetch(`${BASE_URL}/category/${bookCategory}`, {
    method: "GET",
  });

  return await response.json();
}

type CreateBookRequest = {
  bookCover: string;
  bookName: string;
  bookAuthor: string;
  bookPublicationDate: Date | null;
  bookSynopsis: string;
  bookCategory: string;
  bookPrice: number;
};

type CreateBookResponse = {
  book: Book;
};

async function createBook(
  request: CreateBookRequest
): Promise<CreateBookResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function updateBook(
  bookId: string,
  request: CreateBookRequest
): Promise<CreateBookResponse> {
  const response = await fetch(`${BASE_URL}/${bookId}`, {
    method: "PUT",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

async function deleteBook(bookId: string): Promise<null> {
  const response = await fetch(`${BASE_URL}/${bookId}`, {
    method: "DELETE",
  });

  return await response.json();
}

const client = {
  getAll,
  getById,
  //getByAuthor
  getByCategory,
  createBook,
  updateBook,
  deleteBook,
};

export default client;
