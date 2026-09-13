import { useState, useEffect } from 'react'
import { getAllSubscriptions } from '../services/SubscriptionService';
import { getAllCategories } from '../services/CategoryService';

export default function Dashboard() {

    const [subscriptions, setSubscriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const totalMonthlyCost = subscriptions.reduce((sum, sub) => sum + getMonthlyCost(sub), 0);
    const totalWeeklyCost = totalMonthlyCost / 4.33;
    const totalYearlyCost = totalMonthlyCost * 12;

    async function getSubscriptions() {
        try {
            const subscriptionList = await getAllSubscriptions();
            setSubscriptions(subscriptionList);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    }

    async function getCategories() {
        try {
            const categoryList = await getAllCategories();
            setCategories(categoryList);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    function getMonthlyCost(sub) {
        if (sub.billingInterval == 0) {
            // (52 weeks ÷ 12 months ≈ 4.33)
            return sub.cost * 4.33;
        } else if (sub.billingInterval == 1) {
            return sub.cost;
        } else if (sub.billingInterval == 2) {
            return sub.cost / 12;
        }
    }

    useEffect(() => {
        getSubscriptions();
        getCategories();
    }, []);


    return (
        <main>


            <h1>Dashboard</h1>
            <p>Total Monthly Cost: {totalMonthlyCost} </p>
            <p>Total Weekly Cost: {totalWeeklyCost} </p>
            <p>Total Yearly Cost: {totalYearlyCost} </p>
            <h2>Cost by Category</h2>
            <ul>
                {categories.map(category => {
                    // For each category, find only the subscriptions that belong to it
                    const subsInThisCategory = subscriptions.filter(sub => sub.categoryId === category.id);

                    // Add up the cost of just those matching subscriptions, starting from 0
                    const total = subsInThisCategory.reduce((sum, sub) => sum + sub.cost, 0);

                    // Render one list item per category, showing its name and total cost
                    return (
                        <li key={category.id}>
                            <b>{category.name}</b> - {total} kr
                        </li>
                    );
                })}
            </ul>
        </main>
    )
}


