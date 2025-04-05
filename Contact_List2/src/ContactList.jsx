import { useState, useEffect } from "react";
import ContactRow from "./ContactRow";

// useEffect(..., [])	Runs once on mount. Used to fetch contacts from API.
// setContacts(result)	Saves the fetched contact list into state.
// key={contact.id}	Helps React uniquely identify each <ContactRow> for efficient updates.
// contact={contact}	Passes the full contact object down to the row (name, email, etc.).
// setSelectedContactid={...}	Allows each row to call this and update the selected contact in the parent.


export default function ContactList({ setSelectedContactID }) {
  // STEP 1: Define state to hold fetched contact list
  const [contacts, setContacts] = useState([]);

  // STEP 2: Log current contact (for debugging)
  console.log("Current contact:", ...contacts.sort());

  // STEP 3: Fetch contact data from API on component mount
  useEffect(() => {
    // useEffect here ensures the data is fetched AFTER the first render
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users`
        );
        const jsonResult = await response.json();
        setContacts(jsonResult); //save results in state
      } catch (error) {
        console.error("failed to fetch data from the API", error);
      }
    };
    fetchContacts(); //trigger fetch
  }, []); // Empty dependency array means: run only once when component mounts

  // STEP 4: Render contact list as a table
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {/* STEP 5: Map through contacts and render <ContactRow> for each contact */}
        {contacts.map((contact) => {
          return (
            <ContactRow
              key={contact.id}
              contact={contact} // 	Passes the full contact object down to the row (name, email, etc.).
              setSelectedContactID={setSelectedContactID} // Allows each row to call this and update the selected contact in the App parent.
            />
          );
        })}
      </tbody>
    </table>
  );
}
