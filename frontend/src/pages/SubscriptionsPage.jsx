import { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { getAllSubscriptions, createSubscription as createSub, updateSubscription as updateSub, deleteSubscription as deleteSub } from '../services/SubscriptionService';
import CategoryForm from '../components/CategoryForm'
import { getAllCategories, createCategory} from '../services/CategoryService';


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

  return (
    <>
      <main>
        <SubscriptionForm onSubmit={handleCreate} categories={categories} />
        <CategoryForm onSubmit={handleCreateCategory} />

        {editingSubscription && (
          <SubscriptionForm
            initialData={editingSubscription}
            onSubmit={(data) => handleUpdate(editingSubscription.id, data)}
            categories={categories}
          />
          
        )}

     

        <h1>Subscription List</h1>
        <ul>
          {subscriptions.map(sub => (
            <li key={sub.id}>
              <b>{sub.name}</b> - {sub.cost} kr / {sub.billingInterval}
              <button onClick={() => handleDelete(sub.id)}>Delete</button>
              <button onClick={() => setEditingSubscription(sub)}>Edit</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}