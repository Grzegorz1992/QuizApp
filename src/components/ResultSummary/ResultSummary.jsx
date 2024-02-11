import styles from "./ResultSummary.module.css";

export function ResultSummary({ userAnswers, className }) {
	return (
		<div className={styles.container}>
			<h2>Podsumowanie</h2>
			<p>Twój wynik to:</p>
			<div className={styles.summary}>
				<p>Pytanie 1: Co jest głównym składnikiem risotto?</p>
				<p className={className}> Twoja odpowiedź: {userAnswers[0]}</p>
				<p>
					Poprawna odpowiedź: <span className={styles.correctAnswer}>ryż</span>
				</p>
			</div>
			<div className={styles.summary}>
				<p>Pytanie 2: Co jest głównym składnikiem ziemskiej atmosfery?</p>
				<p className={className}> Twoja odpowiedź: {userAnswers[1]}</p>
				<p>
					Poprawna odpowiedź: <span className={styles.correctAnswer}>azot</span>
				</p>
			</div>
			<div className={styles.summary}>
				<p>Pytanie 3: Hokkaido to jedna z popularnych odmian?</p>
				<p className={className}> Twoja odpowiedź: {userAnswers[2]}</p>
				<p>
					Poprawna odpowiedź: <span className={styles.correctAnswer}>dyni</span>
				</p>
			</div>
			<div className={styles.summary}>
				<p>Pytanie 4: Jaką dyscypline uprawiał Tiger Woods?</p>
				<p className={className}> Twoja odpowiedź: {userAnswers[3]}</p>
				<p>
					Poprawna odpowiedź: <span className={styles.correctAnswer}>golf</span>
				</p>
			</div>
			<div className={styles.summary}>
				<p>Pytanie 5: Którą epoką historyczną zajmuje się mediewistyka?</p>
				<p className={className}> Twoja odpowiedź: {userAnswers[4]}</p>
				<p>
					Poprawna odpowiedź:{" "}
					<span className={styles.correctAnswer}>średniowieczem</span>
				</p>
			</div>
		</div>
	);
}
