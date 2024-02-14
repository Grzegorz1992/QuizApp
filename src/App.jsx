import { useState } from "react";
import { Question } from "./components/Question/Question";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { Summary } from "./components/Summary/Summary";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC2AmXvq2ZgIgmYi6IdHaY6tp1PDYWnjW8",
	authDomain: "quizcreatorapp.firebaseapp.com",
	projectId: "quizcreatorapp",
	storageBucket: "quizcreatorapp.appspot.com",
	messagingSenderId: "1052841709172",
	appId: "1:1052841709172:web:6fd48e56b1ffd8922b0b21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);
	const [handleHeading, setHandleHeading] = useState(1);
	const [showSummary, setShowSummary] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);
	const [userScore, setUserScore] = useState(0);
	const [newQuestions, setNewQuestions] = useState([]);
	const [newCorrectAnswers, setNewCorrectAnswers] = useState([]);

	function nextQuestion(e) {
		const userAnswer = e.target.textContent;
		setUserAnswers((prevUserAnswer) => [...prevUserAnswer, userAnswer]);
		setChangeQuestion((prevQuestion) => prevQuestion + 1);
		setHandleHeading((prevHeading) => prevHeading + 1);

		if (handleHeading === newQuestions.length) {
			setShowSummary(true);
		}

		const isCorrectAnswer = userAnswer === newCorrectAnswers[changeQuestion];

		if (isCorrectAnswer) {
			setUserScore((prevScore) => prevScore + 1);
		}
	}

	return (
		<>
			<div className={styles.container}>
				{!showSummary && (
					<Question
						heading={`pytanie ${handleHeading}`}
						question={newQuestions[changeQuestion]?.question}
						answerOne={newQuestions[changeQuestion]?.answerOne}
						answerTwo={newQuestions[changeQuestion]?.answerTwo}
						answerThree={newQuestions[changeQuestion]?.answerThree}
						answerFour={newQuestions[changeQuestion]?.answerFour}
						onClick={nextQuestion}
						disabled={newQuestions.length === 0}
					/>
				)}
				{showSummary && (
					<div className={styles.summaryBox}>
						<h2>Podsumowanie</h2>
						<p>Twój wynik to: {userScore}</p>
						{newQuestions.map(({ question, id }, index) => (
							<Summary
								question={question}
								key={id}
								id={id}
								userAnswer={userAnswers[index]}
								correctAnswer={newCorrectAnswers[index]}
								className={
									userAnswers[index] === newCorrectAnswers[index]
										? styles.correctAnswer
										: styles.wrongAnswer
								}
							/>
						))}
					</div>
				)}
			</div>
			<Form
				onQuestionsSubmit={(
					question,
					answerOne,
					answerTwo,
					answerThree,
					answerFour,
					correctAnswer
				) => {
					setNewQuestions((prevQuestion) => {
						return [
							...prevQuestion,
							{
								question,
								answerOne,
								answerTwo,
								answerThree,
								answerFour,
								id: prevQuestion.length + 1,
							},
						];
					});

					setNewCorrectAnswers((prevCorrectAnswer) => [
						...prevCorrectAnswer,
						correctAnswer,
					]);
				}}
			/>
		</>
	);
}

export default App;
