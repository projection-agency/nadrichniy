// import {
//   Accordion,
//   AccordionItem,
//   useAccordionProvider,
// } from "@szhsin/react-accordion";
// import s from "./ClientAccordion.module.css";

// export default function CLientAccordion({ items }) {
//   const providerValue = useAccordionProvider({
//     transition: true,
//     transitionTimeout: 250,
//   });

//   const { toggle, toggleAll } = providerValue;
//   console.log(items);
//   return (
//     <Accordion className={s.accordion}>
//       {items.map((item, idx) => {
//         return (
//           <AccordionItem
//             header={
//               <div className={s.itemHeader}>
//                 <p className={s.question}>{item.Question}</p>
//                 <button>
//                   <span>{}</span>
//                 </button>
//               </div>
//             }
//             className={s.accordionItem}
//             buttonProps={{
//               onClick: () => {
//                 toggle(idx);
//               },
//               className: ({ isEnter }) => {
//                 return `${s.itemBtn} ${isEnter && s.itemBtnExpanded}`;
//               },
//             }}
//             key={idx}
//           >
//             {item.Answer}
//           </AccordionItem>
//         );
//       })}
//     </Accordion>
//   );
// }

// const accordionPlus = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="28"
//     height="28"
//     viewBox="0 0 28 28"
//     fill="none"
//   >
//     <path
//       d="M14 5.25V22.75M22.75 14H5.25"
//       stroke="white"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//   </svg>
// );
