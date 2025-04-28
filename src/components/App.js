import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log("thiiis is my data", data);
        setQuestions(data);
      });
  }, []);

  const handleNewQuestion = (newQuiz) => {
    setQuestions((prev) => [...prev, newQuiz]);
  };

  const handleDelete = (quizId) => {
    fetch(`http://localhost:4000/questions/${quizId}`, {
      method: "DELETE",
    }).then(() => {
      const updated = questions.filter((question) => question.id !== quizId);
      setQuestions(updated);
    });
  };
  const handleSelected = (selected, qId) => {
    console.log("-----------------", questions);
    const updatedQuestions = questions.map((question) => {
      if (question.id === qId) {
        return { ...question, correctIndex: selected };
      }
      return question;
    });

    setQuestions(updatedQuestions);

    fetch(`http://localhost:4000/questions/${qId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: selected }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("i am patching", data);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleNewQuestion={handleNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDelete}
          handleSelected={handleSelected}
        />
      )}
    </main>
  );
}

export default App;
