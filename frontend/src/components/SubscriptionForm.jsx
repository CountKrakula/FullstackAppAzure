import React, { useState } from 'react'

const SubscriptionForm = ({ initialData, onSubmit, categories }) => {

    // one form handle both Create and Edit
    // Create: initialData is undefined, so name starts empty.
    // Edit: initialData holds the subscription being edited, so name starts pre-filled.
    const [name, setName] = useState(initialData?.name || '');
    const [cost, setCost] = useState(initialData?.cost || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
    const [billingInterval, setBillingInterval] = useState(initialData?.billingInterval || '');
    const [startDate, setStartDate] = useState(initialData?.startDate || '');

    function handleSubmit(e) {
        // Stop the browser's default behavior so page doesn't reload
        e.preventDefault();
        // Build an object from five state variables
        // Typecasting to ensure the JSON payload sends integers
        const data = { name, cost: Number(cost), categoryId: Number(categoryId), billingInterval: Number(billingInterval), startDate };
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required/>

            <label htmlFor="cost">Cost</label>
            <input type="number" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} className="input input-bordered w-full" required/>


            <label htmlFor="categoryId">categoryId</label>
            <select id="categorId" name="categoryId" value={categoryId}  onChange={(e) => setCategoryId(e.target.value)} className="select select-bordered w-full">
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                
            </select>

            <label htmlFor="billingInterval">Billing Interval</label>
            <select id="billingInterval" name="billingInterval" value={billingInterval} onChange={(e) => setBillingInterval(e.target.value)}  className="select select-bordered w-full" >
                {/* Modeled after the backend model as numerical values */}
                <option value="0">Weekly</option>
                <option value="1">Monthly</option>
                <option value="2">Yearly</option>
            </select>


            <label htmlFor="startDate">startDate </label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input input-bordered w-full" required />

            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )
}

export default SubscriptionForm
