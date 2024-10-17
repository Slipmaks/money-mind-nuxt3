import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, password, action } = await readBody(event);

  if (action === "signup") {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = new User({ email, password: hashedPassword });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      return { token };
    } catch (error: any) {
      return { error: "Ошибка при регистрации: " + error.message };
    }
  } else if (action === "login") {
    const user = await User.findOne({ email });
    if (!user) return { error: "Пользователь не найден" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: "Неверный пароль" };

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    return { token };
  }
});
