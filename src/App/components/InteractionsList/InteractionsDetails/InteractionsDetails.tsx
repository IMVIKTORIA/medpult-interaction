import React, { useEffect, useState } from "react";
import {
  InteractionsData,
  InteractionDetailsData,
  InteractionsChannel,
} from "../../../shared/types";
import { InteractionsDetailsProps } from "./InteractionsDetailsTypes";
import InteractionsDetailsEmail from "./InteractionsDetailsEmail/InteractionsDetailsEmail";
import InteractionsDetailsComment from "./InteractionsDetailsComment/InteractionsDetailsComment";
import InteractionsDetailsCall from "./InteractionsDetailsCall/InteractionsDetailsCall";
import InteractionsDetailsSms from "./InteractionsDetailsSms/InteractionsDetailsSms";

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const {data} = props;
  switch(data.channel) {
    case InteractionsChannel.incomingEmail:
    case InteractionsChannel.outgoingEmail:
    case InteractionsChannel.email:
      return <InteractionsDetailsEmail {...props} />
    case InteractionsChannel.comment:
      return <InteractionsDetailsComment {...props} />
    case InteractionsChannel.incomingCall:
    case InteractionsChannel.outgoingCall:
      return <InteractionsDetailsCall {...props} />
    case InteractionsChannel.incomingSms:
    case InteractionsChannel.outgoingSms:
      return <InteractionsDetailsSms {...props} />
    default: throw new Error("Некорректный тип канала поступления: " + data.channel)
  }
}

export default InteractionsDetails;
