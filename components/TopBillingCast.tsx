import { useTopBilledCast } from "@/hooks/useTopBilled";
import useCrewStore from "@/store/useCrewStore";
import { CastMember, Credits, CrewMember } from "@/types";
import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const TopBillingCast = (id: { id: string | string[] }) => {
  const castInfo = useTopBilledCast(Number(id.id));
  const castDetails = castInfo.data;
  const [cast, setCast] = useState<CastMember[]>([]);
  const setCrew = useCrewStore((state) => state.setCrew);
  useEffect(() => {
    if (castInfo.data) {
      const { cast, crew } = castInfo.data as any;
      setCast(cast.slice(0, 7));
      setCrew(
        crew.filter((member: any) =>
          ["Director", "Producer", "Writer"].includes(member.job)
        )
      );
    }
  }, [castInfo.data]);
  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
      <div className="flex overflow-x-auto gap-10 flex-wrap lg:flex-nowrap flex-row lg:gap-5 items-center justify-center space-x-4">
        {cast.map((member) => (
          <div key={member.id} className="text-center">
            <Image
              isZoomed
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                  : "/image/forbidden.png"
              }
              alt={member.name}
              className="h-fit md:w-[400px] lg:w-[250px] object-cover rounded-lg"
            />
            <div className="mt-2">
              <p className="font-bold text-[16px] min-w-max ">{member.name}</p>
              <p className="text-gray-500 text-[14px]">
                {member.character.split("/")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBillingCast;
