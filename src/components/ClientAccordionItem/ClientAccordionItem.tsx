import { AccordionItem } from "@szhsin/react-accordion";
import { useAccordionState } from "@szhsin/react-accordion";
import { FAQ } from "../ClientAccordion/ClientAccordion";
import s from "./ClientAccordionItem.module.css";
export default function ClientAccordionItem({ item }: { item: FAQ }) {
  const { getItemState, toggle } = useAccordionState();
  const isOpen = getItemState(item.id).isEnter;

  return (
    <AccordionItem
      header={
        <div className={s.itemHeader}>
          <p className={s.question}>{item.Question}</p>
          <span>{isOpen ? accordionMinus : accordionPlus}</span>
        </div>
      }
      className={`${s.accordionItem} ${isOpen ? s.accordionItemOpen : ""}`}
      buttonProps={{
        className: ({ isEnter }) => {
          return `${s.itemBtn} ${isEnter && s.itemBtnExpanded}`;
        },
      }}
      contentProps={{ className: s.itemContent }}
      panelProps={{ className: s.itemPanel }}
      itemKey={item.id}
      key={item.id}
    >
      {item.Answer}
    </AccordionItem>
  );
}

const accordionPlus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M14 5.25V22.75M22.75 14H5.25"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const accordionMinus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M22.75 14H5.25"
      stroke="#405BE7"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
