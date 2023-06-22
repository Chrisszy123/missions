const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function CreateUser() {
  // delete all db items before creating
  await db.user.deleteMany();
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: user,
      });
    })
  );
}
async function createCommunity() {
  // delete all db items before creating
  await db.community.deleteMany();
  await Promise.all(
    getCommunities().map((community) => {
      return db.community.create({
        data: community,
      });
    })
  );
}
async function createMission() {
  // delete all db items before creating
  await db.mission.deleteMany();
  await Promise.all(
    getMissions().map((mission) => {
      return db.mission.create({
        data: mission,
      });
    })
  );
}
async function seed() {
  try {
    await CreateUser();
    await createCommunity();
    await createMission();
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
      email: "bassygoodluck@gmail.com",
      name: "John Doe",
      username: "JohnD",
      role: "BASIC",
      password: "12311",
      walletAddress: "0x9DFc87276e0abcea0BF09ED88d7aE6AB9C42a7F8",
    },
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4300",
      email: "bb@email.com",
      name: "John Doe",
      username: "JohnDen",
      role: "ADMIN",
      password: "12311",
      walletAddress: "0x9DFc87276e0abcea0BF09ED88d7aE6AB9C42a7F0",
    },
  ];
}
function getCommunities() {
  const users = getUsers();
  return [
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4349",
      desc: "A new community created for 1",
      name: "01node community",
      tags: "Validators",
      userId: users[0].id,
      link: "https://www.o1node.com",
      secondaryLink: "https://www.example.com",
    },
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4390",
      desc: "A new community created for 2",
      name: "01node community 2",
      tags: "DEFI",
      userId: users[1].id,
      link: "https://www.o1nodes.com",
      secondaryLink: "https://www.example.com",
    },
  ];
}
function getMissions() {
  const users = getUsers();
  const community = getCommunities();
  return [
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4340",
      desc: "A new mission for a community",
      name: "Win a new car",
      rewards: "100XP",
      category: "NFTs",
      userId: users[0].id,
      communityId: community[0].id,
      state: "PENDING",
      submissionType: "URL",
    },
    {
      id: "90ba9d4b-83eb-4668-a944-4ee7486d4320",
      desc: "A new mission for a community 2",
      name: "Win a new trip",
      rewards: "200XP",
      category: "DEFI",
      userId: users[1].id,
      communityId: community[1].id,
      state: "OPEN",
      submissionType: "IMAGE",
    },
  ];
}
