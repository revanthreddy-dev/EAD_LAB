import React, { useState } from 'react';
import './StudentTable.css';

const initialStudents = [
  { id: 1, name: 'Revanth Reddy', age: 20, course: 'Computer Science', grade: 'A' },
  { id: 2, name: 'Srujan', age: 22, course: 'Mathematics', grade: 'B' },
  { id: 3, name: 'Abhinav', age: 21, course: 'Physics', grade: 'A' },
  { id: 4, name: 'Jaswanth', age: 23, course: 'Biology', grade: 'C' },
  { id: 5, name: 'Sadhika', age: 19, course: 'Chemistry', grade: 'B' },
  { id: 6, name: 'Potti', age: 20, course: 'Computer Science', grade: 'A' },
  { id: 7, name: 'VishnuTeja', age: 22, course: 'English', grade: 'B' },
  { id: 8, name: 'BalRaju', age: 21, course: 'History', grade: 'A' },
  { id: 9, name: 'Vamshi', age: 23, course: 'Mathematics', grade: 'C' },
  { id: 10, name: 'Annanya', age: 19, course: 'Physics', grade: 'B' },
  { id: 11, name: 'Samhitha', age: 20, course: 'Computer Science', grade: 'A' },
  { id: 12, name: 'Tejitha', age: 22, course: 'Biology', grade: 'A' },
  { id: 13, name: 'Ayush', age: 21, course: 'Chemistry', grade: 'B' },
  { id: 14, name: 'Saarthak', age: 23, course: 'History', grade: 'A' }
];

const StudentTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredStudents = initialStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirstRecord, indexOfLastRecord);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="simple-container">
      <div>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchQuery} 
          onChange={handleSearch}
        />
      </div>

      <table border="1" cellPadding="10" className="simple-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.grade}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1 || totalPages === 0}>
          Previous
        </button>
        <span className="page-text">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
