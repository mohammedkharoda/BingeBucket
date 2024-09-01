import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { useTopBilledSeriesCast } from "@/hooks/useSeriesCredits";
import useCrewStore from "@/store/useCrewStore";
import { CastMember } from "@/types";

const TopBillingSeriesCast = (id: { id: string | string[] }) => {
  const castInfo = useTopBilledSeriesCast(Number(id.id));
  const [cast, setCast] = useState<CastMember[]>([]);
  // crew store hook of state mangement is common one for the crew members
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
      {cast.length > 0 && (
        <>
          <h2 className="text-[45px] font-bold mb-4">Top Cast</h2>
          <div className="flex justify-center items-center flex-wrap gap-5">
            {cast.map((member) => (
              <Card
                key={member.id}
                isHoverable
                isPressable
                className="text-center flex-shrink-0"
                radius="sm"
                style={{ width: "200px" }} // Adjust width for consistency
              >
                <CardHeader>
                  <Image
                    isZoomed
                    alt={member.name}
                    className="w-full h-auto object-cover rounded-lg"
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                        : "/image/forbidden.png"
                    }
                  />
                </CardHeader>
                <CardBody>
                  <div className="mt-2">
                    <p className="font-bold text-[16px] text-center">
                      {member.name}
                    </p>
                    <p className="text-gray-500 text-[14px] text-center min-w-max">
                      {member.character.split("/")[0]}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TopBillingSeriesCast;
