import { useState, useEffect } from "react";
export default function SelectedContact({
  setSelectedContactID, // Function to go "back" to contactlist view by resetting ID
  selectedContactID, // ID of the contact currently selected
}) {
  // STEP 1: Local state to store fetched data for the selected contact
  const [contact, setContact] = useState(null);

  // STEP 2: Log for debugging
  console.log(`Current selected contact ${contact}`);

  // STEP 3: Fetch the contact's full detail when component mounts
  useEffect(() => {
    // useEffect here ensures we fetch fresh data only once per selection

    const fetchContact = async () => {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactID}`
        );
        const resultJson = await response.json();
        setContact(resultJson); // Stores the fetched contact in local state
      } catch (error) {
        console.error("failed to fetch contact", error);
      }
    };
    fetchContact(); // Trigger fetch function on mount
  }, []); // Empty dependency array — this only runs once when component mounts

  // STEP 4: While the data is loading, show a loading message
  if (!contact) return <p>Loading contact...</p>;

  // STEP 5: Render a single-row table showing full details
  // Clicking this row sets the selectedContactid back to null → returns to contactlist view
  return (
    <table style={{ width: "100%", tableLayout: "fixed" }}>
      <thead>
        <tr>
          <th colSpan="3">Selected Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        <tr onClick={() => setSelectedContactID(null)}>
          {/* STEP 6: Display contact's name, email, phone */}
          <td>{contact.name}</td>
          <td>{contact.email}</td>
          <td>{contact.phone}</td>
        </tr>
      </tbody>
    </table>
  );
}
