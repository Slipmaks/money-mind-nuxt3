import Transaction from "~/server/models/Transaction";
import jwt from "jsonwebtoken";

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
    const transactions = await Transaction.find({ userId }).select(
      "-userId -__v"
    );
    return transactions;
  }

  if (method === "POST") {
    const { amount, type, description } = await readBody(event);
    const newTransaction = new Transaction({
      userId,
      amount,
      type,
      description,
    });
    await newTransaction.save();
    return newTransaction;
  }

  if (method === "PUT") {
    const { id, amount, type, description } = await readBody(event);
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, type, description },
      { new: true }
    );
    return updatedTransaction;
  }

  if (method === "DELETE") {
    const { id } = await readBody(event);
    await Transaction.findByIdAndDelete(id);
    return { message: "Транзакция удалена" };
  }
});
