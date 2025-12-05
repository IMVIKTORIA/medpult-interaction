import React, { useState, useEffect } from "react";
import ModalWrapper from "../../../../../InteractionsModal/ModalWrapper/ModalWrapper";
import icons from "../../../../../../shared/icons";
import ButtonModal from "./ButtonModal/ButtonModal";
import { SearchableSelect } from "./SearchableSelect/SearchableSelect";
import Scripts from "../../../../../../shared/utils/clientScripts";
import { ObjectItem } from "../../../../../../../UIKit/Filters/FiltersTypes";

interface ModalExecutorProps {
  interactionId: string;
  closeModal: () => void;
  initialGroup: ObjectItem | null;
  initialEmployee: ObjectItem | null;
  onSave?: () => void;
  reloadData?: () => void;
}

/** Модальное окно исполнителя */
export default function ModalExecutor({
  interactionId,
  closeModal,
  initialGroup,
  initialEmployee,
  onSave,
  reloadData,
}: ModalExecutorProps) {
  const [group, setGroup] = useState<ObjectItem | null>(initialGroup);
  const [employee, setEmployee] = useState<ObjectItem | null>(initialEmployee);

  const saveGroupExecutor = async () => {
    await Scripts.saveGroupExecutor(interactionId, group, employee);
    onSave?.();
    reloadData?.();
    closeModal();
  };

  return (
    <ModalWrapper>
      <div className="modal-executor">
        <div className="modal-executor__content">
          <div className="modal-executor__content__header">
            <span className="modal-executor__content__header_title">
              Исполнитель
            </span>
            <span onClick={closeModal} style={{ cursor: "pointer" }}>
              {icons.CloseModal}
            </span>
          </div>
          <div className="modal-executor__content__input">
            <SearchableSelect
              label="Группа"
              placeholder="Введите название группы"
              value={group}
              onSelect={setGroup}
              getDataHandler={() =>
                Scripts.getUserGroups(employee ? [employee.code] : [])
              }
            />

            <SearchableSelect
              label="Сотрудник"
              placeholder="Введите ФИО сотрудника"
              value={employee}
              onSelect={setEmployee}
              getDataHandler={() =>
                Scripts.getUsersInteraction(group ? [group.code] : [])
              }
            />
          </div>

          <div className="modal-executor__content__button">
            <ButtonModal
              title="Отменить"
              buttonType="outline"
              clickHandler={closeModal}
              style={{ width: "194px" }}
            />
            <ButtonModal
              title="Сохранить"
              clickHandler={saveGroupExecutor}
              style={{ width: "194px" }}
              disabled={!group?.code}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

// React.useLayoutEffect(() => {
//   Scripts.getUserGroups().then((items) => setGroups(items));
//   Scripts.getUsersInteraction().then((items) => setEmployees(items));
// }, []);
