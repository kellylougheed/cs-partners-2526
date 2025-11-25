const students = {
    ascs: ["Charlotte", "Laura", "Sophie C", "Claire", "Camden", "Catalina", "Hannah", "Sophie H", "Alexa", "Lucy", "Audrey", "Bella", "Sabrina", "Dylan", "Nicole", "Dakota", "Adella", "Colette", "Abigail", "Darian"],
    cs1: ["Juliet", "Jackie", "Jaya", "Yuri"],
    acs: ["Chloe", "Caroline", "Alex", "Shae", "Maya", "Cate", "Serena"],
    wad7: ["Chloe", "Lennon", "Barlow", "Allison", "Ceci", "Katalina", "Kayla", "Laleh", "Isabel", "Dalia", "Sana", "Quinn", "Annie", "Emilia"]
};

const courseSelect = document.getElementById("courseSelect");
const studentList = document.getElementById("studentList");
const pairsDiv = document.getElementById("pairs");
const partnerButton = document.getElementById("partnerButton");

function renderStudents(courseKey) {
    studentList.innerHTML = "";
    students[courseKey].forEach(name => {
        const div = document.createElement("div");
        div.className = "student-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = name;
        const label = document.createElement("label");
        label.setAttribute("for", name);
        label.textContent = name;
        div.appendChild(checkbox);
        div.appendChild(label);
        studentList.appendChild(div);
    });
}

// Traditional Fisher Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.trunc(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatePairs() {
    const checkedStudents = Array.from(studentList.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.id);
        
    // Shuffling
    let times1 = Math.floor(Math.random() * 1000) % 100;
    let randomMod = Math.floor(Math.random() * 200);
    let times2 = Math.floor(Math.random() * times1) % randomMod;
    
    // Create shallow copy of array
    let shuffled = shuffle([...checkedStudents]);
    for (let i = 0; i < times2; i++) {
        shuffled = shuffle([...checkedStudents]);
    }
    
    pairsDiv.innerHTML = "";
    for (let i = 0; i < shuffled.length; i += 2) {
        const pairDiv = document.createElement("div");
        pairDiv.className = "pair";
        if (i + 1 < shuffled.length) {
            pairDiv.innerHTML = `${shuffled[i]} & ${shuffled[i+1]}`;
        } else {
            pairDiv.innerHTML = `${shuffled[i]}`;
        }
        pairsDiv.appendChild(pairDiv);
    }
}

courseSelect.addEventListener("change", e => {
    renderStudents(e.target.value);
    pairsDiv.innerHTML = "";
});

partnerButton.addEventListener("click", generatePairs);

renderStudents(courseSelect.value);
