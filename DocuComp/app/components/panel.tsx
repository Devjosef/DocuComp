import React from 'react';
import styled from 'styled-components';

const StyledPanel = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface PanelProps {
  title?: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children }) => {
  return (
    <StyledPanel>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </StyledPanel>
  );
};

export default Panel;