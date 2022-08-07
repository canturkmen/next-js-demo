import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import React from "react";

function HomePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"></meta> 
      </Head>
      <MeetupList meetups={props.meetups} />;
    </React.Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // Fetch data from an API.

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export async function getStaticProps() {
  // Fetch data from an API.
  const client = await MongoClient.connect(
    "mongodb+srv://CanTurkmen:9WzjPA1VZ47Y95HR@cluster0.t76i6e6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
