
import KeycloakProvider from "next-auth/providers/keycloak"
import { prisma } from "@/lib/prisma";
import { AuthOptions, TokenSet} from "next-auth";
import { JWT } from "next-auth/jwt";

function requestRefreshOfAccessToken(token: JWT) {
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID!,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
      }),
      method: "POST",
      cache: "no-store"
    });
  }
export const authOptions: AuthOptions = {
    providers: [
      KeycloakProvider({
        clientId: process.env.KEYCLOAK_CLIENT_ID as string,
        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
        issuer: process.env.KEYCLOAK_ISSUER as string,
      })
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
    },
    session: {
      strategy: "jwt",
      maxAge: 60 * 30
    },
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.idToken = account.id_token
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.expiresAt = account.expires_at
          return token
        }
        if (Date.now() < (token.expiresAt! * 1000 - 60 * 1000)) {
          return token
        } else {
          try {
            const response = await requestRefreshOfAccessToken(token)
            const tokens: TokenSet = await response.json()
  
            if (!response.ok) throw tokens
  
            return {
              ...token,
              idToken: tokens.id_token,
              accessToken: tokens.access_token,
              expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
              refreshToken: tokens.refresh_token ?? token.refreshToken,
            }
          } catch (error) {
            console.error("Error refreshing access token", error)
            return { ...token, error: "RefreshAccessTokenError" }
          }
        }
      },
      async signIn({ user }) {
        try {
          const email = user.email ?? ''
          const existingUser = await prisma.user.findUnique({
            where: { id: user.email! },
          });
  
          if (!existingUser) {
            const ranks = await prisma.rank.findMany();
            const rankProgress: Record<string, { rank: string; completedChallenges: string[]; currentChallenge: string | null; progress: number }> = {};
            
            ranks.forEach(rank => {
              rankProgress[rank.name] = {
                rank: rank.name,
                completedChallenges: [],
                currentChallenge: null,
                progress: 0
              };
            });
  
            await prisma.user.create({
              data: {
                id: email,
                name: user.name || email,
                email: email,
                progress: {
                  create: {
                    currentRank: 'Aprendiz',
                    experience: 0,
                    rankProgress: rankProgress
                  }
                }
              },
              include: {
                progress: true
              }
            });
          }
  
          return true;
        } catch (error) {
          console.error("Error in signIn callback", error);
          return false;
        }
      },
      async session({ session, token }) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: token.email! }
          });
  
          if (!user) {
            session.error = "UserNotFoundOrInactive";
            return session;
          }
          session.accessToken = token.accessToken
          session.error = token.error
          return session
        } catch (error) {
          console.error("Session validation error", error);
          session.error = "SessionValidationError";
          return session;
        }
      }
    }
  }
