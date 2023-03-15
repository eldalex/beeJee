import logo from "../../img/logo.png"
import {useSelector} from "react-redux";
const Header = () => {
    const {currentUser} = useSelector(state => state)
    return (
        <div className="text-center">
            <img
                src={logo}
                width="200"
                className="img-thumbnail"
                style={{marginTop: "20px"}}
                alt="logo"
            />
            <hr/>
            <h1>Простенький To Do List. Добро пожаловать! {currentUser}</h1>
        </div>)
}

export default Header;