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
	deleteDoc,
	doc,
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
	}, []);

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

	const handleFormSubmit = (
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
			const q = query(collection(db, "QuizzApp"), orderBy("order"));
			getDocs(q).then((querySnapshot) => {
				const fetchedQuestions = querySnapshot.docs.map((doc) => doc.data());
				setNewQuestions(fetchedQuestions);
				setUserAnswers([]);
				setUserScore(0);
			});
		});
	};

	const handleDeleteQuestion = async (questionId) => {
		await deleteDoc(doc(db, "QuizzApp", questionId));
		const q = query(collection(db, "QuizzApp"), orderBy("order"));
		const querySnapshot = await getDocs(q);
		const fetchedQuestions = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		setNewQuestions(fetchedQuestions);
		setUserAnswers([]);
		setUserScore(0);
	};

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.heading}>QuizzApp</h1>
				<p className={styles.headingText}>Stwórz swój własny quiz!</p>
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
							onClick={() => {
								setShowSummary(false);
								setChangeQuestion(0);
								setHandleHeading(1);
								setUserScore(0);
							}}
						>
							x
						</button>
						<h2>Podsumowanie</h2>
						<p>Twoj wynik to: {userScore}/{newQuestions.length}</p>
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
						questions={newQuestions}
						setQuestions={setNewQuestions}
						db={db}
						onDelete={handleDeleteQuestion}
					/>
				)}

				{showForm && (
					<Form
						onClick={() => setShowForm(false)}
						onQuestionsSubmit={handleFormSubmit}
					/>
				)}
			</div>
		</>
	);
}

export default App;
