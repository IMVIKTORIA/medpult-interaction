import React, { useEffect, useState } from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import Loader from "../../../Loader/Loader";
import { InteractionsDetailsProps } from "../InteractionsDetailsTypes";
import { useDetailsForm, useDetailsFormHandlers } from "../InteractionsDetailsHooks";
import InteractionsSms from "./InteractionsSms/InteractionsSms";
import ModalManager from "../../../InteractionsModal/ModalManager";

/** Детальная форма согласования для канала Комментарий */
function InteractionsDetailsSms(props: InteractionsDetailsProps) {
  const { data, reloadData } = props;

  const { isLoading, interactionsDetailsData, fetchInteractionsDetails } = useDetailsForm(data.id, Scripts.getInteractionsSms)

  const { handleRemoveClick, checkCanEdit, isShowEditButtons, modalStates, closeModal } = useDetailsFormHandlers(data, reloadData)

  return (
    <>
      {/* Модальные окна */}
      <ModalManager
          {...modalStates}
          closeModal={closeModal}
          interactionId={data.id}
          initialText={interactionsDetailsData?.comment}
          initialFio={data.fioEdit}
          initialPhone={data.numberPhone}
          initialLogChan={data.logChan}
          reloadData={reloadData}
      />
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="interactions-details">
          {interactionsDetailsData && (
            <div className="interactions-details__content">
                <InteractionsSms
                  {...modalStates}
                  interactionId={data.id}
                  interactionsSmsData={interactionsDetailsData}
                  channelCode={data.channel}
                  handleRemoveClick={handleRemoveClick}
                  isShowEditButtons={isShowEditButtons}
                  checkCanEdit={checkCanEdit}
                />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default InteractionsDetailsSms;
