import React from 'react';

const features = [
  { id: 1, name: 'Facial Recognition', value: 'Ensure campus safety with our cutting-edge facial recognition technology.' },
  { id: 2, name: 'Live Campus Cameras', value: 'View real-time feeds from strategically placed cameras across the university.' },
  { id: 3, name: 'Alerts & Notifications', value: 'Stay informed about security events, emergency alerts, and updates.' },
  { id: 4, name: 'User Profiles', value: 'Manage enrolled faces, access control, and preferences.' }
];

const studentFeatures = [
  { id: 1, name: 'Enroll Your Face', value: 'Secure access to dorms, libraries, and study areas.' },
  { id: 2, name: 'Recognize Face', value: 'Verify your identity during exams or access restricted zones.' },
  { id: 3, name: 'Emergency Alerts', value: 'Receive instant notifications during crises.' }
];

const facultyFeatures = [
  { id: 1, name: 'Access Control', value: 'Manage permissions for labs, offices, and administrative areas.' },
  { id: 2, name: 'Event Monitoring', value: 'Monitor lecture halls, labs, and common spaces.' },
  { id: 3, name: 'Security Settings', value: 'Customize notifications and camera preferences.' }
];

export default function Features() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Features</h2>
        <p className="mt-4 text-lg text-gray-600">Things the software aim to help with</p>
      </section>

      <section className="py-12 bg-white/70 rounded-3xl">
        <h3 className="text-2xl font-semibold text-center text-gray-700">Overall</h3>
        <div className="px-6 mx-auto mt-8 max-w-7xl lg:px-8">
          <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col max-w-xs mx-auto gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{feature.name}</dt>
                <dd className="order-first text-xl font-medium tracking-tight text-gray-900">{feature.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12 mt-12 bg-white/70 rounded-3xl">
        <h3 className="text-2xl font-semibold text-center text-gray-700">For Students</h3>
        <div className="px-6 mx-auto mt-8 max-w-7xl lg:px-8">
          <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-2">
            {studentFeatures.map((feature) => (
              <div key={feature.id} className="flex flex-col max-w-xs mx-auto gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{feature.name}</dt>
                <dd className="order-first text-xl font-medium tracking-tight text-gray-900">{feature.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12 mt-12 bg-white/70 rounded-3xl">
        <h3 className="text-2xl font-semibold text-center text-gray-700">For Faculty & Staff</h3>
        <div className="px-6 mx-auto mt-8 max-w-7xl lg:px-8">
          <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-2">
            {facultyFeatures.map((feature) => (
              <div key={feature.id} className="flex flex-col max-w-xs mx-auto gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{feature.name}</dt>
                <dd className="order-first text-xl font-medium tracking-tight text-gray-900">{feature.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="w-full py-6 mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">Explore Our Safe Environment!</h3>
        <p className="mt-2 text-lg text-gray-600">Remember, safety is a shared responsibility. Let’s create a secure campus together! 🎓🔒👀</p>
      </footer>
    </div>
  );
}
