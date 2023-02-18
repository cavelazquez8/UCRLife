import { Form } from "react-bootstrap";
import {UseFormRegister, RegisterOptions, FieldError} from "react-hook-form";

interface TextInputComponent{
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}
const TextInput = ({name, label, register, registerOptions, error, ...props}: TextInputComponent) =>{
    return(
        <Form.Group className="mb-3" controlId = {name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
            {...props}
            {...register(name,registerOptions)}
            isInvalid = {!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>           
            
        </Form.Group>
    );

    
}

export default TextInput;