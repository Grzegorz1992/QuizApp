import { useState } from "react";
import { Question } from "./components/Question/Question";
import { Questions } from "./utils/Questions";
import styles from "./App.module.css";
import { ResultSummary } from "./components/ResultSummary/ResultSummary";

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);
	const [handleHeading, setHandleHeading] = useState(1);
	const [showSummary, setShowSummary] = useState(false);

	function nextQuestion() {
		setChangeQuestion((prevQuestion) => prevQuestion + 1);
		setHandleHeading((prevHeading) => prevHeading + 1);

		if (handleHeading === 5) {
			setShowSummary(true);
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
				{showSummary && <ResultSummary />}
			</div>
		</>
	);
}

export default App;
