import { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { getAllSubscriptions, createSubscription as createSub, updateSubscription as updateSub, deleteSubscription as deleteSub } from '../services/SubscriptionService';
import CategoryForm from '../components/CategoryForm'
import { getAllCategories, createCategory } from '../services/CategoryService';


export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getSubscriptions();
    getCategories();
  }, []);

  async function handleCreate(data) {
    try {
      await createSub(data);
      await getSubscriptions();
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  }

  async function handleCreateCategory(data) {
    try {
      await createCategory(data);
      await getCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSub(id);
      await getSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  }

  async function handleUpdate(id, updatedData) {
    try {
      await updateSub(id, updatedData);
      await getSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  }

  function getBillingLabel(interval) {
    if (interval === 0) return "Weekly";
    if (interval === 1) return "Monthly";
    if (interval === 2) return "Yearly";
  }

  return (
    <>
      <main className="flex flex-col gap-8 max-w-2xl mx-auto p-6">
        <SubscriptionForm onSubmit={handleCreate} categories={categories} />
        <CategoryForm onSubmit={handleCreateCategory} />

        {editingSubscription && (
          <SubscriptionForm
            initialData={editingSubscription}
            onSubmit={(data) => handleUpdate(editingSubscription.id, data)}
            categories={categories}
          />
        )}

        <h1 className="text-2xl font-bold">Subscription List</h1>
        <ul className="flex flex-col gap-3">
          {subscriptions.map(sub => (
            <li key={sub.id} className="flex items-center justify-between gap-3">
              <div>
                <b>{sub.name}</b>
                <p>{sub.cost} kr, billed {getBillingLabel(sub.billingInterval)}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-error btn-sm" onClick={() => handleDelete(sub.id)}>Delete</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingSubscription(sub)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}