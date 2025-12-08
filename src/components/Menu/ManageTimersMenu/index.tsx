import "./_index.scss";
import { useState, useId, Activity } from "react";
import Menu from "..";
import { useMenus } from "../../../store/menuStore";
import { useTimers, type Timer } from "../../../store/timerStore"; 
import Input from "../../Input";
import Button from "../../Button";
import { Edit, Check, Delete, Add } from "@mui/icons-material";

interface TimerInputFieldsProps {
    timerData: Timer
}

export default function ManageTimersMenu() {
    const isOpen = useMenus(state => state.manageTimers);
    const timers = useTimers(state => state.timers);
    const addTimer = useTimers(state => state.addTimer);

    return (
        <Menu 
            title="Manage Timers" 
            open={isOpen}
            className="manage-timers-menu"
        >
            {timers.map(timer => (
                <div 
                    key={timer.id}
                    className="menu-item"
                >
                    <TimerInputFields 
                        timerData={timer} 
                    />
                </div>
            ))}

            <Button 
                buttonStyle="secondary"
                className="add-timer-button"
                onClick={() => addTimer({ id: crypto.randomUUID(), utcOffset: 0, label: "" })}
                aria-label="add timer button"
            >
                <Add className="add-icon" />
            </Button>
        </Menu>
    );
}

function TimerInputFields({ timerData }: TimerInputFieldsProps) {
    const editTimer = useTimers(state => state.editTimer);
    const deleteTimer = useTimers(state => state.deleteTimer);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [data, setData] = useState<Timer>(timerData);

    const utcInputId = useId();
    const labelInputId = useId();

    const startEditing = () => {
        setIsEditing(true);
    }

    const finishEditing = () => {
        if (!data.utcOffset && data.utcOffset !== 0) return;
        
        setIsEditing(false);
        editTimer(data.id, data);
    }

    return (
        <>
            <div>
                <label htmlFor={utcInputId}>
                    UTC
                </label>

                <Input 
                    id={utcInputId}
                    type="number"
                    className="utc-input"
                    readOnly={!isEditing}
                    defaultValue={!isNaN(data.utcOffset) ? data.utcOffset : ""}
                    required
                    aria-required="true"
                    invalidMessage="UTC Required"
                    placeholder="UTC"
                    onChange={event => setData(prevData => ({ ...prevData, utcOffset: event.target.valueAsNumber }))}
                />
            </div>
            <div>
                <label htmlFor={labelInputId}>
                    Label
                </label>

                <Input 
                    id={labelInputId}
                    readOnly={!isEditing}
                    defaultValue={data.label}
                    placeholder="Label"
                    onChange={event => setData(prevData => ({ ...prevData, label: event.target.value }))}
                />
            </div>
            <div className="timer-buttons">
                <Activity mode={ isEditing ? "visible" : "hidden" }>
                    <Button
                        buttonStyle="success"
                        icon
                        onClick={() => finishEditing()}
                        aria-label="finish editing timer button"
                    >
                        <Check />
                    </Button>
                </Activity>
                <Activity mode={ !isEditing ? "visible" : "hidden" }>
                    <Button
                        buttonStyle="secondary"
                        icon
                        onClick={() => startEditing()}
                        aria-label="edit timer button"
                    >
                        <Edit />
                    </Button>
                </Activity>
                <Button
                    buttonStyle="danger"
                    icon
                    onClick={() => deleteTimer(data.id)}
                    aria-label="delete timer button"
                >
                    <Delete />
                </Button>
            </div>
        </>
    );
}