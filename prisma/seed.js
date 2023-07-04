const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function CreateUser() {
  // delete all db items before creating
  await db.user.deleteMany();
  await Promise.all(getUsers().map((user) => {
    return db.user.create({
      data: user
    })
  }))
  
}

async function seed() {
  try {
    await CreateUser();
  } catch (err) {
    console.log(err);
  }
}
seed()
  .then((v) => console.log("created db items" + v))
  .catch((e) => console.log(e));

function getUsers() {
  return [
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4345",
      email: "basseygoodluck@gmail.com",
      name: "John Doe",
      username: "JohnD",
      role: "BASIC",
      password: "12311",
      communities: {
        create: {
          desc: "A new community created for 1",
          name: "01node community",
          tags: {
            create: {
              name: "Validator",
            },
          },
          image: {
            create: {
              publicId: "https://www.shutterstock.com/image-illustration/magical-flowing-castle-digital-illustration-600w-1874672812.jpg"
            }
          },
          link: "https://www.o1node.com",
          missions: {
            create: {
              desc: "A new mission for a community",
              name: "Win a new car",
              rewards: "100XP",
              category: "NFTs",
              state: "PENDING",
              submissionType: "URL",
            },
          }
        },
      },
      walletAddress: "0x9DFc87276e0abcea0BF09ED88d7aE6AB9C42a7F8",
    },
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4300",
      email: "bb@email.com",
      name: "John D",
      username: "John Den",
      role: "ADMIN",
      password: "12311",
      communities: {
        create: {
          desc: "A new community created for 2",
          name: "01node community2",
          tags: {
            create: {
              name: "DEFI",
            },
          },
          image: {
            create: {
              publicId: "https://static.vecteezy.com/system/resources/previews/002/928/556/non_2x/silhouette-of-businessman-standing-on-mountain-looking-flag-on-hill-at-sunset-business-target-and-success-concept-free-photo.jpg"
            }
          },
          link: "https://www.o1node.com",
          missions: {
            create: {
              desc: "A new mission for a community2",
              name: "Win 100XP",
              rewards: "100XP",
              category: "NFTs",
              state: "PENDING",
              submissionType: "URL",
            },
          }
        },
      },
      walletAddress: "0x9DFc87276e0abcea0BF09ED88d7aE6AB9C42a7F0",
    },
  ];
}

