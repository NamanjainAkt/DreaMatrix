import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: ${({ $size }) => ($size === "small" ? "4px" : "80px 0")};
`;

const Spinner = styled.div`
  width: ${({ $size }) => ($size === "small" ? "20px" : "40px")};
  height: ${({ $size }) => ($size === "small" ? "20px" : "40px")};
  border: 3px solid rgba(124, 58, 237, 0.15);
  border-top-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_muted};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Loader = ({ size = "large", text }) => {
  if (size === "small") {
    return (
      <Wrapper $size={size}>
        <Spinner $size={size} />
      </Wrapper>
    );
  }

  return (
    <Wrapper $size={size}>
      <Spinner $size={size} />
      {text && <Text>{text}</Text>}
    </Wrapper>
  );
};

export default Loader;
