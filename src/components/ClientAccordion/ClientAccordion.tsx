import {
  Accordion,
  AccordionItem,
  useAccordionState,
  useAccordionProvider,
  AccordionProvider,
} from "@szhsin/react-accordion";
import s from "./ClientAccordion.module.css";
import ClientAccordionItem from "../ClientAccordionItem/ClientAccordionItem";
export type FAQ = {
  Answer: string;
  Question: string;
  id: number;
};
export default function CLientAccordion({ items }: { items: FAQ[] }) {
  const providerValue = useAccordionProvider();
  return (
    <AccordionProvider value={providerValue}>
      <Accordion className={s.accordion}>
        {items.map((item, idx) => {
            return <ClientAccordionItem key={idx} item={item}/>
        })}
      </Accordion>
    </AccordionProvider>
  );
}

