import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./database/drizzle"
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }


                const user = await db
                    .select()
                    .from(db.users).where(eq(db.users.email, credentials.email.toString()))
                    .limit(1).all();

                if (user.length === 0) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password.toString(), user[0].password)
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user[0].id.toString(),
                    email: user[0].email,
                    name: user[0].fullName
                };
            }
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
})