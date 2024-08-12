import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { flashCardRouter } from './routes/flashCard';
import {cors } from 'hono/cors'


// avoid as many global things as u can because in a serverless application because a lot of time they just start a specific function
const app = new Hono<{
  Bindings: {  // way to define env varibale type
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/flashCard", flashCardRouter)




export default app;
