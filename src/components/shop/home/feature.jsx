import React from 'react';
import deliveryVanIcon from '@/assets/icons/delivery-van.svg';
import moneyBackIcon from '@/assets/icons/money-back.svg';
import serviceHoursIcon from '@/assets/icons/service-hours.svg';

const Features = () => {
  const features = [
    {
      icon: deliveryVanIcon,
      title: "Free Shipping",
      description: "Order over $200"
    },
    {
      icon: moneyBackIcon,
      title: "Money Returns",
      description: "30 days money returns"
    },
    {
      icon: serviceHoursIcon,
      title: "24/7 Support",
      description: "Customer support"
    }
  ];

  return (
    <div className="container py-16">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
        {features.map((feature, index) => (
          <div key={index} className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
            <img 
              src={feature.icon} 
              alt={feature.title} 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h4 className="font-medium capitalize text-lg">{feature.title}</h4>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
