import {User} from "../models/user"
import * as UserApi from "../network/user_api";
import { Navbar,Button } from "react-bootstrap";

interface loggedInViewComponents{
    user: User,
    onLogout: () => void,
}

const NavBarLoggedInView = ({user,onLogout}:loggedInViewComponents)=>{
    async function logout(){
        try{
            await UserApi.logoutUser();
            onLogout();
        }
        catch(error){
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Log Out</Button>
        </>
    );
}

export default NavBarLoggedInView;