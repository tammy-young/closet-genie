import "./../../App.css";

const GenieIcon = () => {
    return(
        <img className="app-logo" src={ process.env.NEXT_PUBLIC_BASE_URL + "genie-symbol.png"} alt="Genie"></img>
    );
}

export default GenieIcon;
