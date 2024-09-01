import React from 'react';
import { updateBusiness } from '../../Redux/businessSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import FormWrapper from '../../stories/FormWrapper';
import { FieldValues } from 'react-hook-form';
import { BusinessSize } from '../../classes/Business';
import { useTranslation } from 'react-i18next';

export default function MoreDetailsManager(): JSX.Element {
  const companyNumber = useAppSelector(
    (state) => state.businessSlice.business.companyNumber,
  );
  const dispatch = useAppDispatch();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: any,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result, '');
        if (typeof reader.result === 'string') {
          setValue('logo', reader.result, { shouldValidate: true });
        }
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
      logo:
        typeof values.logo === 'string'
          ? values.logo.replace(/^data:image\/[a-z]+;base64,/, '')
          : undefined,
    };
    console.log(newData, "newData'");
    console.log(values, "values'");

    dispatch(updateBusiness({ companyNumber, newData }));
  };

  const { t } = useTranslation();

  const fields = [
    { name: 'description', label: t('website.Description'), type: 'text' },
    { name: 'phone', label: t('website.Phone'), type: 'text' },
    { name: 'address', label: t('website.Address'), type: 'text' },
    {
      name: 'businessSize',
      label: t('website.Business Size'),
      type: 'select',
      options: Object.values(BusinessSize),
    },
    {
      name: 'industryType',
      label: t('website.Industry Type'),
      type: 'select',
      options: ['service provider', 'gives a product'],
    },
    {
      name: 'logo',
      label: t('website.Logo'),
      type: 'file',
      onChange: (e: React.ChangeEvent<HTMLInputElement>, setValue: any) =>
        handleFileChange(e, setValue),
    },
  ];

  return <FormWrapper onSubmit={onSubmit} fields={fields} />;
}
