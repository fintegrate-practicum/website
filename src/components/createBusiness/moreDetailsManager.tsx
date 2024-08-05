import React from 'react';
import { updateBusiness } from '../../Redux/businessSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import FormWrapper from '../../stories/FormWrapper';
import { FieldValues } from 'react-hook-form';
import { BusinessSize} from '../../classes/Business';

export default function MoreDetailsManager(): JSX.Element {
    const companyNumber = useAppSelector((state) => state.businessSlice.business.companyNumber);
    const dispatch = useAppDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result, "");
                if (typeof reader.result === 'string') {
                    setValue('logo', reader.result, { shouldValidate: true });
                }
            };
            reader.readAsDataURL(file);
        }
    }

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
        <FormWrapper onSubmit={onSubmit} fields={fields} formWidth='medium'/>
    );
}



