import React, { useState } from 'react'

const CategoryForm = ({ initialData, onSubmit }) => {

    const [name, setName] = useState(initialData?.name || '');

    function handleSubmit(e) {
        e.preventDefault();
        const data = { name };
        onSubmit(data)
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default CategoryForm