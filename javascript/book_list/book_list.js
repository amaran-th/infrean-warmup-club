let bookList = [];
let name = document.querySelector(".bookName");
let author = document.querySelector(".bookAuthor");
let tbody = document.querySelector(".bookItems");
let submit = document.querySelector(".submitButton");
let alarm = document.querySelector(".alarm");

const printList = () => {
  Array.from(tbody.children).forEach((child) => {
    tbody.removeChild(child);
  });
  for (let i = 0; i < bookList.length; i++) {
    const newBookNo = document.createElement("td");
    const newBookName = document.createElement("td");
    const newBookAuthor = document.createElement("td");
    const deleteBook = document.createElement("td");
    newBookNo.textContent = i + 1;
    newBookName.textContent = bookList[i].name;
    newBookAuthor.textContent = bookList[i].author;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      activateAlarm("책이 삭제되었습니다.");
      bookList.splice(i, 1);
      printList();
    });
    deleteBook.appendChild(deleteButton);
    const newBook = document.createElement("tr");
    newBook.appendChild(newBookNo);
    newBook.appendChild(newBookName);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(deleteBook);
    tbody.appendChild(newBook);
  }
};

const initializeInput = () => {
  name.value = "";
  author.value = "";
};

const activateAlarm = (comment) => {
  alarm.setAttribute("style", "display: block");
  alarm.textContent = comment;
  setTimeout(() => {
    alarm.setAttribute("style", "display: none");
  }, 3000);
};

function submitHandler() {
  if (name.value === "" || author.value === "") {
    return;
  }
  bookList = [...bookList, { name: name.value, author: author.value }];
  activateAlarm("책이 추가되었습니다.");
  printList();
  initializeInput();
}

submit.addEventListener("click", () => submitHandler());
