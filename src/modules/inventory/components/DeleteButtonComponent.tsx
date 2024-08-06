import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deleteItem } from '../Api-Requests/genericRequests';
import { IComponent } from '../interfaces/IComponent';
import { deleteComponent } from '../features/component/componentSlice';

const deleteButton: React.FunctionComponent<{
	componentDetails: IComponent;
}> = ({ componentDetails }) => {
	const dispatch = useDispatch();
	const handleClickDelete = async () => {
		if (!componentDetails.id) {
			console.error('Component ID is not defined');
			return;
		}

		try {
			await deleteItem<IComponent>('component', componentDetails.id);
			dispatch(deleteComponent(componentDetails.id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<IconButton aria-label='delete component' onClick={handleClickDelete}>
				<DeleteIcon />
			</IconButton>
		</>
	);
};
export default deleteButton;
