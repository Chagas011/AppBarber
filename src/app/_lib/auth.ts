import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      } as any;
      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
