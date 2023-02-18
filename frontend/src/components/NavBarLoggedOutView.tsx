import {Button} from "react-bootstrap";

interface loggedOutViewComponents{
    onSignUpOption: ()=> void,
    onLoginOption: () => void,
}

const NavBarLoggedOutView = ({onSignUpOption,onLoginOption}:loggedOutViewComponents)=>{
    
    return (
        <>
            <Button onClick={onSignUpOption}>Sign Up</Button>
            <Button onClick={onLoginOption}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;