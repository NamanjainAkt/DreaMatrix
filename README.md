# DreaMatrix - AI-Powered Image Generation & Sharing Platform

![DreaMatrix Banner](https://img.shields.io/badge/AI-Image%20Generator-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-lightblue?style=for-the-badge)

DreaMatrix is a full-stack web application that allows users to generate AI-powered images using Google's Gemini AI model and share them with a vibrant community. Create stunning visuals from text prompts and explore a gallery of AI-generated artwork.

## 🚀 Features

- **AI Image Generation**: Generate high-quality images from text prompts using Google's Gemini 2.0 Flash model
- **Community Gallery**: Browse and explore AI-generated images shared by the community
- **Real-time Search**: Search posts by prompt text or author name
- **Image Optimization**: Automatic image optimization and delivery via Cloudinary
- **Lazy Loading**: Smooth, performance-optimized image loading
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark Theme**: Stunning purple gradient themed interface with smooth animations
- **Download Images**: Save favorite images directly to your device

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **React Router DOM v7** - Client-side routing
- **Styled-components** - CSS-in-JS styling
- **Material-UI (MUI)** - Pre-built UI components
- **Axios** - HTTP client
- **file-saver** - Client-side file downloads

### Backend
- **Node.js** - JavaScript runtime
- **Express.js v5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Google Gemini AI** - Image generation service
- **Cloudinary** - Image storage and optimization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB account (or MongoDB Atlas)

You'll also need accounts/API keys for:
- Google AI Studio (for Gemini API)
- Cloudinary
- MongoDB Atlas (or local MongoDB)

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/dreamatrix.git
cd dreamatrix
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd ../server
touch .env
```

Add the following variables to `.env`:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 5. Configure Client API

Update `client/src/api/index.js` with your server URL:

```javascript
const API = axios.create({
    baseURL: "https://your-server-url.com/api"
    // or for local development:
    // baseURL: "http://localhost:5000/api"
})
```

### 6. Run the Application

#### Start the Backend Server (Terminal 1):

```bash
cd server
npm run dev
```

#### Start the Frontend (Terminal 2):

```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
ImageGeneration APP/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── api/                # API functions
│   │   ├── components/         # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── GenerateImageForm.jsx
│   │   │   ├── GeneratedImageCard.jsx
│   │   │   ├── ImageCard.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── TextInput.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx        # Gallery page
│   │   │   └── CreatePost.jsx  # Creation page
│   │   ├── utils/
│   │   │   └── Theme.js        # Styled-components theme
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── server/                     # Express Backend
    ├── controllers/            # Route handlers
    │   ├── Generate.js         # Image generation
    │   └── Post.js             # Post management
    ├── models/
    │   └── Post.js             # MongoDB schema
    ├── routes/
    │   ├── Generate.js
    │   └── Posts.js
    ├── generateImage.js        # Gemini AI integration
    ├── error.js                # Error handling
    ├── index.js                # Server entry point
    └── package.json
```

## 🔌 API Endpoints

### Generate Image
- **Endpoint**: `POST /api/generate`
- **Description**: Generate an AI image from a text prompt
- **Request Body**:
  ```json
  {
    "data": {
      "prompt": "A sunset over mountains in watercolor style"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "photo": "base64_encoded_image_data",
    "filePath": "/path/to/temp/image.png"
  }
  ```

### Get All Posts
- **Endpoint**: `GET /api/post`
- **Description**: Retrieve all community posts
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "post_id",
        "name": "Author Name",
        "prompt": "Image prompt text",
        "photo": "cloudinary_image_url",
        "createdAt": "timestamp"
      }
    ]
  }
  ```

### Create Post
- **Endpoint**: `POST /api/post`
- **Description**: Create a new post with generated image
- **Request Body**:
  ```json
  {
    "name": "Author Name",
    "prompt": "Image prompt text",
    "photo": "data:image/jpeg;base64,...",
    "filePath": "/path/to/temp/image.png"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "post_id",
      "name": "Author Name",
      "prompt": "Image prompt text",
      "photo": "cloudinary_image_url",
      "createdAt": "timestamp"
    }
  }
  ```

## 🎨 Usage

### Generating Your First Image

1. Navigate to the "Create new post" page
2. Enter your name in the "Author" field
3. Enter a detailed prompt describing the image you want to generate
   - **Tip**: Be descriptive! Include style, colors, mood, composition details
   - Example: "A majestic dragon soaring through a purple sky with golden clouds, digital art style, highly detailed"
4. Click "Generate Image"
5. Wait for the AI to create your image
6. Once generated, click "Post Image" to share with the community

### Best Practices for Prompts

- **Be specific**: Include style, colors, lighting, composition
- **Mention art style**: "photorealistic", "watercolor", "digital art", "oil painting"
- **Add mood**: "serene", "dramatic", "mystical", "vibrant"
- **Include details**: "highly detailed", "8k resolution", "cinematic lighting"

### Searching the Gallery

- Use the search bar on the Home page
- Search by:
  - Author name
  - Keywords from the prompt
  - Any combination of both

### Downloading Images

- Hover over any image in the gallery
- Click the download icon in the bottom right corner
- The image will be saved to your device

## 🚀 Deployment

### Frontend (Netlify)

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables in Netlify dashboard if needed

### Backend (Render/Railway/Heroku)

1. Push your code to a GitHub repository

2. Connect your repository to your deployment platform

3. Set environment variables in the platform dashboard

4. Deploy

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Get your connection string
4. Add it to your server's environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the image generation
- Cloudinary for image optimization and storage
- MongoDB for the database
- React and Node.js communities

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with a detailed description
3. Join our community discussions

## 🗺️ Roadmap

- [ ] User authentication and profiles
- [ ] Like and favorite functionality
- [ ] Image variations and editing tools
- [ ] Social sharing features
- [ ] Mobile app development
- [ ] Image-to-image generation
- [ ] Advanced prompt engineering tools

---

<div align="center">

**Built with ❤️ by the DreaMatrix Team**

[Website](https://dreamatrix.netlify.app) • [Report Bug](https://github.com/yourusername/dreamatrix/issues) • [Request Feature](https://github.com/yourusername/dreamatrix/issues)

</div>
