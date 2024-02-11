import styles from "./Question.module.css";

export function Question({
	question,
	answerOne,
	answerTwo,
	answerThree,
	answerFour,
	onClick,
	heading,
}) {
	return (
		<div className={styles.container}>
			<h2>{heading}</h2>
			<p> {question}</p>
			<div className={styles.answersBox}>
				<button onClick={onClick}>{answerOne}</button>
				<button onClick={onClick}>{answerTwo}</button>
				<button onClick={onClick}>{answerThree}</button>
				<button onClick={onClick}>{answerFour}</button>
			</div>
		</div>
	);
}
