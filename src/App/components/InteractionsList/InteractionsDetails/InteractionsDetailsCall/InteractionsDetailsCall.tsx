import React, { useEffect, useState } from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import Loader from "../../../Loader/Loader";
import InteractionsDetailsOpen from "../InteractionsDetailsOpen/InteractionsDetailsOpen";
import { InteractionsDetailsProps } from "../InteractionsDetailsTypes";
import { useDetailsForm } from "../InteractionsDetailsHooks";
import InteractionsCall from "./InteractionsCall/InteractionsCall";

/** Детальная форма согласования для канала Звонок */
function InteractionsDetailsCall(props: InteractionsDetailsProps) {
  const { data, reloadData, taskId } = props;

  const {
    isLoading,
    interactionsDetailsData,
    fetchInteractionsDetails,
  } = useDetailsForm(data.id, Scripts.getInteractionsCall)

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
                <InteractionsCall
                  interactionsCallData={interactionsDetailsData}
                  channelCode={data.channel}
                  setIsShowCallInModal={(value: boolean) => {}}
                  setIsShowCallOutModal={(value: boolean) => {}}
                  handleRemoveClick={async () => {}}
                  isShowEditButtons={false}
                  checkCanEdit={() => false}
                />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default InteractionsDetailsCall;
