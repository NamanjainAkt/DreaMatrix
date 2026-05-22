import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import { AutoAwesome, CloudUpload } from "@mui/icons-material";
import { CreatePost, generateAIImage } from "../api";

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radiusLg};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.glassBorder};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_muted};
  line-height: 1.5;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text_muted};
  text-align: center;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radiusSm};
  background: ${({ theme }) => theme.glass};
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ErrorMsg = styled.div`
  color: ${({ theme }) => theme.red};
  font-size: 13px;
  text-align: center;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radiusSm};
  background: rgba(239, 68, 68, 0.1);
`;

const GenerateImageForm = ({
  post, setPost, createPostLoading,
  setGenerateImageLoading, generateImageLoading, setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    setError("");
    try {
      const res = await generateAIImage({ prompt: post.prompt });
      setPost({ ...post, photo: res?.data?.photo });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate image");
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
    setError("");
    try {
      await CreatePost({
        name: post.name,
        prompt: post.prompt,
        photo: post.photo,
      });
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post");
    } finally {
      setCreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Header>
        <Title>Create an Image</Title>
        <Desc>Write a detailed prompt and let AI bring your vision to life</Desc>
      </Header>
      <Fields>
        <TextInput
          label="Author"
          placeholder="Your name..."
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="A detailed description of the image you want..."
          name="prompt"
          rows="6"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
      </Fields>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Note>You can share your generated image with the community!</Note>
      <Actions>
        <Button
          text="Generate"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={!post.prompt}
          onClick={generateImageFun}
        />
        <Button
          text="Share"
          flex
          type="secondary"
          leftIcon={<CloudUpload />}
          isLoading={createPostLoading}
          isDisabled={!post.name || !post.prompt || !post.photo}
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
