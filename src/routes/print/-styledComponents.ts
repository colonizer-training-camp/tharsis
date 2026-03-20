import styled from '@emotion/styled';

import { BLACK } from '@/styles/colors';

export const FieldWithPreviewConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 32px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const FieldConatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

export const Select = styled.select`
  margin-left: 12px;
  width: 240px;
  height: 28px;
  border: 2px solid ${BLACK};
  padding: 4px;
`;

export const TextInput = styled.input`
  margin-left: 12px;
  width: 280px;
  border: 2px solid ${BLACK};
  padding: 4px;
`;

export const TextFieldInput = styled.textarea`
  margin-left: 12px;
  width: 280px;
  border: 2px solid ${BLACK};
  padding: 4px;
`;

export const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchbarContainer = styled.input`
  width: 280px;
  border: 2px solid ${BLACK};
  padding: 8px;
`;
