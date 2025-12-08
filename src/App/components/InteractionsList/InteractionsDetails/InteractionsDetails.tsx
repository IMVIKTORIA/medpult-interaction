import React, { useEffect, useState } from "react";
import {
  InteractionsData,
  InteractionDetailsData,
} from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import Loader from "../../Loader/Loader";
import InteractionsDetailsOpen from "./InteractionsDetailsOpen/InteractionsDetailsOpen";

/** Пропсы */
interface InteractionsDetailsProps {
  /** Данные взаимодействия */
  data: InteractionsData;
  /** Обработчик нажатия на строку */
  onClickRowHandler: () => any;
  /** Перезагрузить список */
  reloadData: () => void;
  /** Список взаимодействий */
  items: InteractionsData[];
  /** Установить список взаимодействий */
  setItems: React.Dispatch<React.SetStateAction<InteractionsData[]>>;
  /** Идентификатор задачи */
  taskId?: string;
}

/** Детальная форма согласования */
function InteractionsDetails(props: InteractionsDetailsProps) {
  const { data, reloadData, items, setItems, taskId } = props;

  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Детальные данные взаимодействия
  const [interactionsDetailsData, setInteractionsDetailsData] =
    useState<InteractionDetailsData>();
  // Получить детальные данные взаимодействия
  const fetchInteractionsDetails = async () => {
    const detailsData = await Scripts.getInteractionsDetails(data.id);
    setInteractionsDetailsData(detailsData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    fetchInteractionsDetails();
  };

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata();
  }, []);

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

export default InteractionsDetails;
