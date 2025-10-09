import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CoursePayment() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      name: "Fire Safety Training",
      price: 2500,
      image: "https://images.unsplash.com/photo-1603052875330-7a5c66b5edb8",
    },
    {
      name: "First Aid Training",
      price: 3000,
      image: "https://images.unsplash.com/photo-1588776814546-78a0e3e8dcff",
    },
    {
      name: "Occupational Safety & Health",
      price: 3500,
      image: "https://images.unsplash.com/photo-1581093458791-9a27d42e3f38",
    },
    {
      name: "Health & Safety Awareness",
      price: 2800,
      image: "https://images.unsplash.com/photo-1588776814546-78a0e3e8dcff",
    },
    {
      name: "Fire Marshall Training",
      price: 3200,
      image: "https://images.unsplash.com/photo-1617880938581-16b6e472e3d2",
    },
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
      email: "student@example.com", // You can dynamically use logged-in student email
      amount: course.price * 100, // Paystack uses kobo, so multiply by 100
      currency: "KES",
      callback: (response) => {
        alert(`Payment successful! Reference: ${response.reference}`);
        // You can redirect to Google Classroom or issue a certificate here
      },
      onClose: () => {
        alert("Payment window closed.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-red-50 text-gray-900">
      <header className="bg-red-700 text-white py-4 flex items-center justify-center gap-3 shadow-md">
        <img src="/hazard.png" alt="Hazard Logo" className="h-10 w-10 rounded-full bg-white p-1" />
        <h1 className="text-2xl font-bold tracking-wide">Hazard Control Technologies Training</h1>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course, index) => (
          <Card key={index} className="hover:shadow-2xl transition duration-300 border-red-300">
            <img src={course.image} alt={course.name} className="rounded-t-xl h-48 w-full object-cover" />
            <CardContent className="p-4 text-center">
              <h2 className="text-xl font-semibold text-red-700">{course.name}</h2>
              <p className="mt-2 text-gray-700 font-medium">KES {course.price.toLocaleString()}</p>
              <Button
                onClick={() => handlePay(course)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white w-full"
              >
                Enroll & Pay Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>

      {selectedCourse && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-700 text-white text-center py-3 animate-bounce">
          You selected: {selectedCourse.name} — Proceed to payment.
        </div>
      )}
    </div>
  );
}