// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/lib/db'; 
// import User from '@/models/User';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//             throw new Error("Please enter email and password");
//         }
        
//         await connectDB();

//         // YAHAN PAR TABDEELI KI GAYI HAI: .select('+password') add kiya gaya hai
//         const user = await User.findOne({ email: credentials.email }).select('+password');

//         if (!user) {
//           throw new Error("No user found with this email.");
//         }

//         // Ab user.password mein value mojood hogi
//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password 
//         );

//         if (!isPasswordCorrect) {
//           throw new Error("Incorrect password.");
//         }
        
//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };











// // src/app/api/auth/[...nextauth]/route.js (FINAL CORRECTED VERSION)

// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/lib/db'; 
// import User from '@/models/User';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//             throw new Error("Please enter email and password");
//         }
        
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email }).select('+password');
//         if (!user) {
//           throw new Error("No user found with this email.");
//         }

//         const isPasswordCorrect = await bcrypt.compare(
//           credentials.password,
//           user.password 
//         );

//         if (!isPasswordCorrect) {
//           throw new Error("Incorrect password.");
//         }
        
//         // Yahan se jo user object return hota hai, woh pehli baar JWT token mein jaata hai
//         return {
//           id: user._id.toString(),
//           name: user.name, // Naam yahan se pehli baar token mein jaata hai
//           email: user.email,
//           role: user.role,
//         };
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//   },
  
//   // ==========================================================
//   // ===== YEH HISSA SABSE ZAROORI HAI - ISAY UPDATE KAREIN =====
//   // ==========================================================
//   callbacks: {
//     async jwt({ token, user, trigger, session }) {
//       // 1. Initial Sign In: Jab user pehli baar login karta hai
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.name = user.name; // Yakeeni banayein ki naam token mein add ho raha hai
//       }

//       // 2. Session Update: Jab frontend se `update()` function call hota hai
//       if (trigger === "update" && session?.name) {
//         // Naye naam ko token mein daal dein
//         token.name = session.name;
//       }

//       return token; // Hamesha token return karein
//     },
    
//     async session({ session, token }) {
//       // JWT token se data ko frontend ke 'session' object mein bhejein
//       if (token) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.name = token.name; // Token se naya/purana naam session mein daalein
//       }
//       return session; // Hamesha session return karein
//     }
//   },
  
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };











// src/app/api/auth/[...nextauth]/route.js (FINALIZED VERSION)

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db'; 
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter email and password");
        }
        
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password 
        );

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password.");
        }
        
        // Yahan se jo user object return hota hai, woh pehli baar JWT token mein jaata hai
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 1. Initial Sign In
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }

      // 2. Session Update
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },
    
    async session({ session, token }) {
      // JWT token se data ko frontend ke 'session' object mein bhejein
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  // ===== YAHAN EK NAYA BLOCK ADD KIYA GAYA HAI (EVENTS) =====
  events: {
    async signOut({ token, session }) {
      // Yeh function tab chalta hai jab user sign out karta hai.
      // Aap yahan user ki activity log kar sakte hain.
      console.log(`User Logged Out: ID ${token.sub}, Email: ${token.email}`);
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };








