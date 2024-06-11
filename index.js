// Student Registration System

// DOM Elements
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

// Student data
let students = JSON.parse(localStorage.getItem('students')) || [];

// Render students
function renderStudents() {
    studentList.innerHTML = students.map((student, index) => `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
    `).join('');

    // Add or remove scrollbar
    const tableContainer = document.getElementById('student-table-container');
    tableContainer.style.overflowY = studentList.offsetHeight > 400 ? 'scroll' : 'auto';
}

// Add student
studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('student-name').value.trim();
    const id = document.getElementById('student-id').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const phone = document.getElementById('student-phone').value.trim();

    // Validation
    if (!name || !id || !email || !phone) {
        alert('All fields are required!');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Name should only contain letters and spaces.');
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert('Student ID should only contain numbers.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        alert('Phone number should be in format: 123-456-7890');
        return;
    }

    // Check for duplicate student ID
    if (students.some(student => student.id === id)) {
        alert('Student ID already exists!');
        return;
    }

    // Add student
    students.push({ name, id, email, phone });
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
    studentForm.reset();
});

// Edit student
function editStudent(index) {
    const student = students[index];
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-email').value = student.email;
    document.getElementById('student-phone').value = student.phone;

    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

// Delete student
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }
}

// Initial render
renderStudents();