import React, { useState } from 'react'

const CategoryForm = ({ initialData, onSubmit }) => {

    const [name, setName] = useState(initialData?.name || '');

    function handleSubmit(e) {
        e.preventDefault();
        const data = { name };
        onSubmit(data)
    }

    return (
        
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="name">Create Category Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" required />
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
       
    )
}

export default CategoryForm