import { useState } from "react";
import { Question } from "./components/Question/Question";
import { Questions } from "./utils/Questions";
import styles from "./App.module.css";

function App() {
	const [changeQuestion, setChangeQuestion] = useState(0);

	function nextQuestion() {
		setChangeQuestion((prevQuestion) => prevQuestion + 1);

		if (changeQuestion === 4) {
			setChangeQuestion(0);
		}
	}

	return (
		<>
			<div className={styles.container}>
				<Question
					question={Questions[changeQuestion].question}
					answerOne={Questions[changeQuestion].answerOne}
					answerTwo={Questions[changeQuestion].answerTwo}
					answerThree={Questions[changeQuestion].answerThree}
					answerFour={Questions[changeQuestion].answerFour}
				/>
			</div>

			<button onClick={nextQuestion}>kupa</button>
		</>
	);
}

export default App;
