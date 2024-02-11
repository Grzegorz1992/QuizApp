import styles from "./Question.module.css";

export function Question({
	question,
	answerOne,
	answerTwo,
	answerThree,
	answerFour,
}) {
	return (
		<div className={styles.container}>
			<h2>Pytanie 1 z 5</h2>
			<p> {question}</p>
			<div className={styles.answersBox}>
				<button>{answerOne}</button>
				<button>{answerTwo}</button>
				<button>{answerThree}</button>
				<button>{answerFour}</button>
			</div>
		</div>
	);
}
