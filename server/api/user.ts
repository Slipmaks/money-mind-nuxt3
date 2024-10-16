import jwt from "jsonwebtoken";
import User from "~/server/models/User";
import Transaction from "~/server/models/Transaction";

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(" ")[1];

  if (!token) {
    return createError({ statusCode: 401, message: "Нет токена" });
  }

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    userId = decoded.userId;
  } catch (error) {
    return createError({
      statusCode: 401,
      message: "Недействительный токен",
    });
  }

  const method = event.node.req.method;

  if (method === "GET") {
    const user = await User.findById(userId);
    const transactions = await Transaction.find({ userId }).select(
      "-userId -__v"
    );

    return {
      email: user?.email,
      transactions,
    };
  }
});
