import styles from "./Question.module.css";

export function Question({
	question,
	answerOne,
	answerTwo,
	answerThree,
	answerFour,
	onClick,
	heading,
	disabled,
}) {
	return (
		<div className={styles.container}>
			<h2>{heading}</h2>
			<p> {question}</p>
			<div className={styles.answersBox}>
				<button disabled={disabled} onClick={onClick}>
					{answerOne}
				</button>
				<button disabled={disabled} onClick={onClick}>
					{answerTwo}
				</button>
				<button disabled={disabled} onClick={onClick}>
					{answerThree}
				</button>
				<button disabled={disabled} onClick={onClick}>
					{answerFour}
				</button>
			</div>
		</div>
	);
}
