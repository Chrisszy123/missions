import prisma from "../utils/db";
// import { compare, hash } from "";

// export const signup = async ({
//   email,
//   password,
// }: {
//   email: any;
//   password: any;
// }) => {
//   // using auth0 we'll register users from the data from the user{}
//   const existingUser = await prisma.user.findFirst({ where: { email } });

//   if (existingUser) {
//     const err = new Error("A user by the email already exist");
//     throw err;
//   }
//   const hashedPassword = await hash(password, 12);
//   await prisma.user.create({
//     data: { email: email, password: hashedPassword },
//   });
// };

// export const login = async ({
//   email,
//   password,
// }: {
//   email: any;
//   password: any;
// }) => {
//   const existingUser = await prisma.user.findFirst({ where: { email } });
//   if (!existingUser) throw new Error("User does not exist");
//   const correctPass = await compare(password, existingUser.password as string);
//   if (!correctPass) throw new Error("Password incorrect");
// };
