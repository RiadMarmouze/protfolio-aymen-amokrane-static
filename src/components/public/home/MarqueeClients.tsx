import { SELECTED_CLIENTS_DATA } from "@/lib/data/home";

export default function MarqueeClients() {
  return (
    <div className="overflow-hidden border-y-2 border-black group">
      <div className="whitespace-nowrap animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused] py-4">
        {SELECTED_CLIENTS_DATA.map(( item ) => (
          <span
            key={item.name}
            className="inline-flex items-center mx-8 text-neutral-500"
          >
            <span
              className="h-5 w-10 bg-neutral-300 rounded-[2px] mr-2"
              aria-hidden
            ></span>
            <span className="uppercase tracking-[0.25em] text-[11px]">
              {item.name}
            </span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
