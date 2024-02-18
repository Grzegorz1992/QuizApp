import { useState } from "react";
import styles from "./DeleteQuestion.module.css";

export function DeleteQuestion({ onClick, onQuestionDelete }) {
	const [inputValue, setInputValue] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		const inputValue = inputValue;
		setInputValue("");

		onQuestionDelete(inputValue);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<button onClick={onClick} className={styles.closeFormbtn}>
				x
			</button>
			<div className={styles.formBox}>
				<div>
					<label htmlFor="question">Pytanie:</label>
				</div>
				<input
					type="text"
					name="question"
					id="question"
					value={inputValue}
					onChange={(event) => {
						setInputValue(event.target.value);
					}}
				/>
			</div>
			<button
				disabled={inputValue === ""}
				className={styles.saveForm}
				type="submit"
			>
				Zapisz
			</button>
		</form>
	);
}
