import { useState } from "react";
import styles from "./Form.module.css";

export function Form({ onQuestionsSubmit }) {
	const [questionValue, setQuestionValue] = useState("");
	const [answerOneValue, setAnswerOneValue] = useState("");
	const [answerTwoValue, setAnswerTwoValue] = useState("");
	const [answerThreeValue, setAnswerThreeValue] = useState("");
	const [answerFourValue, setAnswerFourValue] = useState("");
	const [correctAnswerValue, setCorrectAnswerValue] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		const question = questionValue;
		const answerOne = answerOneValue;
		const answerTwo = answerTwoValue;
		const answerThree = answerThreeValue;
		const answerFour = answerFourValue;
		const correctAnswer = correctAnswerValue;

		setQuestionValue("");
		setAnswerOneValue("");
		setAnswerTwoValue("");
		setAnswerThreeValue("");
		setAnswerFourValue("");
		setCorrectAnswerValue("");

		onQuestionsSubmit(
			question,
			answerOne,
			answerTwo,
			answerThree,
			answerFour,
			correctAnswer
		);
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="question">Pytanie:</label>
				</div>
				<input
					type="text"
					name="question"
					id="question"
					value={questionValue}
					onChange={(event) => {
						setQuestionValue(event.target.value);
					}}
				/>
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerOne">Odpowiedź nr 1:</label>
				</div>
				<input
					type="text"
					name="answerOne"
					id="answerOne"
					value={answerOneValue}
					onChange={(event) => {
						setAnswerOneValue(event.target.value);
					}}
				/>
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerTwo">Odpowiedź nr 2:</label>
				</div>
				<input
					type="text"
					name="answerTwo"
					id="answerTwo"
					value={answerTwoValue}
					onChange={(event) => {
						setAnswerTwoValue(event.target.value);
					}}
				/>
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerThree">Odpowiedź nr 3:</label>
				</div>
				<input
					type="text"
					name="answerThree"
					id="answerThree"
					value={answerThreeValue}
					onChange={(event) => {
						setAnswerThreeValue(event.target.value);
					}}
				/>
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerFour">Odpowiedź nr 4:</label>
				</div>
				<input
					type="text"
					name="answerFour"
					id="answerFour"
					value={answerFourValue}
					onChange={(event) => {
						setAnswerFourValue(event.target.value);
					}}
				/>
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="correctAnswer">Poprawna odpowiedź:</label>
				</div>
				<input
					type="text"
					name="correctAnswer"
					id="correctAnswer"
					value={correctAnswerValue}
					onChange={(event) => {
						setCorrectAnswerValue(event.target.value);
					}}
				/>
			</div>
			<button className={styles.saveForm} type="submit">
				Zapisz
			</button>
		</form>
	);
}
