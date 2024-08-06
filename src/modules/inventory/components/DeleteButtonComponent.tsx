import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deleteItem } from '../Api-Requests/genericRequests';
import { IComponent } from "../interfaces/IComponent";
import { deleteComponent } from '../features/component/componentSlice';
import { useTranslation } from "react-i18next";

const DeleteButton: React.FunctionComponent<{ componentDetails: IComponent }> = ({ componentDetails }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleClickDelete = async () => {
        if (!componentDetails.id) {
            console.error(t("Component ID is not defined"));
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
            <IconButton aria-label={t("delete component")} onClick={handleClickDelete}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default DeleteButton;
