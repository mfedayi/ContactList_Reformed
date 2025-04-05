export default function ContactRow({ setSelectedContactID, contact }) {
  // STEP 1: Defensive check — avoid rendering if contact is undefined/null
  if (!contact) {
    console.warn("ContactRow received undefined or null contact");
    return null;
  }
  // STEP 2: Render a single row of contact info
  // When this row is clicked, it calls the function to update the selected contact ID
  return (
    <tr
      onClick={() => {
        // Call the setter function passed from App parent to set the selected contact ID
        // This will cause App to show the <SelectedContact> component
        setSelectedContactID(contact.id);
      }}
    >
      {/* STEP 3: Display individual contact info */}
      <td>{contact.name}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
    </tr>
  );
}
