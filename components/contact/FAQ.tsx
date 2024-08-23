"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import { FaLink } from "react-icons/fa";

const FAQ = () => {
  return (
    <div className="flex px-[64px] py-[80px] flex-col lg:flex-row gap-5">
      <div className="flex flex-col gap-5 w-full items-center lg:items-start">
        <p className="text-[48px] font-bold leading-[120%] text-white">FAQs</p>
        <div className="text-[18px] font-normal leading-[150%] text-white">
          Find answers to common questions and get quick information.
        </div>
      </div>
      <Accordion>
        <AccordionItem
          className="text-left"
          key="signup"
          aria-label="How to sign up?"
          indicator={<FaLink color="white" />}
          title="How to sign up?"
        >
          Signing up is simple! Just click on the "Sign Up" button at the top
          right corner of the homepage. You&apos;ll need to provide your email
          address or you can use the other platform for sign-up as well.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="search"
          aria-label="How to search for movies and shows?"
          indicator={<FaLink color="white" />}
          title="How to search for movies and shows?"
        >
          You can search for movies, TV shows, and other content by using the
          search bar located at the top of every page. Type in a title or
          keyword, and our search engine will display relevant results
          instantly.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="watch"
          aria-label="How to watch content?"
          indicator={<FaLink color="white" />}
          title="How to watch content?"
        >
          Once you find a movie or show you&apos;re interested in, click on it
          to view more details. If it's available for streaming, you&apos;ll see
          the platforms where it&apos;s accessible.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="create-list"
          aria-label="How to create a watchlist?"
          indicator={<FaLink color="white" />}
          title="How to create a watchlist?"
        >
          After logging in, you can create a personalized watchlist by adding
          movies and shows to it. Simply click on the “Add to Watchlist” button
          on any movie or show&apos;s detail page.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="contact"
          aria-label="How to contact us?"
          indicator={<FaLink color="white" />}
          title="How to contact us?"
        >
          If you have any questions or need support, you can contact us through
          the "Contact Us" page. Fill out the form with your inquiry, and our
          team will get back to you as soon as possible.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="rate"
          aria-label="Can I rate movies and shows?"
          indicator={<FaLink color="white" />}
          title="Can I rate movies and shows?"
        >
          At this time, our platform does not support a rating system. However,
          we are working on adding this feature in the future. Stay tuned for
          updates!
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
