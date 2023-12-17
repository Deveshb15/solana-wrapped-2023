export default function Loading() {
    return (
      <div className="w-full h-screen flex-col justify-center items-center gap-6 inline-flex">
    <div className="w-8 h-8 relative">
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
  <rect x="14.8914" width="2.70754" height="8.12262" rx="1.35377" fill="#D9D9D9"/>
  <rect x="14.8914" y="24.3679" width="2.70754" height="8.12262" rx="1.35377" fill="#D9D9D9"/>
  <rect y="17.599" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-90 0 17.599)" fill="#14F195"/>
  <rect x="24.3677" y="17.599" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-90 24.3677 17.599)" fill="#D9D9D9"/>
  <rect x="3.80078" y="5.71533" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-45 3.80078 5.71533)" fill="#D9D9D9"/>
  <rect x="21.0312" y="22.946" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-45 21.0312 22.946)" fill="#D9D9D9"/>
  <rect x="5.71509" y="28.6896" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-135 5.71509 28.6896)" fill="#D9D9D9"/>
  <rect x="22.9458" y="11.4589" width="2.70754" height="8.12262" rx="1.35377" transform="rotate(-135 22.9458 11.4589)" fill="#D9D9D9"/>
  </svg>
    </div>
    <div className="text-center text-white text-lg font-medium font-['DM Sans'] leading-snug"> Hang tight! <br /> We&apos;re wrapping your txns into a neat little package...
</div>
  </div>
    )
  }