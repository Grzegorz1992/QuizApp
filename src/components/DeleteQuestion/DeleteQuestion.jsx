import { useState } from "react";
import styles from "./DeleteQuestion.module.css";
import { deleteDoc, doc, getDocs, collection } from "firebase/firestore";

export function DeleteQuestion({ onClick, db, onDelete }) {
	const [inputValue, setInputValue] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const questionToDelete = inputValue.trim();

		if (questionToDelete) {
			try {
				const querySnapshot = await getDocs(collection(db, "QuizzApp"));
				const docToDelete = querySnapshot.docs.find(
					(doc) => doc.data().question === questionToDelete
				);
				if (docToDelete) {
					await deleteDoc(doc(db, "QuizzApp", docToDelete.id));
					onDelete(docToDelete.id);
				} else {
					alert("Nie znaleziono pytania o podanej treści.");
				}
			} catch (error) {
				console.error("Błąd podczas usuwania pytania:", error);
				alert("Wystąpił błąd podczas usuwania pytania.");
			}

			setInputValue("");
		}
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
				disabled={inputValue.trim() === ""}
				className={styles.saveForm}
				type="submit"
			>
				Zapisz
			</button>
		</form>
	);
}
