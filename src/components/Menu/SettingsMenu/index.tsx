import "./_index.scss";
import Menu from "..";
import { useMenus } from "../../../store/menuStore";
import { useSettings } from "../../../store/settingsStore";
import Button from "../../Button";
import ButtonToggle from "../../ButtonToggle";
import Checkbox from "../../Checkbox";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function SettingsMenu() {
    const isOpen = useMenus(state => state.settings);
    const openMenu = useMenus(state => state.openMenu);

    const theme = useSettings(state => state.theme);
    const showTimers = useSettings(state => state.showTimers);
    const setTheme = useSettings(state => state.setTheme);
    const toggleShowTimers = useSettings(state => state.toggleShowTimers);

    return (
        <Menu 
            title="Settings"
            open={isOpen}
            className="settings-menu"
        >
            <div className="menu-item">
                <label>Theme</label>

                <ButtonToggle buttonStyle="secondary">
                    <ButtonToggle.Button
                        selected={theme === "dark"}
                        icon
                        onClick={() => setTheme("dark")}
                        aria-label="dark mode button"
                    >
                        <DarkMode />
                    </ButtonToggle.Button>
                    <ButtonToggle.Button
                        selected={theme === "light"}
                        icon
                        onClick={() => setTheme("light")}
                        aria-label="light mode button"
                    >
                        <LightMode />
                    </ButtonToggle.Button>
                </ButtonToggle>
            </div>

            <div className="menu-item">
                <label htmlFor="showTimersCheckbox" style={{ cursor: "pointer" }}>
                    Show Timers
                </label>

                <Checkbox 
                    id="showTimersCheckbox"
                    defaultChecked={showTimers}
                    onClick={() => toggleShowTimers()}
                />
            </div>

            <div className="menu-item">
                <Button
                    buttonStyle="secondary"
                    onClick={() => openMenu("manageTimers")}
                >
                    Manage Timers
                </Button>
            </div>
        </Menu>
    );
}