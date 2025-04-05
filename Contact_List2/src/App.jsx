import { useState } from "react";
import "./App.css";
import ContactList from "./ContactList";
import SelectedContact from "./SelectedContact";

function App() {
  // STEP 1: State to track which contact is currently selected
  const [selectedContactID, setSelectedContactID] = useState(null);

  // STEP 2: Log the currently selected ID (for debugging)
  console.log(`Current selected ID: ${selectedContactID}`);

  // STEP 3: Conditional rendering logic
  // If an ID is selected, show <SelectedContact>
  // Otherwise, show the full contact list
  return (
    <>
      {selectedContactID ? (
        <SelectedContact
          setSelectedContactID={setSelectedContactID} // Pass setter to allow going back
          selectedContactID={selectedContactID} // Pass current selected ID
        />
      ) : (
        <ContactList setSelectedContactID={setSelectedContactID} />
      )}
    </>
  );
}

export default App;
