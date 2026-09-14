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
        <main className="flex flex-col items-center gap-6 min-h-screen p-6">

            <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <h1 className="card-title">Dashboard</h1>
                    <p>Total Monthly Cost: {totalMonthlyCost} </p>
                    <p>Total Weekly Cost: {totalWeeklyCost} </p>
                    <p>Total Yearly Cost: {totalYearlyCost} </p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Cost by Category</h2>
                    <ul className="flex flex-col gap-3">
                        {categories.map(category => {
                            // For each category, find only the subscriptions that belong to it
                            const subsInThisCategory = subscriptions.filter(sub => sub.categoryId === category.id);

                            // Add up the cost of just those matching subscriptions, starting from 0
                            const total = subsInThisCategory.reduce((sum, sub) => sum + sub.cost, 0);

                            // Render one list item per category, showing its name and total cost
                            return (
                                <li key={category.id} className="flex items-center gap-3">
                                    <b>{category.name}</b> - {total} kr
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}


