import "./_index.scss";
import Menu from "..";
import { useMenus } from "../../../store/menuStore";

export default function ManageTimersMenu() {
    const isOpen = useMenus(state => state.manageTimers);

    return (
        <Menu 
            title="Manage Timers" 
            open={isOpen}
        >
            manage Timers
        </Menu>
    );
}