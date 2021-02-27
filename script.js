const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
  notes.forEach(note => {
    addNewNote(note);
  });
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  const container = document.getElementById("container");

  note.innerHTML = `
  <div class="notes">
    <div class="tools">
      <button class="edit" type="button" name="button"><i class="fas fa-edit"></i></button>
      <button class="delete" type="button" name="button"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" name="name" rows="15" cols="35"></textarea>
  </div> `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  textarea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");

    updateLS();
  });

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  container.appendChild(note);

}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach(note => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));

}
