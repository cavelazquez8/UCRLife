import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { OfferInput } from '../network/offers_api';
import * as OffersApi from '../network/offers_api';
import { Offer } from '../models/offers';
import TextInput from './form/TextInput';
import { useEffect, useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as UserApi from '../network/user_api';
import { User } from '../models/user';

interface AddOfferDialogProps {
	offerToEdit?: Offer;
	onDismiss: () => void;
	onOfferSaved: (offer: Offer) => void;
}

const AddOfferDialogue = ({
	offerToEdit,
	onDismiss,
	onOfferSaved,
}: AddOfferDialogProps) => {
	const [file, setFile] = useState<File | null>(null);
	const [userLoggedIn, setLoggedInUser] = useState<User | null>(null);
	const [imageUrl, setImageUrl] = useState('');
	const [messg, setMessg] = useState('');
	const [progressUpload, setProgressUpload] = useState(0);
	const [category, setCategory] = useState('');

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLogIn();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			setFile(files[0]);
		}
	};

	const handleUploadFile = () => {
		if (file) {
			const name = new Date().getTime() + file.name;
			const storageRef = ref(storage, `image/${name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

					setProgressUpload(progress); // to show progress upload
					setMessg('Uploading...');

					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							console.log({ progressUpload });
							break;
					}
				},
				(error) => {},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						//url is download url of file
						setImageUrl(url);
						setMessg('Image uploaded');
					});
				}
			);
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<OfferInput>({
		defaultValues: {
			title: offerToEdit?.title || '',
			username: offerToEdit?.username || '',
			price: offerToEdit?.price || undefined,
			description: offerToEdit?.description || '',
			imgURL: offerToEdit?.imgURL || '',
			category: offerToEdit?.categogry || '',
		},
	});

	async function onSubmit(input: OfferInput) {
		try {
			let offerResponse: Offer;
			input.imgURL = offerToEdit?.imgURL || imageUrl;
			input.category = offerToEdit?.categogry || category;
			input.username = offerToEdit?.username || userLoggedIn?.username;

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
				<Modal.Title>{offerToEdit ? 'Edit offer' : 'Add offer'}</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form id='addOfferForm' onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						name='title'
						label='Title'
						type='text'
						placeholder='Title'
						register={register}
						registerOptions={{ required: 'Required' }}
						error={errors.title}
					/>

					<Form.Group>
						<Form.Label> Upload Image &nbsp; </Form.Label>
						<input type='file' onChange={handleFileChange} />
						<Button onClick={handleUploadFile}> Upload </Button>
						<p>{messg}</p>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label> Price </Form.Label>
						<Form.Control
							type='text'
							placeholder='Price'
							isInvalid={!!errors.price}
							{...register('price', { required: 'Required' })}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.price?.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className='mb-3'>
						<label>
							Category:&nbsp;
							<select
								value={category}
								onChange={(event) => setCategory(event.target.value)}
							>
								<option value=''>Select a category</option>
								<option value='electronics'>Electronics</option>
								<option value='books'>Books</option>
								<option value='transport'>Transport</option>
								<option value='misc'>Misc</option>
							</select>
						</label>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label> Description </Form.Label>
						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Description'
							{...register('description')}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button type='submit' form='addOfferForm' disabled={isSubmitting}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddOfferDialogue;
