
import React from 'react';
import { updateBusiness } from '../../Redux/businessSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { BusinessSize } from '../../classes/Business';
import FormWrapper from '../../stories/FormWrapper';
import { FieldValues } from 'react-hook-form';

export default function MoreDetailsManager(): JSX.Element {
    const companyNumber = useAppSelector((state) => state.businessSlice.business.companyNumber);
    const dispatch = useAppDispatch();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
        const file = e.target.files?.[0];
        const maxSize = 5 * 1024 * 1024; // גודל מקסימלי 5MB
        if (file) {
            if (file.size > maxSize) {
                alert("הקובץ גדול מדי. יש להעלות קובץ קטן יותר מ-5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // הגדרת מידות התמונה החדשה
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx?.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // דחיסת התמונה לפורמט JPEG

                    setValue('logo', dataUrl, { shouldValidate: true });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values: FieldValues) => {
        const newData = {
            description: values.description,
            phone: values.phone,
            address: values.address,
            businessSize: values.businessSize,
            industryType: values.industryType,
            logo: typeof values.logo === 'string' ? values.logo.replace(/^data:image\/[a-z]+;base64,/, '') : undefined,
        };
        console.log(newData, "newData'");
        console.log(values, "values'");

        dispatch(updateBusiness({ companyNumber, newData }));
    };

    const fields = [
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        {
            name: 'businessSize',
            label: 'Business Size',
            type: 'select',
            options: Object.values(BusinessSize),
        },
        {
            name: 'industryType',
            label: 'Industry Type',
            type: 'select',
            options: ['service provider', 'gives a product'],
        },
        {
            name: 'logo',
            label: 'Logo',
            type: 'file',
            onChange: (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => handleFileChange(e, setValue),
        },
    ];
    
    return (
        <FormWrapper onSubmit={onSubmit} fields={fields} />
    );
}


