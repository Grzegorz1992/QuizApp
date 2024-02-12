import styles from "./Form.module.css";

export function Form() {
	return (
		<form className={styles.form}>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="question">Pytanie:</label>
				</div>
				<input type="text" name="question" />
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerOne">Odpowiedź nr 1:</label>
				</div>
				<input type="text" name="answerOne" />
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerTwo">Odpowiedź nr 2:</label>
				</div>
				<input type="text" name="answerTwo" />
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerThree">Odpowiedź nr 3:</label>
				</div>
				<input type="text" name="answerThree" />
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="answerFour">Odpowiedź nr 4:</label>
				</div>
				<input type="text" name="answerFour" />
			</div>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="correctAnswer">Poprawna odpowiedź:</label>
				</div>
				<input type="text" name="correctAnswer" />
			</div>
            <button className={styles.saveForm}>Zapisz</button>
		</form>
	);
}
