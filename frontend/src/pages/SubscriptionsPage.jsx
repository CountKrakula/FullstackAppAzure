import { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { getAllSubscriptions, createSubscription as createSub, updateSubscription as updateSub, deleteSubscription as deleteSub } from '../services/SubscriptionService';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);

  async function getSubscriptions() {
    try {
      const subscriptionList = await getAllSubscriptions();
      setSubscriptions(subscriptionList);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  async function handleCreate(data) {
    try {
      await createSub(data);
      await getSubscriptions();
    } catch (error) {
      console.error('Error creating subscription:', error);
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
        <SubscriptionForm onSubmit={handleCreate} />

        {editingSubscription && (
          <SubscriptionForm
            initialData={editingSubscription}
            onSubmit={(data) => handleUpdate(editingSubscription.id, data)}
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