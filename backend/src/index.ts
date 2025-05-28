import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "./generated/prisma";
import { PrismaD1 } from "@prisma/adapter-d1";

type Variables = {};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// CORS設定
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Prismaクライアントの初期化
function getPrismaClient(db: D1Database) {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter } as any);
}

// ルート定義
app.get("/", (c) => {
  return c.json({ message: "Hello Hono with Prisma and D1!" });
});

// ユーザー一覧取得
app.get("/users", async (c) => {
  try {
    const prisma = getPrismaClient(c.env.DB);
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return c.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

// ユーザー作成
app.post("/users", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const prisma = getPrismaClient(c.env.DB);
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return c.json(user, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// 投稿一覧取得
app.get("/posts", async (c) => {
  try {
    const prisma = getPrismaClient(c.env.DB);
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return c.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

// 投稿作成
app.post("/posts", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, authorId, published = false } = body;

    if (!title || !authorId) {
      return c.json({ error: "Title and authorId are required" }, 400);
    }

    const prisma = getPrismaClient(c.env.DB);
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parseInt(authorId),
        published,
      },
      include: {
        author: true,
      },
    });

    return c.json(post, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

export default app;
