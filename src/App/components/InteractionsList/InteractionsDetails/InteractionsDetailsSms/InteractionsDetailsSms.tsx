import React, { useEffect, useState } from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import Loader from "../../../Loader/Loader";
import { InteractionsDetailsProps } from "../InteractionsDetailsTypes";
import { useDetailsForm } from "../InteractionsDetailsHooks";
import InteractionsSms from "./InteractionsSms/InteractionsSms";

/** Детальная форма согласования для канала Комментарий */
function InteractionsDetailsSms(props: InteractionsDetailsProps) {
  const { data } = props;

  const {
    isLoading,
    interactionsDetailsData,
    fetchInteractionsDetails,
  } = useDetailsForm(data.id, Scripts.getInteractionsSms)

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
                <InteractionsSms
                  interactionId={data.id}
                  interactionsSmsData={interactionsDetailsData}
                  channelCode={data.channel}
                  setIsShowSmsInModal={(value: boolean) => {}}
                  setIsShowSmsOutModal={(value: boolean) => {}}
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

export default InteractionsDetailsSms;
