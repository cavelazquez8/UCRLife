import {useForm} from "react-hook-form"; 
import {User} from "../models/user";
import { SignUpData } from "../network/user_api";
import * as UserApi from "../network/user_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInput from "./form/TextInput";
import style from "../styles/utils.module.css"

interface SignUpComponent{
    onDismiss: () => void;
    onSuccessSignUp: (user: User) => void;
}

const SignUpModel = ({onDismiss,onSuccessSignUp}: SignUpComponent) => {
    const {register, handleSubmit,formState: {errors,isSubmitting}} = useForm<SignUpData>();
    async function onSubmit(newUserInfo:SignUpData) {
        try{
            const newUser = await UserApi.SignUpInfo(newUserInfo);
            onSuccessSignUp(newUser);
        }
        catch(error){
            alert(error);
            console.error(error);
        }
    }
    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        name = "username"
                        label = "Username"
                        type = "text"
                        placeholder = "Username"
                        register = {register}
                        registerOptions = {{required: "Required"}}
                        //error={errors.username}
                    />
                    <TextInput
                        name = "email"
                        label = "Email"
                        type = "email"
                        placeholder = "Email"
                        register = {register}
                        registerOptions = {{required: "Required"}}
                        //error={errors.email}
                    />
                    <TextInput
                        name = "password"
                        label = "Password"
                        type = "password"
                        placeholder = "Password"
                        register = {register}
                        registerOptions = {{required: "Required"}}
                        //error={errors.password}
                    />
                    <Button
                        type = "submit"
                        disabled = {isSubmitting} 
                        className = {style.width}>
                            Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModel;