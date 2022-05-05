const Tab = ({active, onClick, children}) => {
    return (
        <li className={"nav-item"}>
        <button className={`nav-link ${active && "active"}`} onClick={onClick}>{children}</button>
        </li>
    );
}

export default Tab;