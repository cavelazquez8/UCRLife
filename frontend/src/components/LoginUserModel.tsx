import {useForm} from "react-hook-form"; 
import {User} from "../models/user";
import {LoginInfo} from "../network/user_api";
import * as UserApi from "../network/user_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInput from "./form/TextInput";
import style from "../styles/utils.module.css"

interface LoginModelComponent{
    onDismiss: () => void;
    onSuccessLogin: (user: User) => void;
}

const LoginUserModel = ({onDismiss,onSuccessLogin}: LoginModelComponent) => {
    const {register, handleSubmit,formState: {errors,isSubmitting}} = useForm<LoginInfo>();

    async function onSubmit(userLogin:LoginInfo) {
        try{
            const newUser = await UserApi.userLogin(userLogin);
            onSuccessLogin(newUser);
        }
        catch(error){
            alert(error);
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name = "email"
                    label = "Email"
                    type = "email"
                    placeholder = "Email"
                    register = {register}
                    registerOptions = {{required: "Required"}}
                    error = {errors.email}
                    />
                
                <TextInput
                    name = "password"
                    label = "Password"
                    type = "password"
                    placeholder = "Password"
                    register = {register}
                    registerOptions = {{required: "Required"}}
                    error={errors.password}
                    />

                    <Button
                        type = "submit"
                        disabled = {isSubmitting} 
                        className = {style.width}>
                            Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        );
}

export default LoginUserModel;