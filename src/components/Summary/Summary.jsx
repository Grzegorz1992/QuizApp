import styles from "./Summary.module.css";

export function Summary({ className, userAnswer, correctAnswer, question }) {
	return (
		<div className={styles.summary}>
			<p>Pytanie: {question}</p>

			<p>
				{" "}
				Twoja odpowiedź: <span className={className}>{userAnswer}</span>
			</p>
			<p>
				Poprawna odpowiedź:{" "}
				<span className={styles.correctAnswer}>{correctAnswer}</span>
			</p>
		</div>
	);
}
