import { connectDB } from "./db.js";
import Post from "../../server/models/Post.js";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    await connectDB();
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: "Database connection failed" }),
    };
  }

  if (event.httpMethod === "GET") {
    try {
      const posts = await Post.find({}).sort({ _id: -1 });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: posts }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: err.message }),
      };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const { name, prompt, photo } = JSON.parse(event.body);

      if (!name || !prompt || !photo) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: "Missing required fields" }),
        };
      }

      const newPost = await Post.create({ name, prompt, photo });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: newPost }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: err.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, message: "Method not allowed" }),
  };
};
