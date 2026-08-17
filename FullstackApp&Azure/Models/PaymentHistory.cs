namespace FullstackApp_Azure.Models
{
    public class PaymentHistory
    {
        public int Id { get; set; }
        public int SubscriptionId { get; set; }
        public decimal AmountPaid { get; set; }
        public DateOnly DatePaid { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public bool IsPaid { get; set; }

        public Subscription Subscription { get; set; }

    }
}
