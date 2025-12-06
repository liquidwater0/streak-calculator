import "./scss/App.scss";
import { useState, useEffect, Activity } from "react";
import { addDays, subDays, differenceInDays } from "date-fns";
import Button from "./components/Button";
import ButtonToggle from "./components/ButtonToggle";
import Input from "./components/Input";
import Timer from "./components/Timer";
import AllMenus from "./components/Menu/AllMenus";
import { Whatshot, Settings } from "@mui/icons-material";
import { useMenus } from "./store/menuStore";
import { useSettings } from "./store/settingsStore";
import { useTimers } from "./store/timerStore";
import { DEFAULT_MODE } from "./constants";

type DesiredDate = { 
	month: number | undefined, 
	day: number | undefined, 
	year: number | undefined 
};

function App() {
	const openMenu = useMenus(state => state.openMenu);
	const theme = useSettings(state => state.theme);
	const showTimers = useSettings(state => state.showTimers);
	const timers = useTimers(state => state.timers);

	const [mode, setMode] = useState<"streak" | "date">(DEFAULT_MODE);

	const [hasClaimedStreakToday, setHasClaimedStreakToday] = useState<boolean>(false);
	const [currentStreak, setCurrentStreak] = useState<number | undefined>(undefined);
	const [desiredStreak, setDesiredStreak] = useState<number | undefined>(undefined);
	const [desiredDate, setDesiredDate] = useState<DesiredDate>({ month: undefined, day: undefined, year: undefined });

	const [startedOn, setStartedOn] = useState<string>("");
	const [expectedOn, setExpectedOn] = useState<string>("");
	const [expectedStreak, setExpectedStreak] = useState<number>();

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	function calculate() {
		const currentStreakInputed = currentStreak !== null && currentStreak !== undefined && !isNaN(currentStreak);
		const desiredStreakInputed = desiredStreak !== null && desiredStreak !== undefined && !isNaN(desiredStreak);

		const anyDateModeValueEmpty = !currentStreakInputed || !desiredStreakInputed;
		const anyStreakModeValueEmpty = !currentStreakInputed || !desiredDate.month || !desiredDate.day || !desiredDate.year;

		const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const now = new Date();

		const calculateStartedDate = () => {
			if (!currentStreakInputed) return;

			const startDate = subDays(now, currentStreak + (hasClaimedStreakToday ? 0 : 1));
			const startMonth = startDate.getMonth();
			const startDay = startDate.getDate();
			const startYear = startDate.getFullYear();

			setStartedOn(`${MONTHS[startMonth]} ${startDay}, ${startYear}`);
		}

		if (mode === "date" && anyDateModeValueEmpty) {
			setStartedOn("");
			setExpectedOn("");
		}

		if (mode === "streak" && anyStreakModeValueEmpty) {
			setStartedOn("");
			setExpectedStreak(undefined);
		}

		if (mode === "date" && !anyDateModeValueEmpty) {
			calculateStartedDate();

			const expectedDate = addDays(now, (desiredStreak! - currentStreak!) - (hasClaimedStreakToday ? 0 : 1));
			const expectedMonth = expectedDate.getMonth();
			const expectedDay = expectedDate.getDate();
			const expectedYear = expectedDate.getFullYear();

			setExpectedOn(`${MONTHS[expectedMonth]} ${expectedDay}, ${expectedYear}`);
		}

		if (mode === "streak" && !anyStreakModeValueEmpty) {
			calculateStartedDate();
			
			const date = new Date(desiredDate.year!, desiredDate.month! - 1, desiredDate.day);
			const streak = (differenceInDays(date, subDays(now, currentStreak!)) + 1) + (hasClaimedStreakToday ? 0 : 1);

			setExpectedStreak(streak);
		}
	}

	return (
		<>
			<AllMenus />

			<header className="header">
				<h1 className="title">
					<Whatshot 
						className="fire-icon"
						aria-hidden="true" 
					/>
					<span>Streak Calculator</span>
				</h1>

				<ButtonToggle buttonStyle="primary" className="mode-buttons">
					<ButtonToggle.Button 
						selected={mode === "streak"}
						onClick={() => setMode("streak")}
						aria-pressed={mode === "streak"}
					>
						Streak
					</ButtonToggle.Button>
					<ButtonToggle.Button 
						selected={mode === "date"}
						onClick={() => setMode("date")}
						aria-pressed={mode === "date"}
					>
						Date
					</ButtonToggle.Button>
				</ButtonToggle>

				<Button
					buttonStyle="floating"
					icon
					className="settings-button"
					onClick={() => openMenu("settings")}
					aria-label="settings menu button"
				>
					<Settings />
				</Button>
			</header>

			<main className="main">
				<div className="calculations-container">
					<form 
						id="calculations-form"
						className="calculation-inputs"
						onSubmit={event => {
							event.preventDefault();
							calculate();
						}}
					>
						<div className="calculation-item">
							<label 
								className="calculation-item-label"
								htmlFor="currentStreakInput"
							>
								Current Streak
							</label>
							<Input 
								id="currentStreakInput"
								className="calculation-input"
								type="number"
								defaultValue={currentStreak}
								onChange={event => {
									const value = event.target.valueAsNumber;
									setCurrentStreak(value || value === 0 ? value : undefined);
								}}
							/>
						</div>

						<Activity mode={ mode === "date" ? "visible" : "hidden" }>
							<div className="calculation-item">
								<label 
									className="calculation-item-label"
									htmlFor="desiredStreakInput"
								>
									Desired Streak
								</label>
								<Input 
									id="desiredStreakInput"
									className="calculation-input"
									type="number"
									defaultValue={desiredStreak}
									onChange={event => {
										const value = event.target.valueAsNumber;
										setDesiredStreak(value || value === 0 ? value : undefined);
									}}
								/>
							</div>
						</Activity>

						<Activity mode={ mode === "streak" ? "visible" : "hidden" }>
							<div className="calculation-item">
								<label 
									className="calculation-item-label"
									htmlFor="monthInput"
								>
									Desired Date
								</label>
								<div className="date-inputs">
									<Input 
										id="monthInput"
										className="calculation-input"
										type="number"
										placeholder="MM"
										defaultValue={desiredDate.month}
										onChange={event => {
											setDesiredDate(current => {
												const value = event.target.valueAsNumber;
												return { ...current, month: value || undefined };
											});
										}}
									/>
									<Input
										className="calculation-input"
										type="number"
										placeholder="DD"
										defaultValue={desiredDate.day}
										onChange={event => {
											setDesiredDate(current => {
												const value = event.target.valueAsNumber;
												return { ...current, day: value || undefined };
											});
										}}
									/>
									<Input 
										className="calculation-input"
										type="number"
										placeholder="YYYY"
										defaultValue={desiredDate.year}
										onChange={event => {
											setDesiredDate(current => {
												const value = event.target.valueAsNumber;
												return { ...current, year: value || undefined };
											});
										}}
									/>
								</div>
							</div>
						</Activity>

						<div className="calculation-item">
							<label className="calculation-item-label">
								Claimed Your Streak Today?
							</label>
							<ButtonToggle buttonStyle="primary">
								<ButtonToggle.Button
									selected={hasClaimedStreakToday}
									onClick={() => setHasClaimedStreakToday(true)}
									type="button"
									aria-pressed={hasClaimedStreakToday}
								>
									Yes
								</ButtonToggle.Button>
								<ButtonToggle.Button
									selected={!hasClaimedStreakToday}
									onClick={() => setHasClaimedStreakToday(false)}
									type="button"
									aria-pressed={!hasClaimedStreakToday}
								>
									No
								</ButtonToggle.Button>
							</ButtonToggle>
						</div>
					</form>

					<div className="calculation-results">
						<div className="result-item">
							<label className="result-item-label">
								Started On
							</label>
							<p className="result">
								{ startedOn }
							</p>
						</div>

						<Activity mode={ mode === "streak" ? "visible" : "hidden" }>
							<div className="result-item">
								<label className="result-item-label">
									Expected Streak
								</label>
								<p className="result">
									<Whatshot className="fire-icon"/>
									{ expectedStreak }
								</p>
							</div>
						</Activity>

						<Activity mode={ mode === "date" ? "visible" : "hidden" }>
							<div className="result-item">
								<label className="result-item-label">
									Expected Date
								</label>
								<p className="result">
									{ expectedOn }
								</p>
							</div>
						</Activity>
					</div>
				</div>

				<div className="button-bar">
					<Button 
						buttonStyle="primary"
						type="submit"
						form="calculations-form"
						className="calculate-button"
					>
						Calculate
					</Button>
				</div>
			</main>

			<footer className="footer">
				{timers.map(({ id, utcOffset, label }) => (
					<Activity 
						mode={showTimers ? "visible" : "hidden"}
						key={id}
					>
						<Timer 
							utcOffset={utcOffset}
							label={label}
						/>
					</Activity>
				))}
			</footer>
		</>
	);
}

export default App;