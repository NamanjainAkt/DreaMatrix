import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: ${({ theme }) => theme.radiusSm};
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: fit-content;

  background: ${({ $variant, theme }) =>
    $variant === "secondary"
      ? `linear-gradient(135deg, ${theme.secondary}, #818cf8)`
      : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`};

  color: #fff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(124, 58, 237, 0.35);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $flex }) => $flex && "flex: 1;"}
`;

const Button = ({ text, isLoading, isDisabled, leftIcon, type, onClick, flex }) => (
  <StyledButton
    onClick={() => !isDisabled && !isLoading && onClick?.()}
    disabled={isDisabled || isLoading}
    $variant={type}
    $flex={flex}
  >
    {isLoading ? (
      <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
    ) : (
      <>
        {leftIcon}
        {text}
      </>
    )}
  </StyledButton>
);

export default Button;
