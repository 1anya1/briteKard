// import FormDescription from "../styling/FormDescription";
// export default function Profile() {
//   const formName = "Profile";
//   const formDescription = "this is my form description";
//   return (
//     <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-white mb-5 max-w-4xl m-auto">
//       <div className="md:grid md:grid-cols-3 md:gap-3 pb-5 drop-shadow-md p-4">
//         <FormDescription
//           formName={formName}
//           formDescription={formDescription}
//         />
//         <div className="col-start-2 col-span-2">
//           <label
//             htmlFor="company-website"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Website
//           </label>
//           <div className="mt-1 flex rounded-md shadow-sm">
//             <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//               https://
//             </span>
//             <input
//               type="text"
//               name="company-website"
//               id="company-website"
//               className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
//               placeholder="www.example.com"
//             />
//           </div>
//         </div>

//         <div className="col-start-2 col-span-2">
//           <label
//             htmlFor="about"
//             className="block text-sm font-medium text-gray-700"
//           >
//             About
//           </label>
//           <div className="mt-1">
//             <textarea
//               id="about"
//               name="about"
//               rows={3}
//               className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
//               placeholder="Write something about yourself"
//               defaultValue={""}
//             />
//           </div>
//           <p className="mt-2 text-sm text-gray-500">
//             Brief description for your profile. URLs are hyperlinked.
//           </p>
//         </div>

//         <div className="col-start-2 col-span-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Photo
//           </label>
//           <div className="mt-1 flex items-center">
//             <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
//               <svg
//                 className="h-full w-full text-gray-300"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//             </span>
//             <button
//               type="button"
//               className="ml-5 bg-blue-400 py-2 px-3 border border-blue-400 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Change
//             </button>
//           </div>
//         </div>

//         <div className="col-start-2 col-span-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Cover photo
//           </label>
//           <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//             <div className="space-y-1 text-center">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 stroke="currentColor"
//                 fill="none"
//                 viewBox="0 0 48 48"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>

//               <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
