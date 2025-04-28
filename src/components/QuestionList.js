import React from "react";

function QuestionList({ questions, onDelete, handleSelected }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <>
            <li key={question.id}>
              {question.prompt}
              <button onClick={() => onDelete(question.id)}>
                Delete Question
              </button>
            </li>

            <label htmlFor={`correct-answer-${question.id}`}>
              Correct Answer:
            </label>
            <select
              id={`correct-answer-${question.id}`}
              value={question.correctIndex}
              onChange={(e) =>
                handleSelected(Number(e.target.value), question.id)
              }
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
          </>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
