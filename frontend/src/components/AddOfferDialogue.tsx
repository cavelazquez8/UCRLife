import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { OfferInput } from "../network/offers_api";
import * as OffersApi from "../network/offers_api";
import { Offer } from "../models/offers";
import TextInput from "./form/TextInput";


interface AddOfferDialogProps {
    offerToEdit?: Offer,
    onDismiss: () => void,
    onOfferSaved: (offer: Offer) => void,
}

const AddOfferDialogue = ({offerToEdit, onDismiss, onOfferSaved }: AddOfferDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OfferInput>({
        defaultValues: {
            title: offerToEdit?.title || "",
            price: offerToEdit?.price || 0,
            description: offerToEdit?.description || "",
        }
    });

    async function onSubmit(input: OfferInput) {
        try {
            let offerResponse: Offer;
            if (offerToEdit) {
                offerResponse = await OffersApi.updateOffer(offerToEdit._id, input);
            } else {
                offerResponse = await OffersApi.createOffer(input);
            }
            onOfferSaved(offerResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (  
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                {offerToEdit ? "Edit offer" : "Add offer"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addOfferForm" onSubmit={handleSubmit(onSubmit)}>

                <TextInput
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

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