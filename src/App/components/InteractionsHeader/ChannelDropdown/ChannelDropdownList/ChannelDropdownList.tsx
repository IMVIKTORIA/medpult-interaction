import React, { useEffect, useState } from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import { InteractionsChannel } from "../../../../shared/types";
import Loader from "../../../Loader/Loader";
import { getChannelData, getInteractionChannelTitle } from "../../../../shared/utils/utils";

function ChannelDropdownList({
  onSelect,
}: {
  onSelect: (channel: string) => void;
}) {
  const channelsCodes = [
    InteractionsChannel.comment,
    InteractionsChannel.incomingCall,
    InteractionsChannel.outgoingCall,
    InteractionsChannel.email,
    InteractionsChannel.incomingSms,
    InteractionsChannel.outgoingSms,
  ]

  const channels = channelsCodes.map(channel => getChannelData(channel))
  
  return (
    <>
      <div className="channel-dropdown">
        {
          channels.map((channel) => (
            <div
              key={channel.value}
              className="channel-dropdown__item"
              onClick={() => onSelect(channel.data.code)}
            >
              {channel.value}
            </div>
          ))
        }
      </div>
    </>
  );
}

export default ChannelDropdownList;
