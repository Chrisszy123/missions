import Layout from "@/components/Layout";
import Description from "@/components/Description";
import Details from "./Details";



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

const provenance = [
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                 <span>0x56C1...8eCC</span>
            </>
        ),
        price: "Denied",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                 <span>@randomdash</span>
            </>
        ),
        price: "pending",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
    {
        avatar: "/images/avatar.jpg",
        history: true,
        content: (
            <>
                <span>@randomdash</span>
            </>
        ),
        price: "Approved",
        date: "Aug 18, 2022 at 18:80",
        url: "https://ui8.net/",
    },
];

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
  const statistics = [
    {
      label: "Community",
      image: mission ? mission?.community?.image :"/images/robot.jpg",
      title: mission ? mission?.community?.name : "",
      category: mission ? mission?.community?.tags[0].name : "",
      link: mission ? `/communities/${mission?.community?.id}` : "#"
    },
  ];
  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {mission ? (
        <>
          <Description
            image={mission ? mission?.community?.image :"/images/robot.jpg"}
            title={mission.name}
            date={`created at ${mission.createdAt.slice(0, 10)}`}
            statistics={statistics}
            links={links}
            tags={mission.category}
            // provenanceAction={{
            //   avatar: "/images/avatar.jpg",
            //   history: true,
            //   content: (
            //     <>
            //       Auction won by <span>0x56C1...8eCC</span>
            //     </>
            //   ),
            //   title: (
            //     <>
            //       Sold for <span>6.05 ETH</span> $9,256.58
            //     </>
            //   ),
            //   date: "Aug 18, 2022 at 18:80",

            //   linkTitle: (
            //     <>
            //       Auction settled by <span>@Kohaku</span>
            //     </>
            //   ),
            //   linkUrl: "#",
            // }}
            provenance={mission}
            content={mission.desc}
            missionData={mission}
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
