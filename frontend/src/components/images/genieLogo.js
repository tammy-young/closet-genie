import "../../App.css";

const GenieLogo = () => {
    return(
        <img className="app-logo sm:min-w-[150px] sm:!h-20 !h-16" src={ process.env.NEXT_PUBLIC_BASE_URL + "genie-logo.png"} alt="Genie"></img>
    );
}

export default GenieLogo;
