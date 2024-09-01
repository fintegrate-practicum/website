import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface ProductComponentsListProps {
  componentIds: string[];
  components: { id: string; name?: string }[];
}

const createComponentMap = (components: { id: string; name?: string }[]) => {
  return components.reduce((acc: Record<string, string>, component) => {
    acc[component.id] = component.name || 'Unknown';
    return acc;
  }, {});
};

const ProductComponentsList: React.FC<ProductComponentsListProps> = ({
  componentIds,
  components,
}) => {
  const componentMap = React.useMemo(
    () => createComponentMap(components),
    [components],
  );

  if (!componentIds.length) {
    return <span>No Components</span>;
  }

  return (
    <Tooltip title='Components' arrow>
      <span>
        {componentIds.map((componentId, index) => (
          <span key={componentId}>
            {componentMap[componentId] || 'Unknown Component'}
            {index < componentIds.length - 1 && ', '}
          </span>
        ))}
      </span>
    </Tooltip>
  );
};

export default ProductComponentsList;
