import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radiusLg};
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.glassBorder};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.borderHover};
    box-shadow: ${({ theme }) => theme.shadowLg};
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(6, 6, 10, 0.85) 100%);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  gap: 10px;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #f1f5f9;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #e2e8f0;
`;

const DownloadBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

function getOptimizedCloudinaryUrl(url, width = 400, height = 400) {
  if (!url?.includes("cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
  );
}

const ImageCard = ({ item }) => (
  <Card>
    <ImageWrapper>
      <LazyLoadImage
        alt={item?.prompt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        src={getOptimizedCloudinaryUrl(item?.photo)}
        loading="lazy"
        effect="blur"
      />
    </ImageWrapper>
    <Overlay>
      <Prompt>{item?.prompt?.slice(0, 120)}{item?.prompt?.length > 120 ? "..." : ""}</Prompt>
      <Bottom>
        <Author>
          <Avatar sx={{ width: 28, height: 28, fontSize: 13, bgcolor: "#7c3aed" }}>
            {item?.name?.[0]?.toUpperCase()}
          </Avatar>
          {item?.name}
        </Author>
        <DownloadBtn onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}>
          <DownloadRounded sx={{ fontSize: 18 }} />
        </DownloadBtn>
      </Bottom>
    </Overlay>
  </Card>
);

export default ImageCard;
