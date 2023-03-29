import NextAuth, {NextAuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import async from '../seed';
import { dbUsers } from '../../../database';

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials:{
        email:{ label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
        password:{ label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
        
      },
      
      async authorize( credentials ):Promise<any>{
        //Todo: validar contra base de datos
        
        //const user = { name: 'Juan', email: 'juan@google.com' };
        //const user = { _id: "1", name: "J Smith", email: "jsmith@example.com" };

        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

      }
      
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '', 
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    
  ],

  //Custom Pages
  pages:{
    signIn: '/auth/login',
    newUser:'/auth/register',
  },
  //Callbacks

  jwt:{

  },

  session:{
    maxAge: 2592000, // 30 dias
    strategy: 'jwt',
    updateAge: 86400, // cada dia
  },

  callbacks:{

    async jwt({ token, account,user }){

      if ( account ) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
              token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
            break;

          case 'credentials':
            token.user = user;
            break;

        }
      }

      return token;
    },

    async session({ session, token, user }){

      session.accessToken = session.accessToken;
      session.user = token.user as any;
      return session;
    }



  }
}
export default NextAuth(authOptions)