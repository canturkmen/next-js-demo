import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  // Fetch data from an API.
  const client = await MongoClient.connect(
    "mongodb+srv://CanTurkmen:9WzjPA1VZ47Y95HR@cluster0.t76i6e6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  // Fetch all the id fields from each meetup document.
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // Fetch data from an API.
  const client = await MongoClient.connect(
    "mongodb+srv://CanTurkmen:9WzjPA1VZ47Y95HR@cluster0.t76i6e6.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");

  // Fetch all the id fields from each meetup document.
  const selectedMeetup = await meetupCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
