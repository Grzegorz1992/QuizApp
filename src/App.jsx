import { useState } from "react";
import { Question } from "./components/Question/Question";
import { Questions } from "./utils/Questions";
import styles from "./App.module.css";
import { ResultSummary } from "./components/ResultSummary/ResultSummary";

const correctAnswers = ["ryż", "azot", "dyni", "golf", "średniowieczem"];

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);
	const [handleHeading, setHandleHeading] = useState(1);
	const [showSummary, setShowSummary] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);
	const [userScore, setUserScore] = useState(0);

	function nextQuestion(e) {
		const userAnswer = e.target.textContent;
		setUserAnswers((prevUserAnswer) => [...prevUserAnswer, userAnswer]);
		setChangeQuestion((prevQuestion) => prevQuestion + 1);
		setHandleHeading((prevHeading) => prevHeading + 1);

		if (handleHeading === 5) {
			setShowSummary(true);
		}

		const isCorrectAnswer = userAnswer === correctAnswers[changeQuestion];

		if (isCorrectAnswer) {
			setUserScore((prevScore) => prevScore + 1);
		}
	}

	return (
		<>
			<div className={styles.container}>
				{!showSummary && (
					<Question
						heading={`pytanie ${handleHeading} z 5`}
						question={Questions[changeQuestion].question}
						answerOne={Questions[changeQuestion].answerOne}
						answerTwo={Questions[changeQuestion].answerTwo}
						answerThree={Questions[changeQuestion].answerThree}
						answerFour={Questions[changeQuestion].answerFour}
						onClick={nextQuestion}
					/>
				)}
				{showSummary && (
					<ResultSummary
						userAnswers={userAnswers}
						correctAnswers={correctAnswers}
						score={userScore}
					/>
				)}
			</div>
		</>
	);
}

export default App;
