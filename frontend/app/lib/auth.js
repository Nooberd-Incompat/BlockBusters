import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const {  handlers, signIn, signOut, auth} = NextAuth({
  providers: [GitHub],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log("account", account);
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
})