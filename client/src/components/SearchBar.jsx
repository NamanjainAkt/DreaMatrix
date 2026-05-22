import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.radiusMd};
  border: 1px solid ${({ theme }) => theme.glassBorder};
  background: ${({ theme }) => theme.card};
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.borderHover};
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  @media (max-width: 600px) {
    width: calc(100% - 40px);
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  font-family: inherit;
  caret-color: ${({ theme }) => theme.primary};

  &::placeholder {
    color: ${({ theme }) => theme.text_muted};
  }
`;

const SearchBar = ({ search, setSearch }) => (
  <Container>
    <SearchOutlined sx={{ color: "#64748b", fontSize: 20 }} />
    <Input
      placeholder="Search by prompt or author..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Container>
);

export default SearchBar;
