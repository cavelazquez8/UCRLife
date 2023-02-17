import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OfferInput } from "../network/offers_api";
import * as OffersApi from "../network/offers_api";
import { Offer } from "../models/offers";


interface AddOfferDialogProps {
    onDismiss: () => void,
    onOfferSaved: (offer: Offer) => void,
}

const AddOfferDialogue = ({onDismiss, onOfferSaved }: AddOfferDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OfferInput>();

    async function onSubmit(input: OfferInput) {
        try {
           
            const Response = await OffersApi.createOffer(input);
            onOfferSaved(Response);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (  
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Offer
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addOfferForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className = "mb-3">
                        <Form.Label> Title </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", {required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className = "mb-3">
                        <Form.Label> Price </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            isInvalid={!!errors.price}
                            {...register("price", {required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label> Description </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Description"
                            {...register("description")}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addOfferForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddOfferDialogue;