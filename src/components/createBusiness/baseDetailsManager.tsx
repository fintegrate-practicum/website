import TextField from '../../common/component/TextField/TextField';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { createBusiness, saveBusiness } from '../../Redux/businessSlice';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../stories/FormWrapper';
import { FieldValues } from 'react-hook-form';
import { BusinessSize } from '../../classes/Business';
import { useTranslation } from 'react-i18next';

export default function BaseDetailsManager(): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: FieldValues) => {
    const answer = await dispatch(
      createBusiness({
        companyNumber: values.companyNumber,
        name: values.name,
        email: values.email,
        description: '',
        logo: '',
        phone: '',
        address: {
          city: '',
          street: '',
          num: 0,
        },
        businessSize: BusinessSize.Private,
        industryType: '',
        establishmentDate: '',
        code: '',
      }),
    );

    if (answer.payload.status == 201) {
      dispatch(
        saveBusiness({
          companyNumber: values.companyNumber,
          email: values.email,
        }),
      );
      navigate('/CreateBusiness/EmailVerification');
    }
  };

const fields = [
  {
    name: 'companyNumber',
    label: t('website.Company Number'),
    type: 'text',
    validation: {
      required: 'Company number is required',
      pattern: {
        value: /^516[0-9]{6}$/i,
        message: 'Company number must start with 516 and contain 9 digits',
      },
    },
  },
  {
    name: 'name',
    label: t('website.Business Name'),
    type: 'text',
    validation: {
      required: t("Business name is required"),
      pattern: {
        value: /^[A-Z]{2,30}$/i,
        message: t('website.Business name must contain more than 2 and less than 30 characters'),
      },
    },
  },
  {
    name: 'email',
    label: t('website.Business Email'),
    type: 'email',
    validation: {
      required: t('website.Email is required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('website.Invalid email address'),
      },
    },
  },
];
return <FormWrapper onSubmit={onSubmit} fields={fields} />;
}
