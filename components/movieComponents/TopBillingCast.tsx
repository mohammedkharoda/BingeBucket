import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { truncateSentence } from "@/config/turncate";
import { useTopBilledCast } from "@/hooks/useTopBilled";
import useCrewStore from "@/store/useCrewStore";
import { CastMember } from "@/types";

const TopBillingCast = (id: { id: string | string[] }) => {
  const castInfo = useTopBilledCast(Number(id.id));
  const [cast, setCast] = useState<CastMember[]>([]);
  const setCrew = useCrewStore((state) => state.setCrew);

  useEffect(() => {
    if (castInfo.data) {
      const { cast, crew } = castInfo.data as any;

      setCast(cast.slice(0, 6));
      setCrew(
        crew.filter((member: any) =>
          ["Director", "Producer", "Writer"].includes(member.job)
        )
      );
    }
  }, [castInfo.data]);

  return (
    <div className="lg:py-[50px] lg:px-[64px] px-[64px] py-[20px] font-sans">
      <h2 className="text-[45px] font-bold mb-4">Top Cast</h2>
      <div
        className={`${
          cast.length === 1
            ? "flex justify-center"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        } gap-5 items-center`}
      >
        {cast.map((member) => (
          <Card
            key={member.id}
            isHoverable
            isPressable
            className="text-center"
            radius="sm"
          >
            <CardHeader>
              <Image
                isZoomed
                alt={member.name}
                className={`${cast.length === 1 ? "w-[250px] h-fit" : "w-full h-auto object-cover rounded-lg"}`}
                src={
                  member.profile_path
                    ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                    : "/image/forbidden.png"
                }
              />
            </CardHeader>
            <CardBody>
              <div className="mt-2">
                <p className="font-bold text-[16px]">
                  {truncateSentence(member.name, 20)}
                </p>
                <p className="text-gray-500 text-[14px]">
                  {member.character.split("/")[0]}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopBillingCast;
