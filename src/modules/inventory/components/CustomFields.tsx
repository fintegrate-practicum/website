/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Delete, Add } from '@mui/icons-material';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import MySetting, {
  ComponentType,
} from '../../../components/Setting/MySetting';
import { ICustomField } from '../interfaces/ICustomField';
import { IVariant } from '../interfaces/IVariant';
import Button from '../../../common/components/Button/Button';

interface CustomFieldProps {
  customFields: ICustomField[];
  setCustomFields: React.Dispatch<React.SetStateAction<ICustomField[]>>;
  variants: IVariant[];
  setVariants: React.Dispatch<React.SetStateAction<IVariant[]>>;
}

const CustomFields: React.FC<CustomFieldProps> = ({
  customFields,
  setCustomFields,
  variants,
  setVariants,
}) => {
  const [variantError, setVariantError] = useState<string>();

  useEffect(() => {
    if (customFields.length === 0) {
      handleAddCustomField();
    }
  }, []);

  const handleAddCustomField = () => {
    const existingFieldNames = customFields.map((field) => field.fieldName);
    if (existingFieldNames.includes('')) {
      alert(
        'Please set a name for all existing custom fields before adding a new one.',
      );
      return;
    }

    setCustomFields([
      ...customFields,
      {
        fieldName: '',
        fieldType: ComponentType.TextField,
        options: [{ value: '', label: '' }],
        isRequired: false,
      },
    ]);
  };

  const handleCustomFieldChange = (
    index: number,
    field: keyof ICustomField,
    value: any,
  ) => {
    const newCustomFields = [...customFields];
    newCustomFields[index] = {
      ...newCustomFields[index],
      [field]: value,
    };
    setCustomFields(newCustomFields);
  };

  const handleDeleteCustomField = (fieldName: string) => {
    const isFieldUsed = variants.some((variant) =>
      Object.keys(variant.customFields).includes(fieldName),
    );

    if (isFieldUsed) {
      if (
        window.confirm(
          `The field '${fieldName}' is used in existing variants. Are you sure you want to delete it?`,
        )
      ) {
        const updatedVariants = variants.map((variant) => {
          const newFields = { ...variant.customFields };
          delete newFields[fieldName];
          return { ...variant, customFields: newFields };
        });
        setVariants(updatedVariants);
        setCustomFields((prevFields) =>
          prevFields.filter((field) => field.fieldName !== fieldName),
        );
      }
      return;
    }
    setCustomFields((prevFields) =>
      prevFields.filter((field) => field.fieldName !== fieldName),
    );
  };

  const handleAddVariant = () => {
    if (customFields.length > 0) {
      setVariants([
        ...variants,
        {
          customFields: customFields.reduce(
            (acc, field) => {
              acc[field.fieldName] = '';
              return acc;
            },
            {} as Record<string, any>,
          ),
          stockQuantity: 0,
        },
      ]);
    }
  };

  const handleVariantChange = (
    index: number,
    field: keyof IVariant,
    value: any,
  ) => {
    const newVariants = [...variants];
    const updatedVariant = {
      ...newVariants[index],
      [field]: value,
    };

    const isDuplicate = newVariants.some((variant, variantIndex) => {
      if (variantIndex === index) return false;
      return Object.keys(updatedVariant.customFields).every(
        (key) => updatedVariant.customFields[key] === variant.customFields[key],
      );
    });

    if (isDuplicate) {
      setVariantError('Duplicate variant not allowed');
      return;
    } else {
      setVariantError('');
    }

    newVariants[index] = updatedVariant;
    setVariants(newVariants);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const hasMultipleValuedFields = customFields.some((field) =>
    [
      ComponentType.Select,
      ComponentType.ButtonGroup,
      ComponentType.Checkbox,
      ComponentType.RadioGroup,
    ].includes(field.fieldType),
  );

  const getDisplayableOptions = (field: ICustomField) => {
    return field.fieldType === ComponentType.Select ||
      field.fieldType === ComponentType.ButtonGroup
      ? field.options
      : [];
  };

  return (
    <>
      {customFields && customFields.length > 0 && (
        <Grid item xs={12}>
          <Box mb={2} border={1} borderRadius={2} padding={2}>
            <Typography variant='h6'>{t('inventory.Custom Fields')}</Typography>
            {customFields.map((customField, index) => (
              <Box key={index} mb={2} padding={2}>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      label={t('inventory.Custom Field Name')}
                      variant='outlined'
                      value={customField.fieldName}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          'fieldName',
                          e.target.value,
                        )
                      }
                      fullWidth
                      placeholder={t('Please enter a field name')}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>{t('inventory.Field Type')}</InputLabel>
                      <Select
                        value={customField.fieldType}
                        onChange={(e) =>
                          handleCustomFieldChange(
                            index,
                            'fieldType',
                            e.target.value,
                          )
                        }
                        input={<OutlinedInput label='Field Type' />}
                      >
                        {Object.values(ComponentType).map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {customField.fieldType !== ComponentType.TextField && (
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customField.isRequired}
                            onChange={(e) =>
                              handleCustomFieldChange(
                                index,
                                'isRequired',
                                e.target.checked,
                              )
                            }
                          />
                        }
                        label={t('inventory.Is Required')}
                      />
                    </Grid>
                  )}

                  {(customField.fieldType === ComponentType.Select ||
                    customField.fieldType === ComponentType.ButtonGroup) && (
                    <Grid item xs={4}>
                      <TextField
                        label={t('inventory.Options (comma separated)')}
                        variant='outlined'
                        value={customField.options
                          ?.map((opt) => opt.label)
                          .join(', ')}
                        onChange={(e) =>
                          handleCustomFieldChange(
                            index,
                            'options',
                            e.target.value.split(',').map((opt) => ({
                              label: opt.trim(),
                              value: opt.trim(),
                            })),
                          )
                        }
                        fullWidth
                      />
                    </Grid>
                  )}

                  {customField.fieldType === ComponentType.TextField && (
                    <Grid item xs={4}>
                      <TextField
                        label={t('inventory.Default Value')}
                        variant='outlined'
                        value={customField.options?.[0]?.value || ''}
                        onChange={(e) =>
                          handleCustomFieldChange(index, 'options', [
                            { label: e.target.value, value: e.target.value },
                          ])
                        }
                        fullWidth
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Box>
                      <MySetting
                        setting={{
                          settingDesc: customField.fieldName,
                          type: customField.fieldType,
                          props:
                            customField.fieldType === ComponentType.TextField
                              ? { value: customField.options?.[0]?.value }
                              : {},
                          children:
                            customField.fieldType === ComponentType.Select
                              ? customField.options?.map((opt) => ({
                                  key: opt.value,
                                  value: opt.value,
                                  text: opt.label,
                                }))
                              : customField.fieldType ===
                                  ComponentType.ButtonGroup
                                ? customField.options?.map((opt) => ({
                                    key: opt.value,
                                    value: opt.value,
                                  }))
                                : customField.fieldType ===
                                      ComponentType.Button ||
                                    customField.fieldType ===
                                      ComponentType.Input
                                  ? customField.options?.[0]?.value ||
                                    customField.fieldName
                                  : undefined,
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} textAlign='right'>
                    <IconButton
                      onClick={() =>
                        handleDeleteCustomField(customField.fieldName)
                      }
                      color='secondary'
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <Button onClick={handleAddCustomField} fullWidth>
          {t('inventory.Add Custom Field')}
        </Button>
      </Grid>

      {customFields.length > 0 && (
        <Grid item xs={12}>
          {variants && variants.length > 0 && (
            <Typography variant='h6'>{t('inventory.Variants')}</Typography>
          )}
          {variants.map((variant, index) => (
            <Box key={index} mb={2} border={1} borderRadius={2} padding={2}>
              <Grid container spacing={2}>
                {customFields.map((field, fieldIndex) => (
                  <Grid item xs={4} key={fieldIndex}>
                    {field.fieldType !== ComponentType.TextField && (
                      <FormControl fullWidth variant='outlined'>
                        <InputLabel>{field.fieldName}</InputLabel>
                        <Select
                          value={variant.customFields[field.fieldName] || ''}
                          onChange={(e) =>
                            handleVariantChange(index, 'customFields', {
                              ...variant.customFields,
                              [field.fieldName]: e.target.value,
                            })
                          }
                          label={field.fieldName}
                        >
                          {getDisplayableOptions(field)?.map(
                            (option, optionIndex) => (
                              <MenuItem key={optionIndex} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ),
                          )}
                        </Select>
                      </FormControl>
                    )}
                  </Grid>
                ))}

                <Grid item xs={4}>
                  <TextField
                    label={t('inventory.Stock Quantity')}
                    type='number'
                    value={variant.stockQuantity}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        'stockQuantity',
                        Number(e.target.value),
                      )
                    }
                    fullWidth
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label={t('inventory.Additional Price')}
                    type='number'
                    value={variant.additionalPrice}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        'additionalPrice',
                        Number(e.target.value),
                      )
                    }
                    fullWidth
                    variant='outlined'
                  />
                </Grid>

                <Grid item xs={12} textAlign='right'>
                  <IconButton
                    onClick={() => handleRemoveVariant(index)}
                    color='secondary'
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}

          {hasMultipleValuedFields && (
            <Button
              variant='outlined'
              startIcon={<Add />}
              onClick={handleAddVariant}
            >
              {t('inventory.Add Variant')}
            </Button>
          )}
          {variantError && <div>{variantError}</div>}
        </Grid>
      )}
    </>
  );
};

export default CustomFields;
