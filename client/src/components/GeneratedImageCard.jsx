import styled from "styled-components";
import Loader from "./Loader";

const Container = styled.div`
  flex: 1;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radiusLg};
  border: 2px dashed ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  ${({ $hasImage }) =>
    !$hasImage &&
    `
    &:hover {
      border-color: ${({ theme }) => theme.borderHover};
    }
  `}
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_muted};
  font-size: 14px;
  text-align: center;
  padding: 40px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const GeneratedImageCard = ({ src, loading }) => (
  <Container $hasImage={!!src}>
    {loading ? (
      <Loader text="Generating your image..." />
    ) : src ? (
      <Image src={src} alt="Generated image" />
    ) : (
      <Placeholder>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>Write a prompt to generate an image</span>
      </Placeholder>
    )}
  </Container>
);

export default GeneratedImageCard;
