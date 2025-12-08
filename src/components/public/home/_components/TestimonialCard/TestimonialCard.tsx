import Image from "next/image"; 
import styles from "./TestimonialCard.module.css";
import { Testimonial } from "@/lib/types/home";

interface TestimonialItemProps {
  testimonialData: Testimonial;
}

const TestimonialCard: React.FC<TestimonialItemProps> = ({
  testimonialData,
}) => {
  const { id, content, imageUrl, name, role } = testimonialData;

  return (
    <div
      className={`${styles.cardShadowDropDownEffect} flex flex-col h-full gap-8 p-10`}
    >
      <p className={`${styles.testimonialBodyText} flex-grow`}>{content}</p>
      <div className="flex flex-row items-center gap-4">
        <div className="relative h-8 w-8 overflow-clip rounded-full lg:h-12 lg:w-12">
          <Image
            src={imageUrl}
            alt={`${name} image`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 96px"
          />
        </div>
        <div>
          <h2 className={`${styles.userNameText}`}>
            {name}
          </h2>
          <h3 className={`${styles.userRoleTexts}`}>{role}</h3>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
