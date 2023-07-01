import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "./Details";

const statistics = [
  {
    label: "Created by",
    avatar: "/images/avatar.jpg",
    history: true,
    title: "Dash",
    login: "randomdash",
  },
  {
    label: "Community",
    image: "/images/robot.jpg",
    title: "Cute Planet",
    category: "DEFI",
  },
];

const links = [
  {
    title: "View on Etherscane",
    icon: "country",
    url: "https://ui8.net/",
  },
  {
    title: "View metadata",
    icon: "link",
    url: "https://ui8.net/",
  },
  {
    title: "View on IPFS",
    icon: "link",
    url: "https://ui8.net/",
  },
];

// const provenance = [
//     {
//         avatar: "/images/avatar.jpg",
//         history: true,
//         content: (
//             <>
//                 Bid placed by <span>0x56C1...8eCC</span>
//             </>
//         ),
//         price: "5.00 ETH",
//         date: "Aug 18, 2022 at 18:80",
//         url: "https://ui8.net/",
//     },
//     {
//         avatar: "/images/avatar.jpg",
//         history: true,
//         content: (
//             <>
//                 Listed by <span>@randomdash</span>
//             </>
//         ),
//         price: "5.00 ETH",
//         date: "Aug 18, 2022 at 18:80",
//         url: "https://ui8.net/",
//     },
//     {
//         avatar: "/images/avatar.jpg",
//         history: true,
//         content: (
//             <>
//                 Minted by <span>@randomdash</span>
//             </>
//         ),
//         price: "5.00 ETH",
//         date: "Aug 18, 2022 at 18:80",
//         url: "https://ui8.net/",
//     },
// ];

const tags = [
  "Cute",
  "Robot",
  "Cute Planet",
  "Suitcase",
  "Spaceship",
  "Animation",
  "Redshift Render",
  "3D",
  "Character",
  "Cinema 4D",
];

const MintNFTPage = ({ mission }: any) => {
  console.log("mission ====")
  console.log(mission)
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {mission?.length > 0 ? (
        <>
          <Description
            image="/images/cute-planet-large.jpg"
            title={mission[0].name}
            date={`created at ${mission[0].createdAt.slice(0, 10)}`}
            statistics={statistics}
            links={links}
            tags={mission[0].category}
            provenanceAction={{
              avatar: "/images/avatar.jpg",
              history: true,
              content: (
                <>
                  Auction won by <span>0x56C1...8eCC</span>
                </>
              ),
              title: (
                <>
                  Sold for <span>6.05 ETH</span> $9,256.58
                </>
              ),
              date: "Aug 18, 2022 at 18:80",

              linkTitle: (
                <>
                  Auction settled by <span>@Kohaku</span>
                </>
              ),
              linkUrl: "#",
            }}
            content={mission[0].desc}
          >
            <Details mission={mission} />
          </Description>
        </>
      ) : (
        <div>mission data loading...</div>
      )}
    </Layout>
  );
};

export default MintNFTPage;
