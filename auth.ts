import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/types/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-post", type: "email" },
        name: { label: "Navn", type: "text" },
        password: { label: "Passord", type: "password" },
        role: { label: "Rolle", type: "text" },
        gdprConsent: { label: "GDPR Samtykke", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Ugyldig påloggingsinformasjon");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // Auto-register new user with PENDING status
          if (!credentials.gdprConsent || credentials.gdprConsent !== "true") {
            throw new Error("GDPR-samtykke er påkrevd");
          }

          const newUser = await prisma.user.create({
            data: {
              name: credentials.name ?? credentials.email.split("@")[0],
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 10),
              gdprConsent: true,
              gdprConsentDate: new Date(),
              gdprConsentVersion: "1",
              isApproved: false, // Requires admin approval
            },
          });

          // Throw error to prevent immediate login for PENDING users
          throw new Error("Kontoen din er opprettet og venter på godkjenning fra administrator. Du vil motta en e-post når kontoen er godkjent.");
        }

        // Check if user is approved (for PENDING users) 
        if ((user as any).role === UserRole.PENDING && !(user as any).isApproved) {
          throw new Error("Kontoen din venter fortsatt på godkjenning fra administrator.");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Ugyldig påloggingsinformasjon");
        }

        // Return user in NextAuth-compatible format
        return {
          id: user.id,
          name: user.name || "",
          email: user.email,
          role: (user as any).role,
          isApproved: (user as any).isApproved,
          gdprConsent: (user as any).gdprConsent,
          gdprConsentDate: (user as any).gdprConsentDate,
          gdprConsentVersion: (user as any).gdprConsentVersion,
          createdAt: (user as any).createdAt,
          updatedAt: (user as any).updatedAt,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isApproved = user.isApproved;
      }
      return { ...token, id: token.id ?? user?.id };
    },
    async session({ session, token }) {
      return { 
        ...session, 
        user: { 
          ...session.user, 
          id: token.id,
          role: token.role,
          isApproved: token.isApproved 
        } 
      };
    },
  },
} satisfies NextAuthOptions;