const cardNameInputs = [
  {
    label: "Title",
    type: "text",
    id: "cardName",
    placeholder: "Work",
  },
];
const personalDataInputs = [
  {
    label: "First Name",
    type: "text",
    id: "firstName",
    placeholder: "Jane",
  },
  {
    label: "Last Name",
    type: "text",
    id: "lastName",
    placeholder: "Doe",
  },
  {
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "JaneDoe@gmail.com",
  },

  {
    label: "Cell Number",
    type: "tel",
    id: "cellPhone",
    pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}",
    placeholder: "555-555-5555",
  },

  {
    label: "Job Title",
    type: "text",
    id: "title",
    placeholder: "Software Developer",
  },

  {
    label: "Portfolio Site",
    type: "url",
    id: "url",
    placeholder: "MyPortfolio.com",
  },
];

const homeAddressInputs = [
  {
    label: "Street Address",
    type: "text",
    id: "homeAddress.street",
    placeholder: "123 Main Street",
    value: ["homeAddress", "street"],
  },
  {
    label: "City",
    type: "text",
    id: "homeAddress.city",
    placeholder: "San Francisco",
    value: ["homeAddress", "city"],
  },
  {
    label: "State / Province",
    type: "text",
    id: "homeAddress.stateProvince",
    placeholder: "California",
    value: ["homeAddress", "stateProvince"],
  },
  {
    label: "ZIP / Postal code",
    type: "text",
    id: `homeAddress.postalCode`,
    placeholder: "California",
    value: ["homeAddress", "postalCode"],
  },
];

const socialLinksInputs = [
  {
    label: "LinkedIn",
    type: "text",
    id: "socialUrls.linkedIn",
    placeholder: "example.com",
    value: ["socialUrls", "linkedIn"],
  },
  {
    label: "Facebook",
    type: "text",
    id: "socialUrls.facebook",
    placeholder: "example.com",
    value: ["socialUrls", "facebook"],
  },
  {
    label: "Twitter",
    type: "text",
    id: "socialUrls.twitter",
    placeholder: "example.com",
    value: ["socialUrls", "twitter"],
  },
];

const workInfoInputs = [
  {
    label: "Organization Name",
    type: "text",
    id: "organization",
    placeholder: "Promotely",
  },
  {
    label: "Company Website",
    type: "text",
    id: "workUrl",
    placeholder: "www.Promotely.com",
  },
  {
    label: "Work Phone",
    type: "tel",
    id: "workPhone",
    placeholder: "555-555-5555",
  },
  {
    label: "Work Fax",
    type: "tel",
    id: "workFax",
    placeholder: "123-123-3445",
  },
  {
    label: "Work Email",
    type: "email",
    id: "workEmail",
    placeholder: "Jane@Promotely.com",
  },
  {
    label: "Street Address",
    type: "text",
    id: "workAddress.street",
    value: ["workAddress", "street"],
    placeholder: "123 Main Street",
  },
  {
    label: "City",
    type: "text",
    id: "workAddress.city",
    placeholder: "San Francisco",
    value: ["workAddress", "city"],
  },
  {
    label: "State / Province",
    type: "text",
    id: "workAddress.stateProvince",
    placeholder: "California",
    value: ["workAddress", "stateProvince"],
  },
  {
    label: "ZIP / Postal code",
    type: "text",
    id: "workAddress.postalCode",
    value: ["workAddress", "postalCode"],
    placeholder: "92115",
  },
];

export {
  cardNameInputs,
  personalDataInputs,
  homeAddressInputs,
  socialLinksInputs,
  workInfoInputs,
};
