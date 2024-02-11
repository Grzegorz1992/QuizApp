import styles from "./Summary.module.css";

export function Summary({ className, userAnswers, correctAnswers, question }) {
	return (
		<div className={styles.summary}>
			<p>Pytanie: {question}</p>

			<p>
				{" "}
				Twoja odpowiedź: <span className={className}>{userAnswers}</span>
			</p>
			<p>
				Poprawna odpowiedź:{" "}
				<span className={styles.correctAnswer}>{correctAnswers}</span>
			</p>
		</div>
	);
}
