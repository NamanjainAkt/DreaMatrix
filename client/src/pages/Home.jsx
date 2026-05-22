import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import Loader from "../components/Loader";
import { GetPosts } from "../api";

const Container = styled.main`
  height: 100%;
  overflow-y: auto;
  padding: 40px 48px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 24px 16px 40px;
  }
`;

const Headline = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1400px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: ${({ theme }) => theme.text_muted};
  font-size: 15px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await GetPosts();
        const data = res?.data?.data || [];
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
      return;
    }
    const q = search.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (p) =>
          p?.prompt?.toLowerCase().includes(q) ||
          p?.name?.toLowerCase().includes(q)
      )
    );
  }, [posts, search]);

  if (error) {
    return (
      <Container>
        <EmptyState style={{ color: "#ef4444" }}>{error}</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Headline>
        <Title>Explore the Community</Title>
        <Subtitle>{"< Created with AI />"}</Subtitle>
      </Headline>
      <SearchBar search={search} setSearch={setSearch} />
      {loading ? (
        <Loader />
      ) : (
        <Grid>
          {filteredPosts.length === 0 ? (
            <EmptyState>
              {search
                ? "No posts match your search. Try different keywords."
                : "No posts yet. Be the first to share!"}
            </EmptyState>
          ) : (
            filteredPosts.map((item) => (
              <ImageCard key={item._id} item={item} />
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
