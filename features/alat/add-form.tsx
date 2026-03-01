// "use client";

// import { useState } from "react";

// const items = [
//   {
//     label: "Nama Alat",
//     name: "nama-alat",
//     placeholder: "Nama Alat",
//   },
//   {
//     label: "Merek",
//     name: "merek-alat",
//     placeholder: "Merek",
//   },
//   {
//     label: "Tipe",
//     name: "tipe-alat",
//     placeholder: "Tipe",
//   },
//   {
//     label: "No. Seri",
//     name: "no-seri",
//     placeholder: "No. Seri",
//   },
//   {
//     label: "Ruangan",
//     name: "ruangan-alat",
//     placeholder: "Ruangan",
//   },
//   {
//     label: "Tahun",
//     name: "tahun-alat",
//     placeholder: "Tahun",
//   },
// ]
// export default function TambahAlat() {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData);

//     try {
//       await createAlat(data);
//       e.currentTarget.reset();
//       // Add success notification here
//     } catch (error) {
//       console.error("Error creating alat:", error);
//       // Add error notification here
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <FieldGroup>
//         <FieldSet>
//           <FieldLegend>Tambah Alat</FieldLegend>
//           <FieldDescription>Form mengisi alat medis baru</FieldDescription>
//           <FieldGroup>
//             {items.map((item) => (
//               <Field key={item.name}>
//                 <FieldLabel htmlFor={item.name}>{item.label}</FieldLabel>
//                 <Input
//                   id={item.name}
//                   name={item.name}
//                   placeholder={item.placeholder}
//                   required
//                 />
//               </Field>
//             ))}
//           </FieldGroup>
//         </FieldSet>
//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </FieldGroup>
//     </form>
//   );
// }