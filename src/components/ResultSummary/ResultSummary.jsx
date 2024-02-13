import styles from "./ResultSummary.module.css";
// import { Summary } from "../Summary/Summary";
// import { Questions } from "../../utils/Questions";

export function ResultSummary({score}) {
	return (
		<div className={styles.container}>
			<h2>Podsumowanie</h2>
			<p>Twój wynik to: {score}</p>

			

			{/* <Summary
				question={Questions[0].question}
				className={
					userAnswers[0] === correctAnswers[0]
						? styles.correctAnswer
						: styles.wrongAnswer
						
				}
				userAnswers={userAnswers[0]}
				correctAnswers={correctAnswers[0]}
			/>
			<Summary
				question={Questions[1].question}
				className={
					userAnswers[1] === correctAnswers[1]
						? styles.correctAnswer
						: styles.wrongAnswer
				}
				userAnswers={userAnswers[1]}
				correctAnswers={correctAnswers[1]}
			/>
			<Summary
				question={Questions[2].question}
				className={
					userAnswers[2] === correctAnswers[2]
						? styles.correctAnswer
						: styles.wrongAnswer
				}
				userAnswers={userAnswers[2]}
				correctAnswers={correctAnswers[2]}
			/>
			<Summary
				question={Questions[3].question}
				className={
					userAnswers[3] === correctAnswers[3]
						? styles.correctAnswer
						: styles.wrongAnswer
				}
				userAnswers={userAnswers[3]}
				correctAnswers={correctAnswers[3]}
			/>
			<Summary
				question={Questions[4].question}
				className={
					userAnswers[4] === correctAnswers[4]
						? styles.correctAnswer
						: styles.wrongAnswer
				}
				userAnswers={userAnswers[4]}
				correctAnswers={correctAnswers[4]}
			/> */}
		</div>
	);
}
