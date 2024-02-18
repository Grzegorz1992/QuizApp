import { useState } from "react";
import { useEffect } from "react";
import { Question } from "./components/Question/Question";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { Summary } from "./components/Summary/Summary";
import { DeleteQuestion } from "./components/DeleteQuestion/DeleteQuestion";

import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC2AmXvq2ZgIgmYi6IdHaY6tp1PDYWnjW8",
	authDomain: "quizcreatorapp.firebaseapp.com",
	projectId: "quizcreatorapp",
	storageBucket: "quizcreatorapp.appspot.com",
	messagingSenderId: "1052841709172",
	appId: "1:1052841709172:web:6fd48e56b1ffd8922b0b21",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);
	const [handleHeading, setHandleHeading] = useState(1);
	const [showSummary, setShowSummary] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);
	const [userScore, setUserScore] = useState(0);
	const [newQuestions, setNewQuestions] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showDeleteQuestionForm, setShowDeleteQuestionForm] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const q = query(collection(db, "QuizzApp"), orderBy("order"));
			const querySnapshot = await getDocs(q);
			const fetchedQuestions = querySnapshot.docs.map((doc) => doc.data());
			setNewQuestions(fetchedQuestions);
		};

		fetchData();
	}, [newQuestions]);

	function nextQuestion(e) {
		const userAnswer = e.target.textContent;
		setUserAnswers((prevUserAnswer) => [...prevUserAnswer, userAnswer]);
		setChangeQuestion((prevQuestion) => prevQuestion + 1);
		setHandleHeading((prevHeading) => prevHeading + 1);

		if (handleHeading === newQuestions.length) {
			setShowSummary(true);
		}

		const isCorrectAnswer =
			userAnswer === newQuestions[changeQuestion]?.correctAnswer;

		if (isCorrectAnswer) {
			setUserScore((prevScore) => prevScore + 1);
		}
	}

	return (
		<>
			<header>
				<h1>QuizzApp</h1>
				<p>Stwórz swój własny quiz!</p>
				<p>Dodawaj i usuwaj ile pytań chcesz!</p>
			</header>

			<div className={styles.appContainer}>
				{!showSummary && newQuestions.length > 0 && (
					<Question
						heading={`Pytanie ${handleHeading}`}
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
						<button
							className={styles.closeSummary}
							onClick={() => setShowSummary(false)}
						>
							x
						</button>
						<h2>Podsumowanie</h2>
						<p>Twój wynik to: {userScore}</p>
						{newQuestions.map(({ question, id }, index) => (
							<Summary
								question={question}
								key={`${id}-${index}`}
								id={id}
								userAnswer={userAnswers[index]}
								correctAnswer={newQuestions[index]?.correctAnswer}
								className={
									userAnswers[index] === newQuestions[index]?.correctAnswer
										? styles.correctAnswer
										: styles.wrongAnswer
								}
							/>
						))}
					</div>
				)}

				<div className={styles.handleQuestionsBtns}>
					<button
						disabled={newQuestions.length === 0}
						className={styles.deleteQuestion}
						onClick={() => setShowDeleteQuestionForm(true)}
					>
						Usuń pytanie
					</button>
					<button className={styles.showForm} onClick={() => setShowForm(true)}>
						Dodaj pytanie
					</button>
				</div>
				{showDeleteQuestionForm && (
					<DeleteQuestion
						onClick={() => setShowDeleteQuestionForm(false)}
						db={db}
						questions={newQuestions}
						setQuestions={setNewQuestions}
					/>
				)}

				{showForm && (
					<Form
						onClick={() => setShowForm(false)}
						onQuestionsSubmit={(
							question,
							answerOne,
							answerTwo,
							answerThree,
							answerFour,
							correctAnswer
						) => {
							addDoc(collection(db, "QuizzApp"), {
								question,
								answerOne,
								answerTwo,
								answerThree,
								answerFour,
								correctAnswer,
								order: newQuestions.length + 1,
							}).then(() => {
								setNewQuestions((prevQuestions) => [
									...prevQuestions,
									{
										question,
										answerOne,
										answerTwo,
										answerThree,
										answerFour,
										correctAnswer,
										id: prevQuestions.length + 1,
									},
								]);
							});
						}}
					/>
				)}
			</div>
		</>
	);
}

export default App;
