import React, {useState} from 'react'

const SubscriptionForm = ({initialData, onSubmit}) => {

    // one form handle both Create and Edit
    // Create: initialData is undefined, so name starts empty.
    // Edit: initialData holds the subscription being edited, so name starts pre-filled.
    const [name, setName] = useState(initialData?.name || '');
    const [cost, setCost] = useState(initialData?.cost || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || '' );
    const [billingInterval, setBillingInterval] = useState(initialData?.billingInterval || '');
    const [startDate, setStartDate] = useState(initialData?.startDate || ''); 

    function handleSubmit(e)
    {
        // Stop the browser's default behavior so page doesn't reload
        e.preventDefault();
        // Build an object from five state variables
        const data = { name, cost, categoryId, billingInterval, startDate };
        onSubmit(data)
    }

  return (
     <form onSubmit={handleSubmit}>
       
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="cost">Cost</label>
            <input type="number" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />

            
            <label htmlFor="categoryId">categoryId</label>
            <input type="number" id="categoryId" name="categoryId" value={categoryId}  onChange={(e) => setCategoryId(e.target.value)} />

            <label htmlFor="billingInterval">Billing Interval</label>
            <input type="text" id="billingInterval" name="billingInterval" value={billingInterval}  onChange={(e) => setBillingInterval(e.target.value)} />

            
            <label htmlFor="startDate">startDate </label>
            <input type="date" id="startDate" name="startDate" value={startDate}  onChange={(e) => setStartDate(e.target.value)}  />
            
            <button type="submit">Save</button>            
        </form>
  )
}

export default SubscriptionForm
