namespace FullstackApp_Azure.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        // 1 to many relationship, 1 category can have many subscriptions
        public ICollection<Subscription> Subscriptions { get; set; }
    }
}
