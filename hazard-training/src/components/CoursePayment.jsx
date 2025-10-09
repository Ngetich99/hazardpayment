import { useState, useEffect } from "react";

export default function CoursePayment() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { name: "Fire Safety Training", price: 2500, image: "https://images.unsplash.com/photo-1603052875330-7a5c66b5edb8" },
    { name: "First Aid Training", price: 3000, image: "https://images.unsplash.com/photo-1588776814546-78a0e3e8dcff" },
    { name: "Occupational Safety & Health", price: 3500, image: "https://images.unsplash.com/photo-1581093458791-9a27d42e3f38" },
    { name: "Health & Safety Awareness", price: 2800, image: "https://images.unsplash.com/photo-1588776814546-78a0e3e8dcff" },
    { name: "Fire Marshall Training", price: 3200, image: "https://images.unsplash.com/photo-1617880938581-16b6e472e3d2" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
  }, []);

  const handlePay = (course) => {
    setSelectedCourse(course);

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your Paystack public key
      email: "student@example.com",
      amount: course.price * 100,
      currency: "KES",
      callback: (response) => {
        alert(`Payment successful! Reference: ${response.reference}`);
        window.location.href = "https://classroom.google.com/"; // Redirect to your Classroom
      },
      onClose: () => {
        alert("Payment window closed.");
      },
    });
  };

  return (
    <div style={{ backgroundColor: '#fff5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#b91c1c', color: 'white', padding: '15px', textAlign: 'center' }}>
        <img src="/hazard.png" alt="Hazard Logo" style={{ height: '40px', borderRadius: '50%', background: 'white', padding: '4px' }} />
        <h1>Hazard Control Technologies Training</h1>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {courses.map((course, index) => (
          <div key={index} style={{ background: 'white', border: '2px solid #fecaca', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center', overflow: 'hidden' }}>
            <img src={course.image} alt={course.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h2 style={{ color: '#b91c1c' }}>{course.name}</h2>
              <p>KES {course.price.toLocaleString()}</p>
              <button onClick={() => handlePay(course)} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer' }}>
                Enroll & Pay Now
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
