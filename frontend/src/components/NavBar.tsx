import { Container,Navbar,Nav } from "react-bootstrap";
import {User} from "../models/user"
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";


interface NavBarComponents{
    userLoggedIn: User | null,
    onSignupOption: ()=> void,
    onLoginOption: ()=> void,
    onLogoutOption: ()=> void,

}
const NavBar = ({userLoggedIn, onSignupOption,onLoginOption,onLogoutOption}: NavBarComponents) =>{
    return (
        <Navbar bg = "primary" variant = "dark" expand = "lg" sticky = "top">
            <Container>
                <Navbar.Brand>
                    UCRList
                </Navbar.Brand>
                <Navbar.Toggle aria-controls = "main-navbar"/>
                <Navbar.Collapse id ="main-navbar">
                        <Nav className ="ms-auto">
                            {
                               userLoggedIn
                                ? <NavBarLoggedInView user ={userLoggedIn} onLogout={onLogoutOption}/>
                                : <NavBarLoggedOutView onLoginOption={onLoginOption} onSignUpOption={onSignupOption}/>

                            }
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;