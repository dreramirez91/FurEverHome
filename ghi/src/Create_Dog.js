import React, { useState } from "react"

function Create_Dog() {
    const [name, setName] = useState("")
    const [age, setAge] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [spayedNeutered, setSpayedNeutered] = useState(false);
    const [adopted, setAdopted] = useState(false);
    const [reason, setReason] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
}

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePictureUrlChange = (e) => {
    setPictureUrl(e.target.value);
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.checked);
  };
  const handleSpayedNeuteredChange = (e) => {
    setSpayedNeutered(e.target.value);
  };
  const handleAdoptedChange = (e) => {
    setAdopted(e.target.checked);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.checked);
  };
  const handleAddressCityChange = (e) => {
    setAddressCity(e.target.checked);
  };
  const handleAddressStateChange = (e) => {
    setAddressState(e.target.checked);
  };

return (
  <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Create Dog</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={handleAgeChange}
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={pictureUrl}
          onChange={handlePictureUrlChange}
        />
        <input
          type="text"
          placeholder="Sex"
          value={sex}
          onChange={handleSexChange}
        />
        <input
          type="checkbox"
          label="Breed"
          checked={breed}
          onChange={handleBreedChange}
        />
        <input
          type="checkbox"
          label="Spayed/Neutered"
          checked={spayedNeutered}
          onChange={handleSpayedNeuteredChange}
        />
        <input
          type="checkbox"
          label="Adopted"
          checked={adopted}
          onChange={handleAdoptedChange}
        />
        <input
          type="text"
          placeholder="Reason for adoption"
          value={reason}
          onChange={handleReasonChange}
        />
        <input
          type="text"
          placeholder="Address City"
          value={addressCity}
          onChange={handleAddressCityChange}
        />
        <input
          type="text"
          placeholder="Address State"
          value={addressState}
          onChange={handleAddressStateChange}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  </div>
);
