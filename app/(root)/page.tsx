import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const query = (await searchParams).query;

  // const posts = await client.fetch(STARTUPS_QUERY);

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Rohith", image: "https://placehold.co/48x48" },
  //     _id: 1,
  //     description: "This is description",
  //     image: "https://techcrunch.com/wp-content/uploads/2024/10/Screenshot-2024-10-10-at-9.09.45PM.png",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ]

  
  // console.log(JSON.stringify(posts, null, 2))

  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      {/* <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            )) 
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section> */}

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id}  post={post}/>
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  )
}