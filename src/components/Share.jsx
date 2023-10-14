import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Share = ({ title }) => {
  return (
    <div>
      <div className="mt-5 mb-10 flex items-center">
        <span className="mr-2">Share: </span>
        <EmailShareButton
          url={`${window.location}`}
          subject={title}
          className="mr-2 hover:opacity-70"
        >
          <EmailIcon size={35} round={true} />
        </EmailShareButton>
        <FacebookShareButton
          url={`${window.location}`}
          className="mr-2 hover:opacity-70"
        >
          <FacebookIcon size={35} round={true} />
        </FacebookShareButton>
        <TelegramShareButton
          url={`${window.location}`}
          className="mr-2 hover:opacity-70"
        >
          <TelegramIcon size={35} round={true} />
        </TelegramShareButton>
        <TwitterShareButton
          url={`${window.location}`}
          className="mr-2 hover:opacity-70"
        >
          <TwitterIcon size={35} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={`${window.location}`}
          className="mr-2 hover:opacity-70"
        >
          <WhatsappIcon size={35} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Share;
