import { Radio, RadioGroup } from "@headlessui/react";
import { BsCheckCircleFill } from "react-icons/bs";

export interface Plan {
  name: string;
  deskripsi: string;
  image?: string;
}

interface Props {
  plans: Plan[];
  selected: Plan;
  onChange: (plan: Plan) => void;
}

export default function RadioButtonCheckout({ plans, selected, onChange }: Props) {
  return (
    <div className="w-full">
      <div className="w-full">
        <RadioGroup by="name" value={selected} onChange={onChange} aria-label="Pilihan" className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {plans.map((plan) => (
            <Radio
              key={plan.name}
              value={plan}
              className="mx-0.5 mt-0.5 group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2 shadow-sm transition hover:border-[#3B82F6] data-checked:border-[#3B82F6] data-checked:ring-1 data-checked:ring-[#3B82F6]"
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex items-start gap-3">
                  {plan.image && <img src={plan.image} alt={plan.name} className="w-6 h-6 object-contain mt-1" />}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-500 break-words whitespace-normal leading-snug">{plan.deskripsi}</p>
                  </div>
                </div>
                <BsCheckCircleFill className="size-5 text-[#3B82F6] opacity-0 transition group-data-checked:opacity-100 mt-1" />
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
