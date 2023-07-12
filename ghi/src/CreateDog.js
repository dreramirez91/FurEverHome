import React, { useState } from "react"

function CreateDog() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [spayedNeutered, setSpayedNeutered] = useState(false);
  const [reason, setReason] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");

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
    setBreed(e.target.value);
  };
  const handleSpayedNeuteredChange = (e) => {
    setSpayedNeutered(e.target.checked);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleAddressCityChange = (e) => {
    setAddressCity(e.target.value);
  };
  const handleAddressStateChange = (e) => {
    setAddressState(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Dog</h1>
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={name}
                placeholder="Name"
                required
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAgeChange}
                value={age}
                placeholder="Age"
                required
                type="number"
                id="age"
                name="age"
                className="form-control"
              />
              <label htmlFor="age">Age</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePictureUrlChange}
                value={pictureUrl}
                placeholder="Picture URL"
                required
                type="text"
                id="picture_url"
                name="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleSexChange}
                value={sex}
                placeholder="Sex"
                required
                type="text"
                id="sex"
                name="sex"
                className="form-control"
              />
              <label htmlFor="sex">Sex</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleBreedChange}
                value={breed}
                placeholder="Breed"
                required
                type="text"
                id="breed"
                name="breed"
                className="form-control"
              />
              <label htmlFor="breed">Breed</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                onChange={handleReasonChange}
                value={reason}
                placeholder="Reason"
                required
                name="reason"
                className="form-control"
              ></textarea>
              <label htmlFor="reason">Reason</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressCityChange}
                value={addressCity}
                placeholder="Address City"
                required
                type="text"
                name="address_city"
                className="form-control"
              />
              <label htmlFor="address_city">Address City</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressStateChange}
                value={addressState}
                placeholder="Address State"
                required
                type="text"
                name="address_state"
                className="form-control"
              />
              <label htmlFor="address_state">Address State</label>
            </div>
            <div className="form-check mb-3">
              <input
                onChange={handleSpayedNeuteredChange}
                checked={spayedNeutered}
                required
                type="checkbox"
                name="spayed_neutered"
                className="form-check-input"
              />
              <label htmlFor="spayed_neutered" className="form-check-label">
                Spayed/Neutered
              </label>
            </div>
            <button className="btn btn-primary">Create Dog</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDog;
