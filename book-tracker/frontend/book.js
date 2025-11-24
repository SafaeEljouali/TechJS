export class Book {
  constructor(
    title,
    author,
    pages,
    pagesRead,
    price,
    status,
    format,
    suggestedBy,
    finished = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
    this.price = price;
    this.status = status;
    this.format = format;
    this.suggestedBy = suggestedBy;
    this.finished = pagesRead === pages;
  }

  currentlyAt() {
    return Math.floor((this.pagesRead / this.pages) * 100);
  }
}
