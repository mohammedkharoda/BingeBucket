"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";
import { FaLink } from "react-icons/fa";

const FAQ = () => {
  return (
    <div className="flex px-[64px] py-[80px]">
      <div className="flex flex-col gap-5 w-full items-start">
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
          Signing up is easy! Just click on the "Sign Up" button on the top
          right corner of the homepage. You'll need to provide your email
          address, create a password, and confirm your email.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="search"
          aria-label="How to search?"
          indicator={<FaLink color="white" />}
          title="How to search?"
        >
          You can search for movies, TV shows, and more by using the search bar
          at the top of the page. Simply type in the name or keyword, and press
          Enter to see the results.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="watch"
          aria-label="How to watch?"
          indicator={<FaLink color="white" />}
          title="How to watch?"
        >
          After finding a movie or show, click on it to see more details. If
          it's available to stream, you'll see options for watching it directly
          or where it's available online.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="rate"
          aria-label="How to rate?"
          indicator={<FaLink color="white" />}
          title="How to rate?"
        >
          To rate a movie or show, you'll need to be logged in. Once logged in,
          you can give it a star rating and leave a review from the detail page
          of the movie or show.
        </AccordionItem>
        <AccordionItem
          className="text-left"
          key="contact"
          aria-label="How to contact?"
          indicator={<FaLink color="white" />}
          title="How to contact?"
        >
          You can reach out to us through our contact form available on the
          "Contact Us" page. We're here to help with any inquiries or issues you
          may have.
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
