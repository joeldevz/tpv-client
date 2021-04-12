import { Icon } from "./Icon"
import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

export const BtnSubmit = ({ value, bg, icon, hoverBg }) => {
    bg = bg === undefined ? 'indigo-600' : bg
    hoverBg = hoverBg === undefined ? 'indigo-700' : hoverBg
    return (
        <button type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${bg} hover:bg-${hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bg}`}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                    icon === undefined ? '' : <Icon icon={icon} />
                }
            </span>
            {value}
        </button>
    )
}
export const Btn = ({ value, bg, onClick, icon, className }) => {

    return (
        <button onClick={onClick}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bg} ${className}`}>
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {
                    icon === undefined ? '' : <Icon icon={icon} />
                }
            </span>
            {value}
        </button>
    )
}
export const Btn2 = ({ value, children, onClick, className, }) => {
    return (
        <div onClick={onClick} className={`flex items-center p-4 rounded-lg transform hover:scale-105 shadow-xs border-2 font-bold cursor-pointer ${className}`}>
            {children}
            <div>
                <p className="text-sm font-medium ml-2 ">
                    {value}</p>

            </div>
        </div>)
}

export function SplitButton() {
    const options = [
        "Create a merge commit",
        "Squash and merge",
        "Rebase and merge"
    ];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <ButtonGroup
                variant="contained"
                color="primary"
                ref={anchorRef}
                aria-label="split button"
                className="z-50"

            >
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    color="primary"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose} >
                                <MenuList id="split-button-menu" >
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
