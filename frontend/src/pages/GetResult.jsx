import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

const GetResult = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "Mathematics", correct: 8, total: 10 },
    { name: "Science", correct: 7, total: 10 },
    { name: "English", correct: 9, total: 10 },
    { name: "General Knowledge", correct: 6, total: 10 },
  ];
  const totalCorrect = subjects.reduce((sum, subject) => sum + subject.correct, 0);
  const totalQuestions = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const percentage = ((totalCorrect / totalQuestions) * 100).toFixed(2);
  const resultStatus = percentage >= 50 ? "Pass 🎉" : "Fail ❌";

  return (
    <MainLayout>
      <div className="bg-green-700 text-white py-12 px-6 text-center md:py-16 mt-15">
        <h1
          className="text-2xl md:text-5xl font-bold leading-snug"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Get <span className="text-yellow-400">Your </span>
          <br />  MCQS Result 
        </h1>
      </div>

      <div style={styles.container}>
        <h1 style={styles.title}>MCQ Exam Results</h1>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Subject</th>
              <th>Correct Answers</th>
              <th>Out Of</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{subject.name}</td>
                <td>{subject.correct}</td>
                <td>{subject.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={styles.totalRow}>
              <td><strong>Total Marks</strong></td>
              <td><strong>{totalCorrect}</strong></td>
              <td><strong>{totalQuestions}</strong></td>
            </tr>
            <tr style={styles.percentageRow}>
              <td colSpan="3">Total Percentage: <strong>{percentage}%</strong></td>
            </tr>
            <tr style={styles.resultRow}>
              <td colSpan="3">Result: <strong>{resultStatus}</strong></td>
            </tr>
          </tfoot>
        </table>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/")}> Return to Home</button>
          <button style={styles.button} onClick={() => navigate("/startquiz")}> Try Again</button>
        </div>
      </div>
    </MainLayout>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, merriweather",

    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#2e7d32",
    marginBottom: "20px",
    
    fontFamily:"merriweather",
    fontSize: "24px",
  },
  table: {
    width: "60%",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  tableHeader: {
    background: "#2e7d32",
    color: "white",
    fontSize: "18px",
  },
  tableRow: {
    textAlign: "center",
    height: "40px",
  },
  totalRow: {
    background: "#c8e6c9",
    textAlign: "center",
  },
  percentageRow: {
    background: "#81c784",
    textAlign: "center",
  },
  resultRow: {
    background: "#66bb6a",
    textAlign: "center",
    color: "white",
    fontSize: "18px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "12px 20px",
    background: "#388e3c",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default GetResult;
