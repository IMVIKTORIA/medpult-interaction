import React, { useEffect, useState } from "react";
import Scripts from "../../../shared/utils/clientScripts";
import { InteractionsChannel } from "../../../shared/types";
import Loader from "../../Loader/Loader";

function ChannelDropdown({
  onSelect,
}: {
  onSelect: (channel: string) => void;
}) {
  const [channels, setChannels] = useState<
    { value: string; data: { code: string } }[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  // Загрузка данных
  useEffect(() => {
    Scripts.getChannel()
      .then((data) => {
        setChannels(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("", error);
        setIsLoading(false);
      });
  }, []);

  // Фильтруем каналы, исключая значение с кодом "allChannel"
  const filteredChannels = channels.filter(
    (channel) => channel.data.code !== InteractionsChannel.allChannel
  );

  return (
    <>
      <div className="channel-dropdown">
        {isLoading ? (
          <Loader />
        ) : (
          filteredChannels.map((channel) => (
            <div
              key={channel.value}
              className="channel-dropdown__item"
              onClick={() => onSelect(channel.data.code)}
            >
              {channel.value}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ChannelDropdown;
