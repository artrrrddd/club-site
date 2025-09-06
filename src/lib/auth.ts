import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Простая проверка аутентификации без Prisma
const checkUser = async (email: string, password: string) => {
  // Проверяем тестовые данные
  if (email === "admin@example.com" && password === "admin123") {
    return {
      id: "1",
      email: "admin@example.com",
      name: "Admin",
      role: "ADMIN",
    };
  }
  return null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          console.log("Attempting to authenticate user:", credentials.email);

          const user = await checkUser(credentials.email, credentials.password);

          if (!user) {
            console.log("User not found or invalid credentials:", credentials.email);
            return null;
          }

          console.log("Authentication successful for user:", credentials.email);

          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};