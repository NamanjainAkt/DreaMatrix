import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AddRounded, ExploreRounded } from "@mui/icons-material";

const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  background: ${({ theme }) => theme.navbar};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.glassBorder};

  @media (max-width: 600px) {
    padding: 12px 20px;
  }
`;

const Logo = styled.span`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.radiusMd};
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ $primary }) => $primary ? `linear-gradient(135deg, #7c3aed, #6366f1)` : 'transparent'};
  color: ${({ $primary }) => $primary ? '#fff' : ({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $primary }) => $primary ? 'linear-gradient(135deg, #6d28d9, #4f46e5)' : ({ theme }) => theme.glass};
    border-color: ${({ theme }) => theme.borderHover};
    transform: translateY(-1px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreatePage = location.pathname === "/post";

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>DreaMatrix</Logo>
      <NavButton
        $primary={!isCreatePage}
        onClick={() => navigate(isCreatePage ? "/" : "/post")}
      >
        {isCreatePage ? (
          <><ExploreRounded sx={{ fontSize: 20 }} /> Explore</>
        ) : (
          <><AddRounded sx={{ fontSize: 20 }} /> Create</>
        )}
      </NavButton>
    </Container>
  );
};

export default Navbar;
