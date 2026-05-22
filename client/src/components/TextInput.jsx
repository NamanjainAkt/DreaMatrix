import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.text_muted};
`;

const InputWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radiusSm};
  border: 1px solid ${({ theme }) => theme.glassBorder};
  background: ${({ theme }) => theme.bg};
  padding: 14px 16px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.borderHover};
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  caret-color: ${({ theme }) => theme.primary};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.text_muted};
  }

  ${({ $textarea }) =>
    $textarea &&
    `
    min-height: 120px;
  `}
`;

const TextInput = ({ label, placeholder, name, value, handelChange, textArea, rows }) => (
  <Container>
    <Label>{label}</Label>
    <InputWrapper>
      <Input
        as={textArea ? "textarea" : "input"}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={handelChange}
        $textarea={textArea}
      />
    </InputWrapper>
  </Container>
);

export default TextInput;
