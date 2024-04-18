import { Button, MasonryContainer, QuilContent } from "@/libs/components/atoms";
import Card from "@/libs/components/molecules/card";
import BlogList from "@/libs/components/molecules/blog-list";
import { NavBar } from "@/libs/components/organisms/navbar";
import { getUser } from "@/app/actions";
import { getSession } from "@/libs/utils";

import Image from "next/image"
import Link from "next/link"
import { SquarePen } from "lucide-react"

export default async function Home() {
  const user = await getUser()
  const session = getSession()
  if (user && !user?.banner) {
    const placholderImage = await fetch('https://source.unsplash.com/random/?write')
    user.banner = placholderImage.url
  }


  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar
        title={user?.name.split(" ")[0] ?? ""}
        isSearchable={true}
        className="w-full"
      >
        {session &&
          <Link href="/blog/add">
            <Button variant="bordered" className="p-1 px-2 text-secondary flex gap-2 items-center">
              <SquarePen />
              <h1 className="">Tulis</h1>
            </Button>
          </Link>
        }
      </NavBar>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 mt-4">

        <div className="px-4 md:px-8 md:top-16 md:h-full md:col-span-1 my-4 md:my-0 w-full justify-center">
          <Card className="block md:sticky md:top-24 px-2 py-5 w-full bg-white bg-opacity-85">
            <div className="mb-4 flex justify-center">
              {
                user?.avatar &&
                <div className="relative w-40 h-40 rounded-full">
                  <Image
                    fill={true}
                    className="w-40 h-40 object-cover rounded-full"
                    src={user?.avatar ?? ""}
                    alt="banner"
                  />
                </div>
              }
            </div>
            <div className="flex justify-between px-3 pt-4 items-center">
              <h1 className="text-2xl font-semibold col-span-2">{user?.name}</h1>

              {
                session &&
                <Link className="w-fit text-grey h-fit col-span-1" href={`/profile`}>
                  <SquarePen color="grey" />
                </Link>
              }
            </div>
            {
              user?.bio &&
              <QuilContent className="mt-2" content={user?.bio ?? ""} />
            }
          </Card>
        </div>

        <div className="col-span-2 min-h-screen w-full px-4 py-3 md:py-0 md:px-4">
          <div
            style={{
              backgroundImage: `url(${user?.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className={"hidden md:block w-full px-2 md:px-4 pt-4 h-40"}>
          </div>
          <MasonryContainer className="max-w-5xl mt-4 w-full">
            <BlogList />
          </MasonryContainer>
        </div>

      </div>


    </main>
  )
}
