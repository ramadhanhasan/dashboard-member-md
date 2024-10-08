import { Button } from "./ui/button";

export default function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-99999">
      <a
        href="https://api.whatsapp.com/send/?phone=6288219499631&text=Hallo%2C+Saya+Ingin+Konsultasi+Kendala+Website+Member&type=phone_number&app_absent=0" // Replace with your WhatsApp link
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="bg-[#25D366] hover:bg-[#1ebc58] text-white rounded-full p-2 shadow-lg flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8"
            fill="white"
          >
            <path d="M16.04 0c-8.827 0-15.998 7.17-15.998 15.998a15.872 15.872 0 0 0 2.334 8.256l-1.54 5.614 5.751-1.508a15.965 15.965 0 0 0 9.453 3.045c8.828 0 15.998-7.171 15.998-15.998C32.037 7.169 24.866 0 16.04 0zm0 29.59c-3.234 0-6.285-1.032-8.843-2.956l-.635-.42-3.423.895.924-3.34-.432-.671a13.725 13.725 0 0 1-2.017-7.09c0-7.59 6.184-13.772 13.774-13.772 7.592 0 13.776 6.182 13.776 13.772 0 7.59-6.185 13.772-13.776 13.772z" />
            <path d="M24.812 18.698c-.414-.207-2.45-1.216-2.83-1.354-.378-.139-.656-.208-.935.207-.275.414-1.076 1.354-1.318 1.632-.244.276-.483.31-.896.103-.414-.207-1.747-.644-3.33-2.049-1.23-1.098-2.06-2.456-2.301-2.87-.242-.414-.027-.637.182-.844.189-.185.414-.483.621-.725.207-.242.276-.414.414-.69.138-.276.07-.517-.034-.724-.104-.207-.934-2.258-1.28-3.095-.338-.818-.688-.71-.935-.725-.242-.017-.518-.02-.796-.02-.275 0-.724.104-1.106.518-.379.414-1.448 1.412-1.448 3.452 0 2.038 1.482 4.006 1.689 4.281.207.276 2.92 4.455 7.073 6.168.99.426 1.764.682 2.367.872 1.003.318 1.916.276 2.637.168.804-.121 2.45-.998 2.793-1.96.345-.966.345-1.792.242-1.96-.104-.168-.379-.276-.793-.483z" />
          </svg>
        </button>
      </a>
    </div>
  )
}
