import React, { useEffect, useState } from "react";
import {
  InteractionsData,
  InteractionDetailsData,
} from "../../../../shared/types";
import Scripts from "../../../../shared/utils/clientScripts";
import Loader from "../../../Loader/Loader";
import InteractionsDetailsOpen from "../InteractionsDetailsOpen/InteractionsDetailsOpen";
import { InteractionsDetailsProps } from "../InteractionsDetailsTypes";
import { useDetailsForm } from "../InteractionsDetailsHooks";

/** Детальная форма согласования для канала Email */
function InteractionsDetailsEmail(props: InteractionsDetailsProps) {
  const { data, reloadData, taskId } = props;

  const {
    isLoading,
    interactionsDetailsData,
    fetchInteractionsDetails,
  } = useDetailsForm(data.id, Scripts.getInteractionsDetails)

  return (
    <>
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="interactions-details">
          {interactionsDetailsData && (
            <div className="interactions-details__content">
              <InteractionsDetailsOpen
                data={interactionsDetailsData}
                interactionId={data.id}
                taskId={taskId}
                onSave={fetchInteractionsDetails}
                reloadData={reloadData}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default InteractionsDetailsEmail;
