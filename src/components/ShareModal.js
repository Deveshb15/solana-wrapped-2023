import { useRef, useState } from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
} from "react-share";

export default function ShareModal({ handleClose }) {
  const textRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false); // new state

  const handleCopy = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.textContent);
      setIsCopied(true); // set isCopied true when button is clicked

      // after 2 seconds, set isCopied back to false
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const shareLink = "Just got my Solana Wrapped, \nget yours here 👉 https://www.solanawrapped.xyz";
  const title =
    "Just got my Solana Wrapped, \nget yours here 👉 https://www.solanawrapped.xyz";

  return (
    // <div      className="absolute text-black z-1 inset-0 flex items-center justify-center bg-[rgba(21,24,28,0.90)]"
    <div className="absolute text-black z-[100] inset-0 flex items-center justify-center bg-[rgba(21,24,28,0.90)]"
    >
      <div className="w-[541px] h-[406px] flex flex-col bg-white rounded-[24px] p-6">
        <div className="flex justify-end">
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18"
                stroke="#1E2228"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#1E2228"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center">
          <h2 className="text-lg font-inter font-bold">Share</h2>
        </div>

        <div className="flex flex-row justify-around mt-12">
          <div className="flex flex-col items-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
              )}`}
              rel="noopener noreferrer"
              target="_blank"
              className="react-share__ShareButton"
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: "0px",
                font: "inherit",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex justify-center items-center"
                style={{ background: "#F5F5F5" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M28.5 31.5H7.5C5.84325 31.5 4.5 30.1567 4.5 28.5V7.5C4.5 5.84325 5.84325 4.5 7.5 4.5H28.5C30.1567 4.5 31.5 5.84325 31.5 7.5V28.5C31.5 30.1567 30.1567 31.5 28.5 31.5Z"
                    fill="#212121"
                  />
                  <path
                    d="M25.6931 25.5H20.8653L10.3721 10.5H15.1998L25.6931 25.5ZM21.4406 24.228H23.3628L14.6246 11.772H12.7023L21.4406 24.228Z"
                    fill="white"
                  />
                  <path
                    d="M11.8994 25.5004L17.3017 19.2424L16.5952 18.3057L10.3672 25.5004H11.8994Z"
                    fill="white"
                  />
                  <path
                    d="M18.3379 16.2908L19.0166 17.2575L24.8524 10.5H23.3524L18.3379 16.2908Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p className="mt-1 flex justify-center font-inter">Twitter</p>
            </a>
          </div>
          <RedditShareButton
            onClick={handleClose}
            title={
              "Just got my Solana Wrapped, \nget yours here 👉 https://www.solanawrapped.xyz"
            }
            url={`${shareLink}?utm_source=reddit&utm_medium=social&utm_campaign=reddit_share`}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex justify-center items-center "
                style={{ background: "#F5F5F5" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_245_646)">
                    <path
                      d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                      fill="#FF4500"
                    />
                    <path
                      d="M26.6721 16.0002C26.6753 16.2194 26.6481 16.4382 26.5905 16.6498C26.5329 16.8614 26.4457 17.0642 26.3313 17.2514C26.2173 17.4386 26.0773 17.609 25.9157 17.7574C25.7541 17.9058 25.5725 18.0306 25.3761 18.1282C25.3805 18.1866 25.3841 18.2454 25.3861 18.3042C25.3909 18.4214 25.3909 18.5389 25.3861 18.6562C25.3841 18.715 25.3805 18.7738 25.3761 18.8322C25.3761 22.4162 21.2001 25.3282 16.0481 25.3282C10.8961 25.3282 6.72006 22.4162 6.72006 18.8322C6.71566 18.7738 6.71206 18.715 6.71006 18.6562C6.70524 18.5389 6.70524 18.4214 6.71006 18.3042C6.71206 18.2454 6.71566 18.1866 6.72006 18.1282C6.41236 17.9867 6.13907 17.7801 5.91909 17.5226C5.69912 17.2652 5.53772 16.963 5.44606 16.637C5.35455 16.3108 5.33506 15.9687 5.38893 15.6342C5.4428 15.2998 5.56876 14.9811 5.75806 14.7002C5.94719 14.4193 6.19517 14.1829 6.48479 14.0075C6.77441 13.832 7.09873 13.7217 7.43526 13.6842C7.77182 13.6464 8.11257 13.6823 8.43388 13.7894C8.75519 13.8965 9.04938 14.0721 9.29606 14.3042C9.75399 13.9938 10.2338 13.7169 10.7317 13.4758C11.2297 13.235 11.7445 13.0302 12.2721 12.8638C12.7997 12.6974 13.3389 12.5698 13.8849 12.4814C14.4309 12.393 14.9829 12.3446 15.5361 12.3362L16.7201 6.78416C16.7333 6.71976 16.7593 6.65896 16.7965 6.60456C16.8333 6.55056 16.8809 6.50416 16.9357 6.46856C16.9909 6.43296 17.0525 6.40856 17.1173 6.39656C17.1817 6.38496 17.2481 6.38616 17.3121 6.40016L21.2321 7.18416C21.6277 6.50456 22.4581 6.21336 23.1913 6.49656C23.9245 6.77976 24.3437 7.55376 24.1797 8.32256C24.0161 9.09136 23.3177 9.62736 22.5329 9.58696C21.7477 9.54656 21.1081 8.94176 21.0241 8.16016L17.6001 7.44016L16.5601 12.4322C17.1065 12.4438 17.6517 12.495 18.1909 12.585C19.2706 12.7649 20.3188 13.0999 21.3029 13.5794C21.7944 13.8186 22.268 14.0929 22.7201 14.4002C23.0451 14.0881 23.4535 13.8768 23.8961 13.7918C24.3386 13.7064 24.7963 13.751 25.2141 13.9202C25.6318 14.0892 25.9918 14.3755 26.2505 14.7446C26.5092 15.1136 26.6556 15.5497 26.6721 16.0002ZM10.7937 18.2126C10.8745 18.4066 10.9921 18.583 11.1409 18.7314C11.2893 18.8802 11.4657 18.9978 11.6597 19.0786C11.8538 19.1589 12.0619 19.2002 12.2721 19.2002C12.9193 19.2002 13.5025 18.8102 13.7505 18.2126C13.9981 17.6146 13.8609 16.9266 13.4033 16.469C12.9457 16.0114 12.2577 15.8742 11.6597 16.1218C11.0621 16.3698 10.6721 16.953 10.6721 17.6002C10.6721 17.8102 10.7133 18.0182 10.7937 18.2126ZM19.9577 22.0534C20.0397 21.9734 20.0865 21.8642 20.0881 21.7498C20.0897 21.635 20.0453 21.5246 19.9653 21.4426C19.8853 21.3606 19.7761 21.3138 19.6617 21.3122C19.5469 21.3106 19.4365 21.355 19.3441 21.4242C19.1035 21.5967 18.8487 21.7486 18.5825 21.8782C18.3162 22.0078 18.0395 22.1147 17.7553 22.1978C17.4713 22.2806 17.1805 22.3394 16.8865 22.3734C16.5921 22.4074 16.2957 22.4162 16.0001 22.4002C15.7049 22.4134 15.4089 22.4014 15.1157 22.3646C14.8224 22.3281 14.5328 22.2666 14.2501 22.1806C13.9669 22.095 13.6921 21.9854 13.4277 21.8534C13.1633 21.7214 12.9105 21.567 12.6721 21.3922C12.5893 21.3242 12.4841 21.2894 12.3769 21.2946C12.2697 21.2998 12.1685 21.345 12.0925 21.4206C12.0169 21.4966 11.9717 21.5978 11.9665 21.705C11.9613 21.8122 11.9961 21.9174 12.0641 22.0002C12.3453 22.2122 12.6441 22.3994 12.9573 22.5602C13.2705 22.721 13.5973 22.8542 13.9333 22.959C14.2693 23.0638 14.6137 23.1394 14.9629 23.1854C15.3121 23.231 15.6645 23.2466 16.0161 23.2322C16.3677 23.2466 16.7201 23.231 17.0693 23.1854C17.7687 23.0934 18.4471 22.8819 19.0749 22.5602C19.3881 22.3994 19.6869 22.2122 19.9681 22.0002L19.9577 22.0534ZM19.6641 19.3282C19.8809 19.3306 20.0961 19.2886 20.2965 19.2054C20.4969 19.1218 20.6781 18.9986 20.8293 18.843C20.9805 18.6874 21.0981 18.5026 21.1757 18.2998C21.2533 18.0972 21.2888 17.8809 21.2801 17.6642C21.2801 17.017 20.8901 16.4338 20.2925 16.1858C19.6945 15.9382 19.0065 16.0754 18.5489 16.533C18.0913 16.9906 17.9541 17.6786 18.2017 18.2766C18.4497 18.8742 19.0329 19.2642 19.6801 19.2642L19.6641 19.3282Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_245_646">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="mt-1 font-inter">Reddit</p>
            </div>
          </RedditShareButton>
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex justify-center items-center"
              style={{ background: "#F5F5F5" }}
            >
              <WhatsappShareButton
                onClick={handleClose}
                // title={
                //   "Just got my Solana Wrapped, \nget yours here 👉 https://www.solanawrapped.xyz"
                // }
                url={shareLink}
              >
                <WhatsappIcon size={36} round={true} />
              </WhatsappShareButton>
            </div>
            <p className="mt-1 font-inter">WhatsApp</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-base" style={{ color: "#1E2228" }}>
            Page Link
          </p>
          <div className="relative mt-2" style={{ borderRadius: "12px" }}>
            <div
              ref={textRef}
              className="pl-2 pr-8 py-1 w-full h-14 text-black flex justify-center items-center "
              readOnly
              style={{ background: "#F5F5F5", borderRadius: "12px" }}
            >
              https://www.solanawrapped.xyz
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-10 top-1/2 transform -translate-y-1/2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                  stroke="#1E2228"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                  stroke="#1E2228"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isCopied && (
              <span className="absolute right-7 top-1/2 bg-green-200 py-1 px-2 rounded-md text-xs transform -translate-y-1/2">
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
