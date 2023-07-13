import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function EditDog() {
  let { dog_id } = useParams();
  const { token } = useAuthContext();
  const [age, setAge] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [spayedNeutered, setSpayedNeutered] = useState(false);
  const [adopted, setAdopted] = useState(false);
  const [reason, setReason] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [email, setEmail] = useState("");

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePictureUrlChange = (e) => {
    setPictureUrl(e.target.value);
  };

  const handleSpayedNeuteredChange = (e) => {
    setSpayedNeutered(e.target.checked);
  };

  const handleAdoptedChange = (e) => {
    setAdopted(e.target.checked);
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};

    data.age = age;
    data.picture_url = pictureUrl;
    data.spayed_neutered = spayedNeutered;
    data.adopted = adopted;
    data.reason = reason;
    data.address_city = addressCity;
    data.address_state = addressState;
    data.email = email;
    const editDogUrl = `${process.env.REACT_APP_API_HOST}/dog/${dog_id}`;
    console.log("TOKEN ------>", token);
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const editDogResponse = await fetch(editDogUrl, fetchConfig);
    if (editDogResponse.ok) {
      const editDog = await editDogResponse.json();

      setAge("");
      setPictureUrl("");
      setSpayedNeutered(false);
      setAdopted(false);
      setReason("");
      setAddressCity("");
      setAddressState("");
      setEmail("");
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Edit Dog</h1>
            <form onSubmit={handleSubmit} id="edit-dog-form">
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
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="Email"
                  required
                  type="email"
                  name="email"
                  className="form-control"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-check mb-3">
                <input
                  onChange={handleSpayedNeuteredChange}
                  checked={spayedNeutered}
                  type="checkbox"
                  name="spayed_neutered"
                  className="form-check-input"
                />
                <label htmlFor="spayed_neutered" className="form-check-label">
                  Spayed/Neutered
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  onChange={handleAdoptedChange}
                  checked={adopted}
                  type="checkbox"
                  name="adopted"
                  className="form-check-input"
                />
                <label htmlFor="adopted" className="form-check-label">
                  Adopted
                </label>
              </div>
              <button className="btn btn-primary">Edit Dog</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDog;
