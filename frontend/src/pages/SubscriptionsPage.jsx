import { useState, useEffect } from 'react'
import SubscriptionForm from '../components/SubscriptionForm'
import { getAllSubscriptions, createSubscription as createSub, updateSubscription as updateSub, deleteSubscription as deleteSub } from '../services/SubscriptionService';
import CategoryForm from '../components/CategoryForm'
import { getAllCategories, createCategory} from '../services/CategoryService';
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService'


export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

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
        <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        <ul>
          {subscriptions.map(sub => (
            <li key={sub.id}>
              <b>{sub.name}</b> - {sub.cost} kr / {sub.billingInterval}
              <button className="btn btn-error" onClick={() => handleDelete(sub.id)}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setEditingSubscription(sub)}>Edit</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}