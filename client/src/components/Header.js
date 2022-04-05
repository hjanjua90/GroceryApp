import {Link} from "react-router-dom";




const Header = (props)=>{

    const {nameText, link, linkText} = props;


    return(
        <header>
            <h1 style={{
                fontSize: "50px", borderBottom: "5px double lightgray",
                marginLeft: "450px", marginRight: "450px"
            }}>
                {nameText}
            </h1>
            <Link to={link}>{linkText}</Link>
        </header>
    )
}




export default Header;