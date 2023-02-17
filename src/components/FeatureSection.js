/* This example requires Tailwind CSS v2.0+ */
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  CheckIcon,
  
} from "@heroicons/react/outline";

const features = [
  {
    name: "Convenient",
    description:
      "Digital business cards can be easily shared via email, social media, or messaging apps, making them more convenient and accessible to others.",
    icon: GlobeAltIcon,
  },
  {
    name: "Eco-Friendly",
    description:
      "By using a digital business card, you eliminate the need for paper cards, reducing waste and helping the environment.",
    icon: ScaleIcon,
  },
  {
    name: "Cost-effective",
    description:
      "Digital business cards can be created and distributed at a low cost, saving you money in printing and design expenses.",
    icon: LightningBoltIcon,
  },
  {
    name: "Easy to update",
    description:
      "Digital business cards can be easily updated with new information, such as your phone number or email address, making it easier to keep your contacts up-to-date.",
    icon: AnnotationIcon,
  },
  {
    name: "Interactive",
    description:
      "Digital business cards can include clickable links to your website or social media profiles, providing an interactive experience for the recipient.",
    icon: AnnotationIcon,
  },
  {
    name: "Increased reach",
    description:
      "With digital business cards, you can easily share your contact information with people all over the world, not just those in your immediate vicinity.",
    icon: AnnotationIcon,
  },
];

export default function Feature() {
  return (
    <div className="py-12 bg-gray-100" id="feature-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
        
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
           Why go digital?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-900 lg:mx-auto">
          Digital business cards offer several benefits over traditional paper business cards:
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-mde">
                    <CheckIcon className="h-8 w-8 stroke-gray-900" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
