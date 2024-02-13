import { useState } from "react";
import { Question } from "./components/Question/Question";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { Summary } from "./components/Summary/Summary";

const correctAnswers = ["ryż", "azot", "dyni", "golf", "średniowieczem"];
const Questions = [
	{
		question: "Co jest głównym składnikiem risotto?",
		answerOne: "ryż",
		answerTwo: "pomidory",
		answerThree: "ser",
		answerFour: "oregano",
		id: 1,
	},
	{
		question: "Co jest głównym składnikiem ziemskiej atmosfery?",
		answerOne: "tlen",
		answerTwo: "węgiel",
		answerThree: "azot",
		answerFour: "para wodna",
		id: 2,
	},
	{
		question: "Hokkaido to jedna z popularnych odmian?",
		answerOne: "jabłek",
		answerTwo: "papryki",
		answerThree: "dyni",
		answerFour: "cebuli",
		id: 3,
	},
	{
		question: "Jaką dyscypline uprawiał Tiger Woods?",
		answerOne: "piłkę nożną",
		answerTwo: "tenis",
		answerThree: "łucznictwo",
		answerFour: "golf",
		id: 4,
	},
	{
		question: "Którą epoką historyczną zajmuje się mediewistyka?",
		answerOne: "starożytnością",
		answerTwo: "średniowieczem",
		answerThree: "oświeceniem",
		answerFour: "prehistorią",
		id: 5,
	},
];

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);
	const [handleHeading, setHandleHeading] = useState(1);
	const [showSummary, setShowSummary] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);
	const [userScore, setUserScore] = useState(0);
	const [newQuestions, setNewQuestions] = useState(Questions);
	const [newCorrectAnswers, setNewCorrectAnswers] = useState(correctAnswers);
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
						question={newQuestions[changeQuestion].question}
						answerOne={newQuestions[changeQuestion].answerOne}
						answerTwo={newQuestions[changeQuestion].answerTwo}
						answerThree={newQuestions[changeQuestion].answerThree}
						answerFour={newQuestions[changeQuestion].answerFour}
						onClick={nextQuestion}
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
